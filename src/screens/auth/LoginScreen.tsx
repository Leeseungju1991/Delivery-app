import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { PrimaryButton } from '@/components/PrimaryButton';
import { useAppStore } from '@/store/useAppStore';

export function LoginScreen() {
  const [nickname, setNickname] = useState('');
  const login = useAppStore((s) => s.login);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>닉네임</Text>
      <TextInput
        value={nickname}
        onChangeText={setNickname}
        placeholder="예: 승주"
        autoCapitalize="none"
        style={styles.input}
      />

      <PrimaryButton
        title="로그인"
        onPress={() => {
          if (!nickname.trim()) {
            Alert.alert('입력 필요', '닉네임을 입력해주세요.');
            return;
          }
          login(nickname);
        }}
        style={{ marginTop: 12 }}
      />

      <Text style={styles.hint}>
        * 실제 OAuth(카카오/애플 등) 연동 대신, 로컬 데모용 로그인입니다.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 14, color: '#374151', marginBottom: 8 },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  hint: { marginTop: 12, fontSize: 12, color: '#6B7280', lineHeight: 18 },
});
