export const APP_NAME = "AutoStudio";

// Supabase Configuration
// These values are loaded from environment variables
// Create a .env file based on .env.example with your actual keys
export const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

// Gemini API Key
export const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';

// Theme Colors
export const COLORS = {
  background: {
    dark: '#121212',
    light: '#1E1E1E',
  },
  surface: {
    dark: '#1E1E1E',
    light: '#2A2A2A',
  },
  carbon: {
    950: '#0A0A0A',
    900: '#121212',
    800: '#1E1E1E',
    700: '#2A2A2A',
    600: '#404040',
    500: '#525252',
    400: '#A3A3A3',
    200: '#E5E5E5',
  },
  primary: '#007AFF',
  neonCyan: '#00D9FF',
  neonPurple: '#A855F7',
  text: {
    primary: '#FFFFFF',
    secondary: '#A3A3A3',
  },
} as const;

// Placeholder images
export const PLACEHOLDER_CAR_1 = "https://loremflickr.com/800/600/car?lock=1";
export const PLACEHOLDER_CAR_2 = "https://loremflickr.com/800/600/car?lock=2";
export const PLACEHOLDER_AVATAR = "https://loremflickr.com/100/100/portrait?lock=3";
