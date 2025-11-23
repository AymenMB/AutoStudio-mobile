import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface GradientImageProps {
  uri: string;
  height?: number;
  aspectRatio?: number;
  className?: string;
}

export default function GradientImage({ 
  uri, 
  height = 400, 
  aspectRatio = 1,
  className = ''
}: GradientImageProps) {
  return (
    <View className={`relative overflow-hidden ${className}`} style={{ height, aspectRatio }}>
      <Image
        source={{ uri }}
        className="w-full h-full"
        resizeMode="cover"
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0.5, 1]}
      />
    </View>
  );
}
