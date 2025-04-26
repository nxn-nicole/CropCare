import DiseaseSpotDTO from '../models/DiseaseSpotDTO';

export async function getMockDiseaseData(lat: number, lon: number): Promise<DiseaseSpotDTO[]> {
  const latOffset = 0.009; // 1km 纬度偏移
  const lonOffset = 0.009 / Math.cos(lat * Math.PI / 180); // 1km 经度偏移

  const mockData: DiseaseSpotDTO[] = [
    { id: 1, name: 'Tomato Blight', latitude: lat + latOffset, longitude: lon + lonOffset },
    { id: 2, name: 'Corn Leaf Spot', latitude: lat - latOffset * 0.5, longitude: lon + lonOffset * 0.5 },
    { id: 3, name: 'Wheat Rust', latitude: lat + latOffset * 0.8, longitude: lon - lonOffset * 0.8 },
    { id: 4, name: 'Rice Bacterial Leaf Streak', latitude: lat - latOffset, longitude: lon - lonOffset },
    { id: 5, name: 'Soybean Mosaic Virus', latitude: lat + latOffset * 0.3, longitude: lon + lonOffset * 0.7 },
  ];

  return mockData;
}
