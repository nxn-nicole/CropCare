import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GetStartedScreen from '../screens/GetStartedScreen/GetStartedScreen';
import NavBar from '../screens/NavBar/NavBar';
import TreatmentAdvice from '../screens/TreatmentAdvice';
import TreatmentAdviceDetail from '../screens/TreatmentAdviceDetail';
import TreatmentItem from '../models/TreatmentAdviceDTO';



export type RootStackParamList = {
  GetStarted: undefined;
  NavBar: undefined;
  IdentifyDisease: undefined;
  TreatmentAdvice: undefined;
  TreatmentAdviceDetail: {
    item: TreatmentItem;
    isFavorited: boolean;
    isFromSubmit?: boolean;
    onReturn?: (item: TreatmentItem, favorited: boolean) => void;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GetStarted">
        <Stack.Screen name="GetStarted" component={GetStartedScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NavBar" component={NavBar} options={{ headerShown: false }} />
        <Stack.Screen name="TreatmentAdvice" component={TreatmentAdvice} options={{ headerShown: false }}/>
        <Stack.Screen name="TreatmentAdviceDetail" component={TreatmentAdviceDetail} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
