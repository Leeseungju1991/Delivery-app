import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import { INFO_CATEGORIES } from '@/data/categories';
import { Card } from '@/components/Card';

type Post = {
  id: string;
  category: string;
  subCategory: string;
  title: string;
  excerpt: string;
};

const MOCK_POSTS: Post[] = INFO_CATEGORIES.flatMap((c) =>
  c.subs.map((s, idx) => ({
    id: `${c.id}-${idx}`,
    category: c.name,
    subCategory: s,
    title: `[${c.name} / ${s}] 예시 게시글`,
    excerpt: '카테고리/서브카테고리 기반 리스트 구성 데모입니다. (서버 연동 전)',
  })),
);

export function InfoScreen() {
  const [q, setQ] = useState('');

  const data = useMemo(() => {
    const qq = q.trim();
    if (!qq) return MOCK_POSTS;
    return MOCK_POSTS.filter((p) => (p.title + p.category + p.subCategory).includes(qq));
  }, [q]);

  return (
    <View style={styles.container}>
      <TextInput value={q} onChangeText={setQ} placeholder="검색(데모)" style={styles.search} />

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 10, paddingBottom: 18 }}
        renderItem={({ item }) => (
          <Card>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.meta}>
              {item.category} · {item.subCategory}
            </Text>
            <Text style={styles.excerpt}>{item.excerpt}</Text>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 10 },
  search: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  title: { fontSize: 15, fontWeight: '800' },
  meta: { marginTop: 6, fontSize: 12, color: '#6B7280' },
  excerpt: { marginTop: 6, color: '#4B5563', lineHeight: 18 },
});
