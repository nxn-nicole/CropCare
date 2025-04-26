import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Button,
  StyleSheet, ScrollView, TouchableOpacity, Alert
} from 'react-native';
import { useNavigation, useIsFocused, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

// 添加类型定义以避免报错
interface FavoriteUpdateParam {
  favoriteUpdate?: {
    item: any;
    favorited: boolean;
  };
}

type Nav = NativeStackNavigationProp<RootStackParamList, 'TreatmentAdvice'>;

export default function TreatmentAdvice() {
  const navigation = useNavigation<Nav>();
  const route = useRoute();
  const isFocused = useIsFocused();

  const [crop, setCrop] = useState('');
  const [disease, setDisease] = useState('');
  const [saved, setSaved] = useState<any[]>([]);

  //提交按钮点击
  const handleSubmit = () => {
    if (!crop || !disease) {
      Alert.alert('Input Required', 'Please enter both crop and disease.');
      return;
    }
    const newItem = {
      id: Date.now(),
      title: `Advice for ${crop}`,
      crop,
      disease,
      detail: `This is a treatment suggestion for ${disease} on ${crop}.`,
    };
    navigation.navigate('TreatmentAdviceDetail', {
      item: newItem,
      isFromSubmit: true
    });
    setCrop('');
    setDisease('');
  };

  //检测从详情页返回的收藏数据
  // useEffect(() => {
  //   if (!isFocused || !('params' in route) || !route.params) return;
  
  //   const params = route.params as any;
  
  //   if (params.favoriteUpdate) {
  //     const updated = params.favoriteUpdate;
  //     setSaved(prev => {
  //       if (!updated.favorited) return prev.filter(i => i.id !== updated.item.id);
  //       if (!prev.find(i => i.id === updated.item.id)) return [...prev, updated.item];
  //       return prev;
  //     });
  
  //     // 清除参数，防止重复添加
  //     navigation.setParams({ favoriteUpdate: undefined });
  //   }
  // }, [isFocused]);
  useEffect(() => {
    if (saved.length === 0) {
      setSaved([
        {
          id: 1,
          title: 'Advice for Tomato',
          crop: 'Tomato',
          disease: 'Early Blight',
          detail: 'This is a mock detail for testing navigation.',
        },
      ]);
    }
  }, []);
  
  

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

      {saved.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.savedItem}
          onPress={() => navigation.navigate('TreatmentAdviceDetail', { item })}
        >
          <Text>{item.title}</Text>
          <Text style={styles.star}>⭐</Text>
        </TouchableOpacity>
      ))}
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
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
  },
  star: { fontSize: 20, color: 'gold' },
});
