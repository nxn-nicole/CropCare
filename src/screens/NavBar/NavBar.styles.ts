import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

export const tabBarOptions: BottomTabNavigationOptions = {
  tabBarActiveTintColor: "white",
  tabBarInactiveTintColor: "#d4f0d2",
  tabBarStyle: {
    position: 'absolute',
    bottom:20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 20,
    height: 70,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    backgroundColor: "#4CAF50",
    paddingTop: 10,
    justifyContent: 'center',
  },
  headerShown: false,
  tabBarLabelStyle: {
      fontSize: 12,
      paddingBottom: 5,
    },
};
