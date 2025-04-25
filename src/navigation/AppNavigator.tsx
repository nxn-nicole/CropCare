import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GetStartedScreen from "../screens/GetStartedScreen/GetStartedScreen";
import NavBar from "../screens/NavBar/NavBar";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GetStarted">
        <Stack.Screen
          name="GetStarted"
          component={GetStartedScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
                  name="NavBar"
                  component={NavBar}
                  options={{ headerShown: false }}
                />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
