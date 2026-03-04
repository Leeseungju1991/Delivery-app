import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MissionStackParamList } from '@/navigation/types';
import { MISSION_TEMPLATES } from '@/data/missions';
import { Card } from '@/components/Card';
import { PrimaryButton } from '@/components/PrimaryButton';

type Props = NativeStackScreenProps<MissionStackParamList, 'MissionDetail'>;

export function MissionDetailScreen({ route, navigation }: Props) {
  const { templateId } = route.params;
  const t = MISSION_TEMPLATES.find((m) => m.id === templateId);

  if (!t) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{t.title}</Text>
      <Text style={styles.desc}>{t.description}</Text>

      <Card style={{ marginTop: 12 }}>
        <Text style={styles.h}>인증 규칙</Text>
        <Text style={styles.p}>- 인증사진 필수: {t.photoRequired ? '예' : '아니오'}</Text>
        <Text style={styles.p}>- 인증 유효 시간: {t.validWindow}</Text>
      </Card>

      <Card style={{ marginTop: 12 }}>
        <Text style={styles.h}>태그(예시)</Text>
        {t.tags.slice(0, 8).map((tag) => (
          <Text key={tag} style={styles.p}>
            · {tag}
          </Text>
        ))}
        {t.tags.length > 8 ? <Text style={styles.more}>…외 {t.tags.length - 8}개</Text> : null}
      </Card>

      {t.customOptions && t.customOptions.length > 0 ? (
        <Card style={{ marginTop: 12 }}>
          <Text style={styles.h}>커스터마이징</Text>
          {t.customPrompt ? <Text style={styles.p}>{t.customPrompt}</Text> : null}
          {t.customOptions.slice(0, 10).map((opt) => (
            <Text key={opt} style={styles.p}>
              · {opt}
            </Text>
          ))}
          {t.customOptions.length > 10 ? <Text style={styles.more}>…외 {t.customOptions.length - 10}개</Text> : null}
        </Card>
      ) : null}

      <PrimaryButton
        title="이 미션 시작하기"
        onPress={() => navigation.navigate('MissionSetup', { templateId })}
        style={{ marginTop: 16 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 24 },
  title: { fontSize: 22, fontWeight: '900' },
  desc: { marginTop: 10, color: '#374151', lineHeight: 20 },
  h: { fontWeight: '800', marginBottom: 6 },
  p: { color: '#4B5563', lineHeight: 18 },
  more: { marginTop: 6, color: '#6B7280', fontSize: 12 },
});
