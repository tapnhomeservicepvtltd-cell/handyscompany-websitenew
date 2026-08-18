import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HomeColors } from '@/constants/homeTheme';
import { Typography } from '@/constants/typography';
import { Radius } from '@/constants/radius';

interface EmptyStateProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon = 'search-outline', title, subtitle, actionLabel, onAction }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={48} color={HomeColors.primary} />
      </View>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {actionLabel && onAction && (
        <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} onPress={onAction}>
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#ECFDF5', // Light green bg for icon
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    ...Typography.h3,
    color: HomeColors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    ...Typography.body,
    color: HomeColors.textFaint,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: HomeColors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: Radius.pill,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    ...Typography.button,
    color: '#FFFFFF',
  },
});
