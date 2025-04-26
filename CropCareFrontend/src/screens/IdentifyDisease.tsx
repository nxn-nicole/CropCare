import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image,
  Modal, Pressable, Alert, ActivityIndicator, ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Nav = NativeStackNavigationProp<RootStackParamList, 'TreatmentAdvice'>;

export default function IdentifyDisease() {
  const [image, setImage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('');
  const [issue, setIssue] = useState('');

  const navigation = useNavigation<Nav>();

  const handleImagePick = async (source: 'camera' | 'library') => {
    let result;
    if (source === 'camera') {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });
    }

    setModalVisible(false);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleRetake = () => {
    setImage(null);
    setResponseText('');
    setType('');
    setIssue('');
  };

  const handleSubmit = async () => {
    if (!image) {
      Alert.alert('Error', 'Please upload a photo.');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', {
        uri: image,
        name: 'photo.jpg',
        type: 'image/jpeg',
      } as any);

      const response = await fetch('http://20.211.40.243:8001/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        body: formData,
      });

      const data = await response.json();
      const { prediction, probability, type, issue } = data;

      setResponseText(`${prediction}\n${probability}\n${type}\n${issue}`);
      setType(type);
      setIssue(issue);
    } catch (err) {
      Alert.alert('Upload Failed', 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const getTreatmentAdvice = async () => {
    if (!type || !issue) {
      Alert.alert('Missing Data', 'Cannot fetch advice without crop and symptom.');
      return;
    }

    try {
      const response = await fetch('http://20.211.40.243:8000/rag/by-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crop: type,
          symptom: issue,
        }),
      });

      const data = await response.json();
      const advice = data.answer || 'No advice found.';

      navigation.navigate('TreatmentAdviceDetail', {
        item: {
          id: Date.now().toString(),
          title: `Advice for ${type}`,
          crop: type,
          symptom: issue,
          detail: advice,
        },
        isFromSubmit: true,
        isFavorited: false,
      });
    } catch (error) {
      Alert.alert('Fetch Failed', 'Unable to retrieve treatment advice.');
    }
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={true}
    >
      <Text style={styles.title}>Identify Disease</Text>

      <TouchableOpacity style={styles.uploadButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="camera" size={20} color="white" style={{ marginRight: 8 }} />
        <Text style={styles.uploadText}>Upload a image</Text>
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
        ) : (
          <Ionicons name="camera" size={80} color="#ccc" />
        )}
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.retakeButton} onPress={handleRetake}>
          <Text style={styles.retakeText}>Retake</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          {loading ? <ActivityIndicator color="white" /> : <Text style={styles.submitText}>Submit photo</Text>}
        </TouchableOpacity>
      </View>

      <Text style={styles.noteText}>
        Ensure your photo is clear and in colour.{'\n'}
        Use a plain background and avoid shadows.{'\n'}
        We accept JPEG and PNG formats.
      </Text>

      {responseText ? (
        <View style={styles.resultBox}>
          <Text>{responseText}</Text>
        </View>
      ) : null}

      {responseText ? (
        <TouchableOpacity style={styles.adviceButton} onPress={getTreatmentAdvice}>
          <Text style={styles.adviceText}>Get Treatment Advice</Text>
        </TouchableOpacity>
      ) : null}

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Pressable style={styles.modalButton} onPress={() => handleImagePick('camera')}>
            <Text style={styles.modalText}>Take a photo</Text>
          </Pressable>
          <Pressable style={styles.modalButton} onPress={() => handleImagePick('library')}>
            <Text style={styles.modalText}>Choose from album</Text>
          </Pressable>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    padding: 20,
    paddingBottom: 100, // avoid tab bar
  },
  title: {
    color: '#4FAD53',
    fontSize: 24,
    fontFamily: 'Inter',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 40,
  },
  uploadButton: {
    backgroundColor: '#4FAD53',
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    marginBottom: 20,
  },
  uploadText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter',
  },
  imageContainer: {
    height: 250,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  retakeButton: {
    flex: 0.48,
    borderWidth: 1,
    borderColor: '#4FAD53',
    borderRadius: 25,
    padding: 12,
    alignItems: 'center',
  },
  retakeText: {
    color: '#4FAD53',
    fontFamily: 'Inter',
  },
  submitButton: {
    flex: 0.48,
    backgroundColor: '#4FAD53',
    borderRadius: 25,
    padding: 12,
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontFamily: 'Inter',
  },
  noteText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
    lineHeight: 20,
  },
  resultBox: {
    borderColor: '#4FAD53',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  adviceButton: {
    backgroundColor: '#1E5020',
    borderRadius: 25,
    padding: 12,
    alignItems: 'center',
  },
  adviceText: {
    color: 'white',
    fontFamily: 'Inter',
    fontSize: 16,
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 20,
  },
  modalButton: {
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalText: {
    fontSize: 16,
  },
});
