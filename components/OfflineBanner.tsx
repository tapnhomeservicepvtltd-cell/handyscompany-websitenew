import { MaterialCommunityIcons } from '@expo/vector-icons';
import NetInfo from '@react-native-community/netinfo';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function OfflineBanner() {
  const [isConnected, setIsConnected] = useState(true);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected ?? true);
    });
    return () => unsubscribe();
  }, []);

  if (isConnected) return null;

  return (
    <View style={[styles.banner, { paddingTop: Math.max(insets.top, 12) }]}>
      <MaterialCommunityIcons name="wifi-off" size={16} color="#FFF" />
      <Text style={styles.text}>No internet connection. Showing cached data.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#DC2626',
    paddingBottom: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    zIndex: 9999,
  },
  text: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
