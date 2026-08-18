// app.config.js — Dynamic Expo configuration
// Replaces app.json so that sensitive values can be read from environment variables.
// NEVER hardcode API keys or credentials here — use process.env.* instead.

/** @type {import('expo/config').ExpoConfig} */
module.exports = ({ config: _config }) => {
  const googleMapsApiKey =
    process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY ??
    process.env.GOOGLE_MAPS_API_KEY ??
    '';

  const apiBaseUrl =
    process.env.EXPO_PUBLIC_API_BASE_URL ?? '';

  return {
    name: 'Handys Technician',
    owner: 'goluk5767',
    slug: 'HandysCompanyNew',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'handyscompanynew',
    userInterfaceStyle: 'automatic',
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.goluk5767.HandysCompanyNew',
      config: {
        googleMapsApiKey,
      },
    },
    android: {
      adaptiveIcon: {
        backgroundColor: '#E6F4FE',
        foregroundImage: './assets/images/android-icon-foreground.png',
        backgroundImage: './assets/images/android-icon-background.png',
        monochromeImage: './assets/images/android-icon-monochrome.png',
      },
      predictiveBackGestureEnabled: false,
      usesCleartextTraffic: true,
      package: 'com.goluk5767.HandysCompanyNew',
      googleServicesFile: './google-services.json',
      versionCode: 1,
      permissions: [
        "ACCESS_COARSE_LOCATION",
        "ACCESS_FINE_LOCATION",
        "ACCESS_BACKGROUND_LOCATION",
        "FOREGROUND_SERVICE",
        "FOREGROUND_SERVICE_LOCATION",
        "POST_NOTIFICATIONS"
      ],
      config: {
        googleMaps: {
          apiKey: googleMapsApiKey,
        },
      },
    },
    web: {
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    extra: {
      apiBaseUrl,
      router: {},
      eas: {
        projectId: '6237e8b9-8a2f-42b2-9b93-a12a45c288ca',
      },
    },
    plugins: [
      '@react-native-firebase/app',
      'expo-notifications',
      'expo-router',
      'expo-secure-store',
      [
        'expo-location',
        {
          "locationAlwaysAndWhenInUsePermission": "Allow HandysCompany to track your location in the background to provide live updates to customers and send you nearby job offers.",
          "isAndroidBackgroundLocationEnabled": true,
          "isAndroidForegroundServiceEnabled": true
        }
      ],
      [
        'expo-splash-screen',
        {
          image: './assets/images/splash-icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
          dark: {
            backgroundColor: '#000000',
          },
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
  };
};
