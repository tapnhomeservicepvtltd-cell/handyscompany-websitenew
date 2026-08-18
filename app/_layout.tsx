// 🌟 CRITICAL TOP-LEVEL IMPORTS: जेस्चर हैंडलर और रीएनिमेटेड सबसे ऊपर होने चाहिए
import "react-native-gesture-handler";
import "react-native-reanimated";

import { Stack, usePathname } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Redux और अन्य प्रोवाइडर्स के इम्पोर्ट्स
import { Provider } from "react-redux";
import { store } from "../store";

// 🛠️ RELATIVE PATHS
import GlobalHeader from "./GlobalHeader";
import { LanguageProvider, useLang } from "./context/LanguageContext";
import ErrorBoundary from "../components/ErrorBoundary";
import OfflineBanner from "../components/OfflineBanner";

if (Platform.OS === 'android' || Platform.OS === 'ios') {
  const nativeConstants = Platform.constants;
}

// जिन रूट्स पर अपना खुद का header है, वहाँ GlobalHeader नहीं दिखाना है
const HIDE_GLOBAL_HEADER_PREFIXES = [
  "/welcome",
  "/login",
  "/register",
  "/profile-setup",
  "/payment-gateway",
  "/subscribe",
  "/memberships",
  "/modal",
  "/category",
  "/service",
  "/booking",
];

// Home tab renders its own StickyHeader (menu / logo / notifications / login),
// so the legacy GlobalHeader must not also render there or the screen would
// show two stacked headers.
const isHomeTabRoute = (pathname: string | null) =>
  pathname === "/" || pathname === "/(tabs)" || pathname === "/(tabs)/index";

function MainAppLayout() {
  const { lang } = useLang();
  const pathname = usePathname();
  const showGlobalHeader =
    !isHomeTabRoute(pathname) &&
    !HIDE_GLOBAL_HEADER_PREFIXES.some((p) => pathname?.startsWith(p));

  return (
    <View key={lang} style={{ flex: 1, backgroundColor: "#F7F7FB" }}>
      {showGlobalHeader && <GlobalHeader />}

      {/* 🌟 Navigation Stack */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="welcome" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="profile-setup" />
        <Stack.Screen name="payment-gateway" />
        <Stack.Screen name="subscribe" />
        <Stack.Screen name="memberships" />
        <Stack.Screen name="modal" />
      </Stack>
    </View>
  );
}

import { registerForPushNotificationsAsync } from "../services/notificationService";

export default function RootLayout() {
  React.useEffect(() => {
    void registerForPushNotificationsAsync();
  }, []);

  return (
    // 🌟 ROOT WRAPPERS: सबसे बाहर Redux, फिर Gesture Handler, और फिर Language Context
    <Provider store={store}>
      <ErrorBoundary>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <LanguageProvider>
            <OfflineBanner />
            <MainAppLayout />
          </LanguageProvider>
        </GestureHandlerRootView>
      </ErrorBoundary>
    </Provider>
  );
}
