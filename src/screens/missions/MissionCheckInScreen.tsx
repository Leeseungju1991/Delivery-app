import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Alert, ScrollView, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MissionStackParamList } from '@/navigation/types';
import { useAppStore } from '@/store/useAppStore';
import { MISSION_TEMPLATES } from '@/data/missions';
import { Card } from '@/components/Card';
import { PrimaryButton } from '@/components/PrimaryButton';

type Props = NativeStackScreenProps<MissionStackParamList, 'MissionCheckIn'>;

export function MissionCheckInScreen({ route, navigation }: Props) {
  const { activeMissionId } = route.params;

  const activeMissions = useAppStore((s) => s.activeMissions);
  const addCheckIn = useAppStore((s) => s.addCheckIn);
  const stopMission = useAppStore((s) => s.stopMission);

  const active = activeMissions.find((m) => m.id === activeMissionId);
  const template = useMemo(() => MISSION_TEMPLATES.find((t) => t.id === active?.templateId), [active?.templateId]);

  const [note, setNote] = useState('');
  const [tag, setTag] = useState('');
  const [photoUri, setPhotoUri] = useState<string | undefined>(undefined);

  if (!active || !template) return null;

  const pickPhoto = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('권한 필요', '사진 라이브러리 권한이 필요합니다.');
      return;
    }
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!res.canceled) setPhotoUri(res.assets[0]?.uri);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{active.title}</Text>
      <Text style={styles.subtitle}>
        {active.customValue ? `커스터마이징: ${active.customValue}` : ''} {active.reminderTime ? `· 알림 ${active.reminderTime}` : ''}
      </Text>

      <Card style={{ marginTop: 12 }}>
        <Text style={styles.h}>인증 사진</Text>
        <Text style={styles.p}>필수 여부: {template.photoRequired ? '예' : '아니오'}</Text>

        {photoUri ? <Image source={{ uri: photoUri }} style={styles.photo} /> : <View style={styles.photoPlaceholder} />}

        <PrimaryButton title={photoUri ? '사진 다시 선택' : '사진 선택'} onPress={pickPhoto} style={{ marginTop: 10 }} />
      </Card>

      <Card style={{ marginTop: 12 }}>
        <Text style={styles.h}>태그 선택(예시)</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
          {template.tags.slice(0, 10).map((t) => (
            <Pressable key={t} onPress={() => setTag(t)} style={[styles.chip, tag === t ? styles.chipActive : null]}>
              <Text style={[styles.chipText, tag === t ? styles.chipTextActive : null]}>{t}</Text>
            </Pressable>
          ))}
        </View>
        <TextInput value={tag} onChangeText={setTag} placeholder="직접 입력" style={[styles.input, { marginTop: 10 }]} />
      </Card>

      <Card style={{ marginTop: 12 }}>
        <Text style={styles.h}>메모</Text>
        <TextInput
          value={note}
          onChangeText={setNote}
          placeholder="인증 메모를 적어주세요"
          style={[styles.input, { height: 90 }]}
          multiline
        />
      </Card>

      <PrimaryButton
        title="인증 완료"
        onPress={() => {
          if (template.photoRequired && !photoUri) {
            Alert.alert('사진 필요', '이 미션은 인증 사진이 필요합니다.');
            return;
          }
          addCheckIn(activeMissionId, { note: note.trim() || undefined, tag: tag.trim() || undefined, photoUri, status: 'success' });
          Alert.alert('완료', '인증이 저장되었습니다(로컬).');
          navigation.goBack();
        }}
        style={{ marginTop: 16 }}
      />

      <PrimaryButton
        title="미션 종료"
        onPress={() => {
          stopMission(activeMissionId);
          Alert.alert('미션 종료', '진행중인 미션에서 제외했습니다(로컬).');
          navigation.popToTop();
        }}
        style={{ marginTop: 10, backgroundColor: '#6B7280' }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 24 },
  title: { fontSize: 20, fontWeight: '900' },
  subtitle: { marginTop: 6, color: '#6B7280' },
  h: { fontWeight: '800' },
  p: { marginTop: 6, color: '#4B5563' },
  photo: { width: '100%', height: 220, borderRadius: 12, marginTop: 10 },
  photoPlaceholder: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginTop: 10,
    backgroundColor: '#F3F4F6',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E5E7EB',
  },
  input: {
    marginTop: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    textAlignVertical: 'top',
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
