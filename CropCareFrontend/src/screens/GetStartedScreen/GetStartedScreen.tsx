import React from "react";
import { View, Image } from "react-native";
import { Text, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import styles from "./GetStartedScreen.styles"; 

// Define the type for your navigation stack
type RootStackParamList = {
  NavBar: undefined; // Add other routes here if needed
};

// Use the navigation type
export default function GetStartedScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Image source={require("../../../assets/logo.png")} style={styles.logo} />

      <Text style={styles.appName}>CropCare</Text>
      <Text style={styles.subtitle}>
        Easily identify crop disease at your{"\n"}fingertips
      </Text>

      <Button
        mode="contained"
        onPress={() => navigation.navigate("NavBar")}
        style={styles.button}
        labelStyle={styles.buttonLabel}
        contentStyle={styles.buttonContent}
      >
        Get Started
      </Button>
    </View>
  );
}
