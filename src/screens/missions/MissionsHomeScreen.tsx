import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MissionStackParamList } from '@/navigation/types';
import { MISSION_TEMPLATES } from '@/data/missions';
import { Card } from '@/components/Card';
import { PrimaryButton } from '@/components/PrimaryButton';
import { useAppStore } from '@/store/useAppStore';

type Props = NativeStackScreenProps<MissionStackParamList, 'MissionsHome'>;

export function MissionsHomeScreen({ navigation }: Props) {
  const activeMissions = useAppStore((s) => s.activeMissions);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>진행중인 미션</Text>
      {activeMissions.filter((m) => m.isActive).length === 0 ? (
        <Text style={styles.empty}>아직 진행중인 미션이 없어요.</Text>
      ) : (
        <FlatList
          data={activeMissions.filter((m) => m.isActive)}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: 10 }}
          renderItem={({ item }) => (
            <Card>
              <Text style={styles.missionTitle}>{item.title}</Text>
              <Text style={styles.meta}>
                시작: {new Date(item.createdAt).toLocaleString()} {item.reminderTime ? `· 알림 ${item.reminderTime}` : ''}
              </Text>
              <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
                <PrimaryButton
                  title="인증하기"
                  onPress={() => navigation.navigate('MissionCheckIn', { activeMissionId: item.id })}
                  style={{ flex: 1 }}
                />
              </View>
            </Card>
          )}
        />
      )}

      <View style={{ height: 18 }} />

      <Text style={styles.sectionTitle}>미션 템플릿</Text>
      <FlatList
        data={MISSION_TEMPLATES}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ paddingBottom: 18, gap: 10 }}
        renderItem={({ item }) => (
          <Card>
            <Text style={styles.missionTitle}>{item.title}</Text>
            <Text style={styles.desc} numberOfLines={2}>
              {item.description}
            </Text>
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
              <PrimaryButton
                title="상세보기"
                onPress={() => navigation.navigate('MissionDetail', { templateId: item.id })}
                style={{ flex: 1 }}
              />
              <PrimaryButton
                title="시작"
                onPress={() => navigation.navigate('MissionSetup', { templateId: item.id })}
                style={{ flex: 1 }}
              />
            </View>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 10 },
  sectionTitle: { fontSize: 16, fontWeight: '800', marginBottom: 6 },
  empty: { color: '#6B7280', marginBottom: 10 },
  missionTitle: { fontSize: 16, fontWeight: '800' },
  desc: { marginTop: 6, color: '#4B5563', lineHeight: 18 },
  meta: { marginTop: 6, fontSize: 12, color: '#6B7280' },
});
