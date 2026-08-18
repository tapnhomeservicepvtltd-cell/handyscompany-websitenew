import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { apiRequest } from './api/client';

// Configure notification behavior when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

/**
 * Registers device for push notifications and registers token with backend API.
 */
export async function registerForPushNotificationsAsync(): Promise<string | null> {
  let token: string | null = null;

  if (Platform.OS === 'web') {
    return null;
  }

  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.warn('Failed to get push notification permission token');
      return null;
    }

    // Replaced Expo Push Token logic to avoid conflict with native FCM token architecture
    // Native FCM is handled in dashboard.tsx using @react-native-firebase/messaging

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#00A651',
      });
    }
  } catch (error) {
    console.warn('Push notification setup failed:', error);
  }

  return token;
}
