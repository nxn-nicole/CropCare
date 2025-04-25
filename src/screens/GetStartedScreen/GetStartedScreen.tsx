import React from 'react';
import { View, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import styles from './GetStartedScreen.styles'; // 引入样式

export default function GetStartedScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/logo.png')}
        style={styles.logo}
      />

      <Text style={styles.appName}>CropCare</Text>
      <Text style={styles.subtitle}>
        Easily identify crop disease at your{'\n'}fingertips
      </Text>

      <Button
        mode="contained"
        onPress={() => navigation.navigate('Home')}
        style={styles.button}
        labelStyle={styles.buttonLabel}
        contentStyle={styles.buttonContent}
      >
        Get Started
      </Button>
    </View>
  );
}
