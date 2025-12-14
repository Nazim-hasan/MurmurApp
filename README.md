# 📣 MurmurApp - Connect, Share, and Engage

A feature-rich React Native mobile application for posting and interacting with "murmurs" (short messages similar to tweets), with full authentication and offline support.

![React Native](https://img.shields.io/badge/React%20Native-0.82+-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)
![Redux](https://img.shields.io/badge/Redux%20Toolkit-2.0+-purple.svg)
![Supabase](https://img.shields.io/badge/Supabase-1.0+-green.svg)
![MMKV](https://img.shields.io/badge/MMKV-2.0+-yellow.svg)

## ✨ Features

### 🐦 Murmur Module
- **Post Murmurs**: Users can post unlimited short messages.
- **Delete Own Murmurs**: Only the user who posted can delete a murmur.
- **Like Murmurs**: Users can like other users’ murmurs.
- **Timeline**: Shows murmurs from followed users with pagination (10 per page).
- **Murmur Details**: View individual murmur information including like counts.

### 👥 User Module
- **Authentication**: Sign-up, login, and secure session management using Supabase Auth.
- **Own Profile**: View user info, followers/following count, and own murmurs.
- **Other Profiles**: View other users’ info and their posted murmurs.
- **Follow Users**: Follow/unfollow other users to populate the timeline.

### 🎨 UI/UX Highlights
- **Responsive Layouts**: Optimized for different screen sizes.
- **Intuitive Navigation**: Clear navigation using React Navigation.
- **Smooth Interactions**: Optimized transitions between screens.
- **Lightweight Design**: Focused on functionality and usability.

## 🛠️ Tech Stack

- **Framework**: React Native CLI
- **Language**: TypeScript
- **State Management**: Redux Toolkit + Redux Persist
- **Backend**: Supabase (Authentication, Database, Realtime)
- **Storage**: MMKV for caching and offline support
- **Navigation**: React Navigation v6
- **UI Components**: React Native Modal, Pressable, FlatList
- **Styling**: Native components and custom styling

## 📋 Prerequisites

- Node.js (v16 or higher)  
- npm or yarn  
- React Native CLI  
- Android Studio (for Android development)  
- Xcode (for iOS development, macOS only)  
- JDK 11 or higher  

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Nazim-hasan/MurmurApp.git
cd MurmurApp
git checkout develop

2. Install Dependencies
yarn

3. Install iOS Pods (iOS only)
cd ios && pod install && cd ..

PUBLIC_SUPABASE_KEY=<your-supabase-anon-key>

📦 Project Structure
MurmurApp/
├── src/
│   ├── api/               # Supabase API functions
│   │   └── murmurApi.ts
│   ├── components/        # Reusable components
│   │   ├── MurmurCard.tsx
│   │   ├── UserCard.tsx
│   ├── navigation/        # React Navigation setup
│   │   └── index.tsx
│   ├── redux/             # Redux store, slices, and hooks
│   │   ├── store.ts
│   │   └── slices/
│   │       ├── murmurSlice.ts
│   │       └── userSlice.ts
│   ├── screens/           # App screens
│   │   ├── TimelineScreen.tsx
│   │   ├── MurmurDetailScreen.tsx
│   │   ├── UserProfileScreen.tsx
│   │   ├── AuthScreen.tsx
│   ├── storage/           # MMKV storage setup
│   └── types/             # TypeScript types
├── App.tsx                # Root component
├── babel.config.js
├── tsconfig.json
└── package.json

🏃‍♂️ Running the Application
Start Metro Bundler
yarn start --reset-cache

Run on Android
yarn android

Run on iOS
yarn ios

📱 App Screens
1. Timeline

List of murmurs from followed users

LIKE button for each murmur

Pagination (10 per page)

Pull-to-refresh to reload

2. Murmur Detail

Detailed view of murmur text, likes, and author

Option to like the murmur

3. User Profile

Own profile: user info, followers/following count, own murmurs, delete button

Other user profile: user info, followers/following count, their murmurs

Follow/unfollow button

4. Authentication

Sign-up and login screens

Secure token storage with MMKV and Supabase Auth

🗄️ State Management

Redux Toolkit for global state

Slices:

userSlice → current user, session info, followers/following

murmurSlice → timeline murmurs, own murmurs, likes

Redux Persist + MMKV → fast state persistence and offline support

🔌 Offline Support

Cached murmurs using MMKV

Timeline and user data accessible offline

Pull-to-refresh updates cache

Offline indicators in UI

📦 Dependencies
Core Dependencies
{
  "@supabase/supabase-js": "^2.x",
  "@reduxjs/toolkit": "^2.x",
  "react-redux": "^9.x",
  "redux-persist": "^6.x",
  "react-native-mmkv": "^2.x",
  "react-navigation": "^6.x",
  "react-native-modal": "^13.x"
}

Dev Dependencies
{
  "typescript": "^5.x",
  "@types/react": "^18.x",
  "@types/react-native": "^0.72.x"
}

🚧 Troubleshooting

Clear Metro cache:

yarn start --reset-cache


Android build clean:

cd android && ./gradlew clean && cd ..
yarn android


iOS pods clean & install:

cd ios && pod deintegrate && pod install && cd ..
yarn ios

📄 License

MIT License - see LICENSE

👨‍💻 Author

Nazim Hasan

GitHub: @nazim-hasan

Email: connect.nazimhasan@gmail.com

LinkedIn: Nazim Hasan

Made with ❤️ using React Native, Supabase, and Redux Toolkit