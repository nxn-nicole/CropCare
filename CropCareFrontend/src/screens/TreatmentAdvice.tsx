import React, { useState } from 'react';
import {
  View, Text, TextInput, Button, StyleSheet,
  ScrollView, TouchableOpacity, Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import TreatmentItem from'../models/TreatmentAdviceDTO';
import axios from 'axios'; 
type Nav = NativeStackNavigationProp<RootStackParamList, 'TreatmentAdvice'>;

export default function TreatmentAdvice() {
  const navigation = useNavigation<Nav>();

  const [crop, setCrop] = useState('');
  const [symptom, setSymptom] = useState('');
  const [saved, setSaved] = useState<TreatmentItem[]>([]);
  const [refreshFlag, setRefreshFlag] = useState(false); 

  const handleSubmit = async () => {
    if (!crop || !symptom) {
      Alert.alert('Input Required', 'Please enter both crop and symptom.');
      return;
    }
    const response = await await axios.post('http://20.211.40.243:8000/rag/by-text', {
      crop: crop.trim(),
      symptom: symptom.trim()
    });
    
        
    console.log('response from server:', response.data.answer);
    const adviceDetail = response.data?.answer || 'No advice found.';
    if (!adviceDetail) {
      console.warn('No "result" field found in server response:', response.data);
    }

    const newItem: TreatmentItem = {
      id: `${crop}_${symptom}_${Date.now()}`,
      title: `Advice for ${crop}`,
      crop,
      symptom,
      detail: adviceDetail,
    };

    navigation.navigate('TreatmentAdviceDetail', {
      item: newItem,
      isFavorited: false,
      isFromSubmit: true,
      onReturn: (returnedItem, favorited) => {
        setSaved((prev) => {
          const exists = prev.find((i) => i.id === returnedItem.id);
          let updated = prev;

          if (favorited) {
            if (exists) {
              updated = prev.map((i) =>
                i.id === returnedItem.id ? returnedItem : i
              );
            } else {
              updated = [...prev, returnedItem];
            }
          } else {
            updated = prev.filter((i) => i.id !== returnedItem.id);
          }

          setRefreshFlag((f) => !f); 
          return updated;
        });
      },
    });

    setCrop('');
    setSymptom('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
     
      {refreshFlag && null}

      <Text style={styles.pageTitle}>Treatment Advice</Text>

      <View style={styles.inputBox}>
        <Text style={styles.inputTitle}>Get treatment advice</Text>
        <TextInput
          style={styles.input}
          placeholder="Crop"
          value={crop}
          onChangeText={setCrop}
        />
        <TextInput
          style={styles.input}
          placeholder="Disease/Symptom"
          value={symptom}
          onChangeText={setSymptom}
        />
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
                    let updated = prev;

                    if (favorited) {
                      if (exists) {
                        updated = prev.map((i) =>
                          i.id === returnedItem.id ? returnedItem : i
                        );
                      } else {
                        updated = [...prev, returnedItem];
                      }
                    } else {
                      updated = prev.filter((i) => i.id !== returnedItem.id);
                    }

                    setRefreshFlag((f) => !f); 
                    return updated;
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
  pageTitle: {
    color: '#4FAD53',
    fontSize: 24,
    fontFamily: 'Inter',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 40,
  },
  inputBox: { borderWidth: 1, borderColor: '#4FAD53', borderRadius: 10, padding: 16, marginBottom: 30 },
  inputTitle: { fontWeight: 'bold', color: '#4FAD53', marginBottom: 10, fontSize: 16 },
  input: { borderWidth: 1, borderColor: '#4FAD53', borderRadius: 6, padding: 8, marginBottom: 12 },
  submitButton: { backgroundColor: '#4FAD53', borderRadius: 6, overflow: 'hidden', marginTop: 10 },
  sectionTitle: { fontWeight: 'bold', color:'#4FAD53', marginBottom: 5 },
  divider: { height: 1, backgroundColor: '#ccc', marginBottom: 15 },
  savedItem: {
    borderWidth: 1, borderColor: '#4FAD53', borderRadius: 8, padding: 12,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10
  },
  star: { fontSize: 20, color: 'gold' },
});
