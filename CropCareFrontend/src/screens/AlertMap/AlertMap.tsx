import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { styles } from './AlertMap.styles';
import DiseaseSpotDTO from '../../models/DiseaseSpotDTO';
import { getMockDiseaseData } from '../../services/DiseaseService'; // 🔥 引入service

export default function AlertMap() {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [diseaseMarkers, setDiseaseMarkers] = useState<DiseaseSpotDTO[]>([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);

      // 调用 service 层函数
      const markers = await getMockDiseaseData(loc.coords.latitude, loc.coords.longitude);
      setDiseaseMarkers(markers);
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
              latitudeDelta: 0.03,
              longitudeDelta: 0.03,
            }}
            showsUserLocation={true}
          >
            {/* 用户自身标记 */}
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="You are here"
            />

            {/* 病害点标记 */}
            {diseaseMarkers.map((marker, index) => (
              <Marker
                key={index}
                coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                title={marker.name}
                pinColor="#EB8440"
              />
            ))}
          </MapView>
        ) : (
            <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4CAF50"/>
            <Text style={styles.loadText}>Finding your alert map...</Text>
            </View>

        )}
      </View>
    </View>
  );
}
