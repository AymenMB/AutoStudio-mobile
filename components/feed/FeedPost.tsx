import React, { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react-native';
import { Post } from '../../types';

interface FeedPostProps {
  post: Post;
}

export default function FeedPost({ post }: FeedPostProps) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <View className="mb-8">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3">
        <Image
          source={{ uri: post.user.avatar_url }}
          className="w-10 h-10 rounded-full"
        />
        <Text className="text-white font-medium text-sm ml-3 flex-1">
          {post.user.username}
        </Text>
        <Pressable className="p-2">
          <View className="flex-row gap-1">
            <View className="w-1 h-1 rounded-full bg-text-secondary-dark" />
            <View className="w-1 h-1 rounded-full bg-text-secondary-dark" />
            <View className="w-1 h-1 rounded-full bg-text-secondary-dark" />
          </View>
        </Pressable>
      </View>

      {/* Image */}
      <Image
        source={{ uri: post.media_url }}
        className="w-full aspect-square"
        resizeMode="cover"
      />

      {/* Action Bar */}
      <View className="flex-row items-center px-4 py-3">
        <Pressable onPress={() => setLiked(!liked)} className="mr-4">
          <Heart
            size={26}
            color={liked ? '#FF3B30' : '#FFFFFF'}
            fill={liked ? '#FF3B30' : 'none'}
          />
        </Pressable>
        <Pressable className="mr-4">
          <MessageCircle size={26} color="#FFFFFF" />
        </Pressable>
        <Pressable className="mr-auto">
          <Send size={26} color="#FFFFFF" />
        </Pressable>
        <Pressable onPress={() => setSaved(!saved)}>
          <Bookmark
            size={26}
            color="#FFFFFF"
            fill={saved ? '#FFFFFF' : 'none'}
          />
        </Pressable>
      </View>

      {/* Info */}
      <View className="px-4">
        <Text className="text-white font-semibold text-sm mb-1">
          {post.likes_count.toLocaleString()} likes
        </Text>
        <Text className="text-white text-sm">
          <Text className="font-semibold">{post.user.username}</Text>{' '}
          {post.caption}
        </Text>
        <Pressable>
          <Text className="text-text-secondary-dark text-sm mt-1">
            View all comments
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
