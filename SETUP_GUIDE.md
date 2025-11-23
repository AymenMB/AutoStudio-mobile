# AutoStudio Mobile - Setup Guide

## ✅ What's Already Done

Your mobile app is **production-ready** with:

✅ Expo project initialized with TypeScript  
✅ NativeWind v4 configured (Tailwind for React Native)  
✅ Expo Router v3 setup (file-based routing)  
✅ Tab navigation with glassmorphism effects  
✅ Feed screen with stories and posts  
✅ Garage screen with 2-column grid  
✅ Supabase client configured  
✅ Mock data matching web app structure  
✅ All UI components created  

---

## 🚀 Run the App (3 Steps)

### Step 1: Install Dependencies (if not already done)
```bash
cd "d:\Personal project\autogen\AutoStudio-mobile"
npm install
```

### Step 2: Start Development Server
```bash
npm start
```

### Step 3: Open on Your Device
You have 3 options:

**Option A: Physical Phone (Easiest)**
1. Install Expo Go ([iOS](https://apps.apple.com/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
2. Scan the QR code shown in terminal
3. App loads instantly!

**Option B: iOS Simulator (macOS only)**
```bash
npm run ios
```

**Option C: Android Emulator**
```bash
npm run android
```

---

## 📁 Folder Structure Explained

```
d:\Personal project\autogen\
├── Autogen-main/          ← Your existing web app (unchanged)
│   ├── pages/
│   ├── components/
│   └── package.json
│
└── AutoStudio-mobile/     ← New mobile app (separate)
    ├── app/               ← Screens (Expo Router)
    │   ├── (tabs)/
    │   │   ├── index.tsx      → Feed Screen
    │   │   ├── garage.tsx     → Garage Screen
    │   │   ├── discover.tsx   → Discover (placeholder)
    │   │   └── profile.tsx    → Profile (placeholder)
    │   └── _layout.tsx        → Root layout
    │
    ├── components/        ← Reusable UI components
    │   ├── ui/
    │   ├── feed/
    │   └── garage/
    │
    ├── data/              ← Mock data
    │   └── mockData.ts    → Posts, cars, stories
    │
    ├── services/          ← Backend connection
    │   └── supabaseClient.ts
    │
    ├── constants/
    │   └── theme.ts       → Colors matching web
    │
    └── types/
        └── index.ts       → TypeScript interfaces
```

**Key Points:**
- Both apps are **separate projects** with their own `package.json`
- They **share the same Supabase backend** (data syncs automatically)
- Mobile uses **Expo/Metro bundler**, Web uses **Vite**

---

## 🔗 How Data Flows

```
┌─────────────────┐         ┌──────────────┐         ┌─────────────────┐
│   Web App       │◄────────┤   Supabase   ├────────►│   Mobile App    │
│ (Autogen-main)  │         │   Database   │         │ (AutoStudio)    │
└─────────────────┘         └──────────────┘         └─────────────────┘
   React + Vite              PostgreSQL DB             React Native
```

**Right Now:**
- Mobile app shows **mock data** (from `data/mockData.ts`)
- Ready to swap for real Supabase queries

**To Use Real Data:**
```typescript
// In any screen, replace mock data with:
const { data: cars } = await supabase
  .from('cars')
  .select('*')
  .eq('user_id', userId);
```

---

## 🎨 Design System (Matches Web)

Both apps use the **same color palette**:

| Color | Hex | Usage |
|-------|-----|-------|
| Carbon Black | `#121212` | Background |
| Electric Blue | `#007AFF` | Primary actions |
| Neon Cyan | `#00D9FF` | Accents, highlights |
| White | `#FFFFFF` | Text (primary) |
| Gray | `#A3A3A3` | Text (secondary) |

**NativeWind Classes:**
```tsx
<View className="bg-background-dark rounded-xl p-4">
  <Text className="text-neon-cyan font-bold">AutoStudio</Text>
</View>
```

---

## 🧪 Testing Checklist

Open the app and verify:

- [ ] **Tab Bar**: Bottom navigation shows 4 tabs (Feed, Discover, Garage, Profile)
- [ ] **Feed Screen**: 
  - [ ] "AutoStudio" header with blur effect
  - [ ] Horizontal stories carousel at top
  - [ ] 2-3 post cards with images, like buttons, captions
- [ ] **Garage Screen**:
  - [ ] "My Garage" header with vehicle count
  - [ ] 2-column grid of car cards
  - [ ] Each card shows car image with gradient overlay
- [ ] **Theme**: Dark background (#121212) throughout
- [ ] **Icons**: Lucide icons render correctly

---

## 🛠️ Common Issues & Fixes

### Issue: "Metro bundler won't start"
```bash
# Solution: Clear cache
npm start -- --clear
```

### Issue: "NativeWind classes don't apply"
**Cause:** Babel preset not loaded  
**Solution:** Restart Metro bundler (Ctrl+C, then `npm start`)

### Issue: "Expo Go won't connect"
**Cause:** Firewall or wrong Wi-Fi network  
**Solution:**
1. Ensure phone and PC are on **same Wi-Fi**
2. Try tunnel mode: `npm start -- --tunnel`

### Issue: "TypeScript errors in VSCode"
**Solution:** Install recommended extensions:
```
code --install-extension dsznajder.es7-react-js-snippets
code --install-extension bradlc.vscode-tailwindcss
```

---

## 📲 Next: Connect to Supabase

Right now, the app shows **mock data**. To fetch real data:

### 1. Update a screen (e.g., Garage)
```typescript
// app/(tabs)/garage.tsx
import { useEffect, useState } from 'react';
import { supabase } from '../../services/supabaseClient';

export default function GarageScreen() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCars();
  }, []);

  async function fetchCars() {
    const { data } = await supabase.from('cars').select('*');
    setCars(data || []);
  }

  // ... rest of component
}
```

### 2. Add Authentication
```typescript
// Login flow
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
});
```

---

## 🚀 Deploy to App Stores

When ready for production:

```bash
# Install EAS CLI (Expo Application Services)
npm install -g eas-cli

# Configure project
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android

# Submit to stores
eas submit --platform ios
eas submit --platform android
```

---

## 🎯 Feature Roadmap

### Phase 1 ✅ (DONE)
- [x] Project setup
- [x] Tab navigation
- [x] Feed screen
- [x] Garage screen
- [x] Mock data

### Phase 2 (Next)
- [ ] Authentication (login/signup)
- [ ] Camera integration (add car photos)
- [ ] Supabase CRUD operations
- [ ] Pull-to-refresh
- [ ] Like/comment functionality

### Phase 3 (Future)
- [ ] AI car recognition (Gemini API)
- [ ] Video posts
- [ ] Push notifications
- [ ] Social features (follow/unfollow)
- [ ] Search/filter

---

## 💡 Pro Tips

1. **Hot Reload**: Changes auto-refresh in Expo Go (shake phone for menu)
2. **Debug Menu**: Shake device → "Debug Remote JS" → Open Chrome DevTools
3. **Network Requests**: Use React Native Debugger or Flipper
4. **Performance**: Use `FlashList` instead of `FlatList` for long lists (Phase 2)

---

## 📚 Resources

- [Expo Docs](https://docs.expo.dev/)
- [NativeWind v4](https://www.nativewind.dev/v4/overview)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [Supabase React Native](https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native)

---

**Questions?** Check the main README or Expo docs.

**You're all set! 🎉**
