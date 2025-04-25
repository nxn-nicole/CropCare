import React, { useState } from 'react';
import {
  View, Text, TextInput, Button, StyleSheet,
  ScrollView, TouchableOpacity, Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList, TreatmentItem } from '../navigation/AppNavigator';

type Nav = NativeStackNavigationProp<RootStackParamList, 'TreatmentAdvice'>;

export default function TreatmentAdvice() {
  const navigation = useNavigation<Nav>();

  const [crop, setCrop] = useState('');
  const [disease, setDisease] = useState('');
  const [saved, setSaved] = useState<TreatmentItem[]>([]);

  const handleSubmit = async () => {
    if (!crop || !disease) {
      Alert.alert('Input Required', 'Please enter both crop and disease.');
      return;
    }

    // 模拟 API
    const adviceDetail = await new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve(`This is a treatment suggestion for ${disease} on ${crop}.`);
      }, 500);
    });

    const newItem: TreatmentItem = {
      id: `${crop}_${disease}_${Date.now()}`,
      title: `Advice for ${crop}`,
      crop,
      disease,
      detail: adviceDetail,
    };

    navigation.navigate('TreatmentAdviceDetail', {
      item: newItem,
      isFavorited: false,
      isFromSubmit: true,
      onReturn: (returnedItem, favorited) => {
        setSaved((prev) => {
          const exists = prev.find((i) => i.id === returnedItem.id);
          if (favorited && !exists) return [...prev, returnedItem];
          if (!favorited && exists) return prev.filter((i) => i.id !== returnedItem.id);
          return prev;
        });
      },
    });

    setCrop('');
    setDisease('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.pageTitle}>Treatment Advice</Text>

      <View style={styles.inputBox}>
        <Text style={styles.inputTitle}>Get treatment advice</Text>
        <TextInput style={styles.input} placeholder="Crop" value={crop} onChangeText={setCrop} />
        <TextInput style={styles.input} placeholder="Disease" value={disease} onChangeText={setDisease} />
        <View style={styles.submitButton}>
          <Button title="Submit" onPress={handleSubmit} color="#fff" />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Your saved advice</Text>
      <View style={styles.divider} />

      {saved.length > 0 ? (
        saved.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={styles.savedItem}
            onPress={() =>
              navigation.navigate('TreatmentAdviceDetail', {
                item,
                isFavorited: true,
                isFromSubmit: false,
                onReturn: (returnedItem, favorited) => {
                  setSaved((prev) => {
                    const exists = prev.find((i) => i.id === returnedItem.id);
                    if (favorited && !exists) return [...prev, returnedItem];
                    if (!favorited && exists) return prev.filter((i) => i.id !== returnedItem.id);
                    return prev;
                  });
                },
              })
            }
          >
            <Text>{item.title}</Text>
            <Text style={styles.star}>⭐</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text>No saved advice yet.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flexGrow: 1 },
  pageTitle: { fontSize: 22, color: 'green', fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  inputBox: { borderWidth: 1, borderColor: 'green', borderRadius: 10, padding: 16, marginBottom: 30 },
  inputTitle: { fontWeight: 'bold', color: 'green', marginBottom: 10, fontSize: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 8, marginBottom: 12 },
  submitButton: { backgroundColor: 'green', borderRadius: 6, overflow: 'hidden', marginTop: 10 },
  sectionTitle: { fontWeight: 'bold', color: 'green', marginBottom: 5 },
  divider: { height: 1, backgroundColor: '#ccc', marginBottom: 15 },
  savedItem: {
    borderWidth: 1, borderColor: 'green', borderRadius: 8, padding: 12,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10
  },
  star: { fontSize: 20, color: 'gold' },
});
