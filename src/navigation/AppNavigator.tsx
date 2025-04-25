import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GetStartedScreen from '../screens/GetStartedScreen';
import HomeScreen from '../screens/HomeScreen';
import TreatmentAdvice from '../screens/TreatmentAdvice';
import TreatmentAdviceDetail from '../screens/TreatmentAdviceDetail';


export type TreatmentItem = {
  id: string;
  title: string;
  crop: string;
  disease: string;
  detail: string;
};

export type RootStackParamList = {
  GetStarted: undefined;
  Home: undefined;
  IdentifyDisease: undefined;
  TreatmentAdvice: {
    favoriteUpdate?: {
      favorited: boolean;
      item: TreatmentItem;
    };
  };
  TreatmentAdviceDetail: {
    item: TreatmentItem;
    isFavorited: boolean;
    isFromSubmit?: boolean;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

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



