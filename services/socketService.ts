/**
 * socketService.ts
 * Singleton Socket.io client for the HandysCompany app.
 * Connects to the /dispatch namespace on the backend.
 */
import { io, Socket } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL?.replace(/\/$/, '');
if (!BASE_URL) {
  throw new Error("EXPO_PUBLIC_API_BASE_URL is missing.");
}
const WS_URL = BASE_URL.replace('/api/v1', '');

let socket: Socket | null = null;

export async function getSocket(): Promise<Socket> {
  if (socket && socket.connected) return socket;

  const token = await AsyncStorage.getItem('handyscompany.accessToken');

  socket = io(`${WS_URL}/dispatch`, {
    auth: { token },
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 2000,
  });

  socket.on('connect', () => {
    console.log('✅ WebSocket connected:', socket?.id);
  });

  socket.on('connect_error', (err) => {
    console.warn('❌ WebSocket error:', err.message);
  });

  socket.on('disconnect', (reason) => {
    console.log('🔌 WebSocket disconnected:', reason);
  });

  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

/** Join a booking room (call once after booking is confirmed) */
export async function joinBookingRoom(bookingId: string) {
  const s = await getSocket();
  s.emit('join:booking', bookingId);
}

/** Listen for live location updates from the technician */
export async function onLocationUpdate(
  callback: (data: {
    latitude: number;
    longitude: number;
    speed?: number;
    heading?: number;
    trackingStatus: string;
    timestamp: string;
  }) => void
) {
  const s = await getSocket();
  s.off('location:update'); // remove previous listeners
  s.on('location:update', callback);
}

/** Listen for tracking status changes (TRAVELLING, ARRIVED, etc.) */
export async function onStatusUpdate(
  callback: (data: { status: string; timestamp: string }) => void
) {
  const s = await getSocket();
  s.off('status:update');
  s.on('status:update', callback);
}

/** Listen for new job offers (Technician side) */
export async function onJobOffer(callback: (data: any) => void) {
  const s = await getSocket();
  s.off('job:offer');
  s.on('job:offer', callback);
}

/** Listen for job cancelled events (Technician side) */
export async function onJobCancelled(callback: (data: any) => void) {
  const s = await getSocket();
  s.off('job:cancelled');
  s.on('job:cancelled', callback);
}
