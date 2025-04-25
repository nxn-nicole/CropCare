import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Nav = NativeStackNavigationProp<RootStackParamList, 'TreatmentAdviceDetail'>;

export default function TreatmentAdviceDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation<Nav>();
  const { item } = route.params as any;

  const [favorited, setFavorited] = useState(false);

  const toggleFavorite = () => {
    const newState = !favorited;
    setFavorited(newState);
    navigation.navigate('TreatmentAdvice', {
      favoriteUpdate: {
        item,
        favorited: newState
      }
    } as any);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>
        Crop: {item.crop}{'\n'}
        Disease: {item.disease}{'\n\n'}
        {item.detail}
      </Text>

      <TouchableOpacity style={styles.favButton} onPress={toggleFavorite}>
        <Text style={{ fontSize: 28 }}>{favorited ? '⭐' : '☆'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  back: { fontSize: 18, marginBottom: 10, color: 'green' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: 'green' },
  content: { fontSize: 16, lineHeight: 24 },
  favButton: {
    position: 'absolute', bottom: 20, right: 20,
    backgroundColor: '#fff', padding: 10
  },
});
