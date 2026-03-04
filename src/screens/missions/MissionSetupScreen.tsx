import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MissionStackParamList } from '@/navigation/types';
import { MISSION_TEMPLATES } from '@/data/missions';
import { Card } from '@/components/Card';
import { PrimaryButton } from '@/components/PrimaryButton';
import { useAppStore } from '@/store/useAppStore';

type Props = NativeStackScreenProps<MissionStackParamList, 'MissionSetup'>;

export function MissionSetupScreen({ route, navigation }: Props) {
  const { templateId } = route.params;
  const t = MISSION_TEMPLATES.find((m) => m.id === templateId);
  const startMission = useAppStore((s) => s.startMission);

  const [reminderTime, setReminderTime] = useState('20:00');
  const [customValue, setCustomValue] = useState('');

  const canUseCustom = useMemo(() => (t?.customOptions?.length ?? 0) > 0, [t]);

  if (!t) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>미션 설정</Text>
      <Text style={styles.subtitle}>{t.title}</Text>

      <Card style={{ marginTop: 12 }}>
        <Text style={styles.label}>알림 시간(데모)</Text>
        <Text style={styles.hint}>* 실제 푸시알림 연동 전 단계로, 시간만 저장합니다.</Text>
        <TextInput value={reminderTime} onChangeText={setReminderTime} placeholder="예: 20:00" style={styles.input} />
      </Card>

      {canUseCustom ? (
        <Card style={{ marginTop: 12 }}>
          <Text style={styles.label}>커스터마이징</Text>
          {t.customPrompt ? <Text style={styles.hint}>{t.customPrompt}</Text> : null}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
            {t.customOptions?.slice(0, 12).map((opt) => (
              <Pressable
                key={opt}
                onPress={() => setCustomValue(opt)}
                style={[
                  styles.chip,
                  customValue === opt ? styles.chipActive : null,
                ]}
              >
                <Text style={[styles.chipText, customValue === opt ? styles.chipTextActive : null]}>{opt}</Text>
              </Pressable>
            ))}
          </View>
          <TextInput
            value={customValue}
            onChangeText={setCustomValue}
            placeholder="직접 입력도 가능"
            style={[styles.input, { marginTop: 10 }]}
          />
        </Card>
      ) : null}

      <PrimaryButton
        title="미션 시작"
        onPress={() => {
          const m = startMission(templateId, { reminderTime, customValue: customValue.trim() || undefined });
          navigation.navigate('MissionCheckIn', { activeMissionId: m.id });
        }}
        style={{ marginTop: 16 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 24 },
  title: { fontSize: 22, fontWeight: '900' },
  subtitle: { marginTop: 6, color: '#374151' },
  label: { fontWeight: '800' },
  hint: { marginTop: 6, fontSize: 12, color: '#6B7280', lineHeight: 18 },
  input: {
    marginTop: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#D1D5DB',
    backgroundColor: 'white',
  },
  chipActive: { backgroundColor: '#111827', borderColor: '#111827' },
  chipText: { color: '#111827', fontSize: 12, fontWeight: '700' },
  chipTextActive: { color: 'white' },
});
