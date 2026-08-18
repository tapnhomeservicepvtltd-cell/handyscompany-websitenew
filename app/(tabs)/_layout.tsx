import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          headerStyle: { backgroundColor: '#ffffff' },
          headerTintColor: '#064E3B', // हमारा सिग्नेचर 'Deep Forest Green'
          headerTitleStyle: { fontWeight: 'bold' },
          headerShadowVisible: false, // एकदम फ्लैट और मॉडर्न लुक
        }}
      />
    </>
  );
}