import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Platform, StatusBar as RNStatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus } from 'lucide-react-native';
import CarCard from '../../components/garage/CarCard';
import { mockCars } from '../../data/mockData';
import { Car } from '../../types';

export default function GarageScreen() {
  const [cars] = useState<Car[]>(mockCars);

  return (
    <View className="flex-1 bg-background-dark">
      <SafeAreaView edges={['top']} className="flex-1">
        {/* Header */}
        <View 
          className="px-4 py-3 border-b border-white/10"
          style={{ paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0 }}
        >
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-white text-2xl font-bold">My Garage</Text>
              <Text className="text-text-secondary-dark text-sm">
                {cars.length} {cars.length === 1 ? 'vehicle' : 'vehicles'}
              </Text>
            </View>
            <Pressable className="bg-primary rounded-full p-3">
              <Plus size={24} stroke="#FFFFFF" />
            </Pressable>
          </View>
        </View>

        {/* Cars Grid */}
        <ScrollView
          className="flex-1 px-4 pt-4"
          contentContainerStyle={{
            paddingBottom: 100,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-row flex-wrap justify-between">
            {cars.map((car, index) => (
              <View key={car.id} style={{ width: '48%' }}>
                <CarCard car={car} />
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
