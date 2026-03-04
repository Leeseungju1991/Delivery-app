import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/navigation/types';
import { PrimaryButton } from '@/components/PrimaryButton';

type Props = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;

export function WelcomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>배달어플</Text>
      <Text style={styles.subtitle}>기능 명세 기반 데모 앱 (로컬 상태 / Mock 데이터)</Text>

      <PrimaryButton title="시작하기" onPress={() => navigation.navigate('Login')} style={{ marginTop: 18 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 34, fontWeight: '800' },
  subtitle: { marginTop: 10, fontSize: 14, color: '#6B7280', lineHeight: 20 },
});
