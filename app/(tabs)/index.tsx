import React from 'react';
import { View, Text, ScrollView, Platform, StatusBar as RNStatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import StoryCarousel from '../../components/feed/StoryCarousel';
import FeedPost from '../../components/feed/FeedPost';
import { mockStories, mockPosts } from '../../data/mockData';

export default function FeedScreen() {
  return (
    <View className="flex-1 bg-background-dark">
      <SafeAreaView edges={['top']} className="flex-1">
        {/* Floating Header */}
        <View className="absolute top-0 left-0 right-0 z-10" style={{ paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0 }}>
          <BlurView
            intensity={80}
            tint="dark"
            className="border-b border-white/10"
          >
            <View className="px-4 py-3">
              <Text className="text-white text-2xl font-bold">AutoStudio</Text>
            </View>
          </BlurView>
        </View>

        {/* Content */}
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingTop: Platform.OS === 'ios' ? 60 : (RNStatusBar.currentHeight || 0) + 60,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Stories */}
          <StoryCarousel stories={mockStories} />

          {/* Posts */}
          <View className="mt-4">
            {mockPosts.map((post) => (
              <FeedPost key={post.id} post={post} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
