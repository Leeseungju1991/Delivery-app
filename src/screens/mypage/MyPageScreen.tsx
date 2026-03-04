import React from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { Card } from '@/components/Card';
import { PrimaryButton } from '@/components/PrimaryButton';
import { useAppStore } from '@/store/useAppStore';

export function MyPageScreen() {
  const user = useAppStore((s) => s.user);
  const logout = useAppStore((s) => s.logout);
  const checkIns = useAppStore((s) => s.checkIns);
  const activeMissions = useAppStore((s) => s.activeMissions);

  if (!user) return null;

  return (
    <View style={styles.container}>
      <Card>
        <Text style={styles.title}>{user.nickname}</Text>
        <Text style={styles.meta}>로그인 상태(데모)</Text>
        <Text style={styles.meta}>진행중 미션: {activeMissions.filter((m) => m.isActive).length}개</Text>

        <PrimaryButton
          title="로그아웃"
          onPress={() =>
            Alert.alert('로그아웃', '정말 로그아웃 할까요?', [
              { text: '취소', style: 'cancel' },
              { text: '확인', style: 'destructive', onPress: () => logout() },
            ])
          }
          style={{ marginTop: 12, backgroundColor: '#6B7280' }}
        />
      </Card>

      <Text style={styles.sectionTitle}>인증 기록</Text>
      {checkIns.length === 0 ? (
        <Text style={styles.empty}>아직 인증 기록이 없어요.</Text>
      ) : (
        <FlatList
          data={checkIns}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: 10, paddingBottom: 18 }}
          renderItem={({ item }) => (
            <Card>
              <Text style={styles.recordTitle}>
                {item.status === 'success' ? '✅ 인증 성공' : '⚠️ 인증 실패'}
              </Text>
              <Text style={styles.meta}>일시: {new Date(item.createdAt).toLocaleString()}</Text>
              {item.tag ? <Text style={styles.meta}>태그: {item.tag}</Text> : null}
              {item.note ? <Text style={styles.note}>{item.note}</Text> : null}
            </Card>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 10 },
  title: { fontSize: 18, fontWeight: '900' },
  meta: { marginTop: 6, color: '#6B7280' },
  sectionTitle: { marginTop: 10, fontSize: 16, fontWeight: '800' },
  empty: { color: '#6B7280' },
  recordTitle: { fontSize: 14, fontWeight: '800' },
  note: { marginTop: 8, color: '#374151', lineHeight: 18 },
});
