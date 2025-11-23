import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Car, Sparkles } from 'lucide-react-native';
import { supabase } from '../services/supabaseClient';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async () => {
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setError('Check your email for the login link!');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.replace('/(tabs)');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background-dark">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            padding: 16,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View className="w-full max-w-md mx-auto bg-surface-dark rounded-2xl border border-white/10 p-8">
            {/* Logo */}
            <View className="items-center mb-8">
              <View className="w-16 h-16 bg-primary rounded-2xl items-center justify-center mb-4">
                <Car size={32} stroke="#FFFFFF" />
              </View>
              <Text className="text-3xl font-bold text-white">AutoStudio</Text>
              <Text className="text-text-secondary-dark mt-2 text-center">
                The future of automotive curation.
              </Text>
            </View>

            {/* Error Message */}
            {error && (
              <View className="bg-red-900/20 border border-red-900 rounded-lg p-3 mb-6">
                <Text className="text-red-300 text-sm text-center">{error}</Text>
              </View>
            )}

            {/* Email Input */}
            <View className="mb-4">
              <Text className="text-xs font-medium text-text-secondary-dark mb-1 uppercase tracking-wider">
                Email
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="racer@autostudio.com"
                placeholderTextColor="#A3A3A3"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                className="w-full bg-background-dark border border-white/20 rounded-xl p-3 text-white"
              />
            </View>

            {/* Password Input */}
            <View className="mb-6">
              <Text className="text-xs font-medium text-text-secondary-dark mb-1 uppercase tracking-wider">
                Password
              </Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor="#A3A3A3"
                secureTextEntry
                autoCapitalize="none"
                className="w-full bg-background-dark border border-white/20 rounded-xl p-3 text-white"
              />
            </View>

            {/* Submit Button */}
            <Pressable
              onPress={handleAuth}
              disabled={loading}
              className="w-full bg-primary rounded-xl py-3 flex-row items-center justify-center gap-2"
            >
              <Text className="text-white font-bold">
                {loading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
              </Text>
              {!loading && <Sparkles size={16} stroke="#FFFFFF" />}
            </Pressable>

            {/* Toggle Sign Up/Sign In */}
            <View className="mt-6 items-center">
              <Pressable onPress={() => setIsSignUp(!isSignUp)}>
                <Text className="text-text-secondary-dark text-sm">
                  {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
