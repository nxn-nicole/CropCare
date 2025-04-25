import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GetStartedScreen from '../screens/GetStartedScreen';
import HomeScreen from '../screens/HomeScreen';
import TreatmentAdvice from '../screens/TreatmentAdvice';
import TreatmentAdviceDetail from '../screens/TreatmentAdviceDetail';

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  GetStarted: undefined;
  Home: undefined;
  IdentifyDisease: undefined;
  TreatmentAdvice: {
    favoriteUpdate?: {
      favorited: boolean;
      item: {
        id: number;
        title: string;
        crop: string;
        disease: string;
        detail: string;
      };
    };
  };
  TreatmentAdviceDetail: {
    item: {
      id: number;
      title: string;
      crop: string;
      disease: string;
      detail: string;
    };
    isFromSubmit?: boolean; // 👈 添加这一行即可解决报错
  };
};


export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GetStarted">
        <Stack.Screen name="GetStarted" component={GetStartedScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TreatmentAdvice" component={TreatmentAdvice} options={{ headerShown: false }}/>
        <Stack.Screen name="TreatmentAdviceDetail" component={TreatmentAdviceDetail} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>    
  );
}  



