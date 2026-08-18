/**
 * locationBroadcaster.ts
 * Foreground / Background GPS location broadcaster for Technicians.
 * Streams live coordinates via Socket.io to NestJS /dispatch WebSocket server.
 */
import * as Location from 'expo-location';
import { getSocket } from './socketService';
import { apiRequest } from './api/client';

let locationSubscription: Location.LocationSubscription | null = null;
let activeBookingId: string | null = null;

/**
 * Request Location permissions from the technician device.
 */
export async function requestLocationPermissions(): Promise<boolean> {
  const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
  if (foregroundStatus !== 'granted') {
    console.warn('Foreground location permission denied');
    return false;
  }
  return true;
}

/**
 * Start streaming live GPS coordinates for an active booking.
 * Sends coordinates via both WebSocket (real-time push) and REST API (DB logging).
 */
export async function startLocationBroadcasting(bookingId: string) {
  activeBookingId = bookingId;

  const hasPermission = await requestLocationPermissions();
  if (!hasPermission) return;

  // Stop any existing tracking subscription first
  stopLocationBroadcasting();

  try {
    // Watch position every 5 seconds or 10 meters distance change
    locationSubscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 5000, // 5 seconds
        distanceInterval: 10, // 10 meters
      },
      async (loc) => {
        const { latitude, longitude, speed, heading, accuracy } = loc.coords;

        // 1. Send to Backend REST API (Database logging + Encrypted payload)
        try {
          await apiRequest(`/tracking/${bookingId}/location`, {
            method: 'POST',
            body: {
              latitude,
              longitude,
              speed: speed ?? undefined,
              heading: heading ?? undefined,
              accuracy: accuracy ?? undefined,
            },
          });
        } catch (apiErr) {
          console.warn('Location REST sync error:', apiErr);
        }

        // 2. Broadcast live coordinate update over WebSocket room
        try {
          const socket = await getSocket();
          socket.emit('location:update', {
            bookingId,
            latitude,
            longitude,
            speed,
            heading,
            accuracy,
            timestamp: new Date().toISOString(),
          });
        } catch (socketErr) {
          console.warn('Location Socket broadcast error:', socketErr);
        }
      }
    );

    console.log(`📡 Started live GPS location stream for booking: ${bookingId}`);
  } catch (err) {
    console.error('Failed to start location broadcasting:', err);
  }
}

/**
 * Stop live GPS location streaming.
 */
export function stopLocationBroadcasting() {
  if (locationSubscription) {
    locationSubscription.remove();
    locationSubscription = null;
    console.log(`⏹️ Stopped location broadcasting for booking: ${activeBookingId}`);
    activeBookingId = null;
  }
}
