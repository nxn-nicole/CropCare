import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  Alert,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function IdentifyDisease() {
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleImagePick = async (type: 'camera' | 'library') => {
    let result;
    if (type === 'camera') {
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
  };

  const handleSubmit = async () => {
    if (!image) {
      Alert.alert('Error', 'Please upload a photo.');
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setResponseText('This is a dummy analysis result.');
    } catch (err) {
      Alert.alert('Upload Failed', 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const goToTreatmentAdvice = () => {
    navigation.navigate('TreatmentAdviceDetail', {
      item: {
        id: 0,
        title: 'Example',
        crop: '',
        disease: '',
        detail: responseText,
      },
      isFromSubmit: true,
    });
  };

  return (
    <ScrollView style={styles.container}>
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
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.submitText}>Submit photo</Text>
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.noteText}>Ensure your photo is clear and in colour.\nUse a plain background and avoid shadows.\nWe accept JPEG and PNG formats.</Text>

      {responseText ? (
        <View style={styles.resultBox}>
          <Text>{responseText}</Text>
        </View>
      ) : null}

      {responseText ? (
        <TouchableOpacity style={styles.adviceButton} onPress={goToTreatmentAdvice}>
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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    color: '#4FAD53',
    fontSize: 24,
    fontFamily: 'Inter',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
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
    height: '33%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
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
