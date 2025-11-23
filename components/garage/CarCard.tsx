import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Edit, Trash2 } from 'lucide-react-native';
import { Car } from '../../types';
import GradientImage from '../ui/GradientImage';

interface CarCardProps {
  car: Car;
  onEdit?: (car: Car) => void;
  onDelete?: (carId: string) => void;
}

export default function CarCard({ car, onEdit, onDelete }: CarCardProps) {
  return (
    <Pressable className="mb-4">
      <View className="bg-surface-dark rounded-xl overflow-hidden border border-white/10">
        <GradientImage 
          uri={car.image_url} 
          height={220}
          aspectRatio={0.8}
        />
        <View className="absolute bottom-0 left-0 right-0 p-4">
          <Text className="text-white font-bold text-lg">
            {car.make} {car.model}
          </Text>
          <Text className="text-neon-cyan text-sm font-medium">
            {car.year} • {car.category || 'Automotive'}
          </Text>
          {car.specs && (
            <Text className="text-text-secondary-dark text-xs mt-1">
              {car.specs.horsepower}HP • {car.specs.engine}
            </Text>
          )}
        </View>

        {/* Action Buttons */}
        {(onEdit || onDelete) && (
          <View className="flex-row gap-2 p-3 border-t border-white/5">
            {onEdit && (
              <Pressable
                onPress={() => onEdit(car)}
                className="flex-1 bg-carbon-800 py-2 rounded-lg flex-row items-center justify-center gap-2"
              >
                <Edit size={16} color="#00D9FF" />
                <Text className="text-neon-cyan text-sm font-semibold">Edit</Text>
              </Pressable>
            )}
            {onDelete && (
              <Pressable
                onPress={() => onDelete(car.id)}
                className="flex-1 bg-carbon-800 py-2 rounded-lg flex-row items-center justify-center gap-2"
              >
                <Trash2 size={16} color="#FF3B30" />
                <Text className="text-red-500 text-sm font-semibold">Delete</Text>
              </Pressable>
            )}
          </View>
        )}
      </View>
    </Pressable>
  );
}
