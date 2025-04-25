import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { styles } from './AlertMap.styles';

export default function Home() {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc.coords);
      })();
    }, []);

  return (
    <View style={styles.container}>
          <View style={styles.content}>
                {errorMsg ? (
                  <Text style={styles.error}>{errorMsg}</Text>
                ) : location ? (
                  <MapView
                    style={styles.map}
                    initialRegion={{
                      latitude: location.latitude,
                      longitude: location.longitude,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                    }}
                    showsUserLocation={true}
                  >
                    <Marker
                      coordinate={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                      }}
                      title="You are here"
                    />
                  </MapView>
                ) : (
                  <ActivityIndicator size="large" color="#4CAF50" />
                )}
              </View>
        </View>
  );
}



