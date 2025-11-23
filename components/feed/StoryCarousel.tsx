import React from 'react';
import { View, ScrollView, Text, Image, Pressable } from 'react-native';
import { Story } from '../../types';
import { LinearGradient } from 'expo-linear-gradient';

interface StoryCarouselProps {
  stories: Story[];
  onStoryPress?: (story: Story) => void;
}

export default function StoryCarousel({ stories, onStoryPress }: StoryCarouselProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="px-4 py-3"
      contentContainerStyle={{ gap: 12 }}
    >
      {stories.map((story) => (
        <Pressable
          key={story.id}
          onPress={() => onStoryPress?.(story)}
          className="items-center"
        >
          <View className="relative">
            {!story.has_seen ? (
              <LinearGradient
                colors={['#00D9FF', '#A855F7']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="rounded-full p-0.5"
              >
                <View className="bg-background-dark rounded-full p-0.5">
                  <Image
                    source={{ uri: story.avatar_url }}
                    className="w-14 h-14 rounded-full"
                  />
                </View>
              </LinearGradient>
            ) : (
              <View className="border-2 border-carbon-600 rounded-full p-0.5">
                <Image
                  source={{ uri: story.avatar_url }}
                  className="w-14 h-14 rounded-full"
                />
              </View>
            )}
          </View>
          <Text className="text-white text-xs mt-1 w-16 text-center" numberOfLines={1}>
            {story.username}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}
