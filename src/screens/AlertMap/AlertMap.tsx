import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { styles } from './AlertMap.styles';

interface DiseaseMarker {
  name: string;
  latitude: number;
  longitude: number;
}

export default function AlertMap() {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [diseaseMarkers, setDiseaseMarkers] = useState<DiseaseMarker[]>([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);

      // 生成 mock 数据
      const lat = loc.coords.latitude;
      const lon = loc.coords.longitude;
      const latOffset = 0.009; // 1km 纬度偏移
      const lonOffset = 0.009 / Math.cos(lat * Math.PI / 180); // 1km 经度偏移

      const mockData: DiseaseMarker[] = [
        { name: 'Tomato Blight', latitude: lat + latOffset, longitude: lon + lonOffset },
        { name: 'Corn Leaf Spot', latitude: lat - latOffset * 0.5, longitude: lon + lonOffset * 0.5 },
        { name: 'Wheat Rust', latitude: lat + latOffset * 0.8, longitude: lon - lonOffset * 0.8 },
        { name: 'Rice Bacterial Leaf Streak', latitude: lat - latOffset, longitude: lon - lonOffset },
        { name: 'Soybean Mosaic Virus', latitude: lat + latOffset * 0.3, longitude: lon + lonOffset * 0.7 },
      ];

      setDiseaseMarkers(mockData);
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

            {/* 模拟病害点标记 */}
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
          <ActivityIndicator size="large" color="#4CAF50" />
        )}
      </View>
    </View>
  );
}
