import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IdentifyDisease from './IdentifyDisease';
import TreatmentAdvice from './TreatmentAdvice';

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Identify Disease" component={IdentifyDisease} />
      <Tab.Screen name="Treatment Advice" component={TreatmentAdvice} options={{headerShown:false}}/>
     
    </Tab.Navigator>
  );
}
