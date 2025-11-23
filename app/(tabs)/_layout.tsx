import { Tabs } from 'expo-router';
import { BlurView } from 'expo-blur';
import { Platform, StyleSheet } from 'react-native';
import { Home, Search, Car, User } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: Platform.OS === 'ios' ? 'rgba(18, 18, 18, 0.8)' : '#121212',
          borderTopWidth: 0,
          elevation: 0,
          height: 80,
          paddingBottom: 20,
          paddingTop: 10,
        },
        tabBarBackground: () => (
          Platform.OS === 'ios' ? (
            <BlurView
              intensity={80}
              tint="dark"
              style={StyleSheet.absoluteFill}
            />
          ) : null
        ),
        tabBarActiveTintColor: '#00D9FF',
        tabBarInactiveTintColor: '#A3A3A3',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color, size }) => <Home size={size} stroke={color} />,
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: 'Discover',
          tabBarIcon: ({ color, size }) => <Search size={size} stroke={color} />,
        }}
      />
      <Tabs.Screen
        name="garage"
        options={{
          title: 'Garage',
          tabBarIcon: ({ color, size }) => <Car size={size} stroke={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} stroke={color} />,
        }}
      />
    </Tabs>
  );
}
