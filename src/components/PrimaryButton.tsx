import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';

export function PrimaryButton({
  title,
  onPress,
  disabled,
  style,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.btn,
        disabled ? styles.btnDisabled : null,
        pressed && !disabled ? styles.btnPressed : null,
        style,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#111827',
    alignItems: 'center',
  },
  btnPressed: { opacity: 0.9 },
  btnDisabled: { opacity: 0.5 },
  text: { color: 'white', fontSize: 16, fontWeight: '700' },
});
