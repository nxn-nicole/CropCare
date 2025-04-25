import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Pressable
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Nav = NativeStackNavigationProp<RootStackParamList, 'TreatmentAdviceDetail'>;
type Route = RouteProp<RootStackParamList, 'TreatmentAdviceDetail'>;

export default function TreatmentAdviceDetail() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { item, isFavorited: initiallyFavorited, onReturn } = route.params;

  const [isFavorited, setIsFavorited] = useState(initiallyFavorited);

  const handleToggleFavorite = () => {
    const updated = !isFavorited;
    setIsFavorited(updated);

    if (onReturn) {
      onReturn(item, updated);
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* ✅ 永远显示返回按钮 */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{item.title}</Text>

      <View style={styles.detailBox}>
        <Text style={styles.label}>Crop:</Text>
        <Text>{item.crop}</Text>
        <Text style={styles.label}>Disease:</Text>
        <Text>{item.disease}</Text>
        <Text style={styles.label}>Suggestion:</Text>
        <Text>{item.detail}</Text>
      </View>

      <Pressable onPress={handleToggleFavorite} style={styles.starButton}>
        <Text style={[styles.starIcon, isFavorited && styles.starActive]}>
          {isFavorited ? '⭐' : '☆'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  back: { color: 'green', marginBottom: 10, fontSize: 16 },
  title: { fontSize: 20, fontWeight: 'bold', color: 'green', marginBottom: 20, textAlign: 'center' },
  detailBox: { padding: 15, borderWidth: 1, borderColor: '#ccc', borderRadius: 10 },
  label: { fontWeight: 'bold', color: 'green', marginTop: 10 },
  starButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  starIcon: { fontSize: 30 },
  starActive: { color: 'gold' }
});
