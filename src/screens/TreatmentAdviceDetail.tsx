import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Pressable,
  Modal, TextInput
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
  const [title, setTitle] = useState(item.title);

  const [modalVisible, setModalVisible] = useState(false);
  const [tempTitle, setTempTitle] = useState(title); 

  const handleToggleFavorite = () => {
    setIsFavorited((prev) => !prev); 
  };

  const handleEditTitle = () => {
    setTempTitle(title);
    setModalVisible(true);
  };

  const handleConfirmTitle = () => {
    setTitle(tempTitle);
    setModalVisible(false);
  };

  const handleBack = () => {
    navigation.goBack();
  };

 
  useEffect(() => {
    return () => {
      if (onReturn) {
        onReturn({ ...item, title }, isFavorited);
      }
    };
  }, [title, isFavorited]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBack}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleEditTitle}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>

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

     
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Rename Advice</Text>
            <TextInput
              style={styles.modalInput}
              value={tempTitle}
              onChangeText={setTempTitle}
              placeholder="Enter new title"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalCancel}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleConfirmTitle} style={styles.modalConfirm}>
                <Text style={{ color: 'white' }}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  back: { color: 'green', marginBottom: 10, fontSize: 16 },
  title: {
    fontSize: 20, fontWeight: 'bold', color: 'green',
    marginBottom: 20, textAlign: 'center', textDecorationLine: 'underline'
  },
  detailBox: { padding: 15, borderWidth: 1, borderColor: '#ccc', borderRadius: 10 },
  label: { fontWeight: 'bold', color: 'green', marginTop: 10 },
  starButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  starIcon: { fontSize: 30 },
  starActive: { color: 'gold' },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center'
  },
  modalContent: {
    width: '80%', backgroundColor: 'white', borderRadius: 10, padding: 20
  },
  modalTitle: {
    fontWeight: 'bold', fontSize: 18, marginBottom: 10, color: 'green'
  },
  modalInput: {
    borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, marginBottom: 20
  },
  modalButtons: {
    flexDirection: 'row', justifyContent: 'flex-end'
  },
  modalCancel: {
    marginRight: 20
  },
  modalConfirm: {
    backgroundColor: 'green', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6
  }
});
