import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import AlertMap from "../AlertMap/AlertMap";
import IdentifyDisease from "../IdentifyDisease";
import TreatmentAdvice from "../TreatmentAdvice";
import { tabBarOptions } from "./NavBar.styles";

const Tab = createBottomTabNavigator();

export default function NavBar() {
  return (
    <Tab.Navigator screenOptions={tabBarOptions}>

      <Tab.Screen
        name="Identify Disease"
        component={IdentifyDisease}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="flower-outline" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Treatment Advice"
        component={TreatmentAdvice}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="hand-heart-outline" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
              name="Alert Map"
              component={AlertMap}
              options={{
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="map-outline" color={color} size={24} />
                ),
              }}
            />
    </Tab.Navigator>
  );
}
