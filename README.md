# Murmur Mobile App (React Native)

A mobile application for posting and viewing "murmurs" (similar to tweets) built with **React Native**. This project was implemented as part of a coding test for a React Native engineer role.  

## Features

- **Timeline**
  - Displays murmurs from followed users
  - LIKE functionality for each murmur
  - Pagination: 10 murmurs per page
- **Murmur Management**
  - Create, delete, and like murmurs
  - Only the user who posted a murmur can delete it
- **User Profiles**
  - Own user profile: view name, follow count, followers count, and own murmurs
  - Other users' profiles: view their information and murmurs
- **Authentication**
  - Sign-up, login, logout
  - Secure user session management
- **State Management**
  - Implemented using **Redux** for global state
- **Backend (BaaS)**
  - Built using **Supabase** (PostgreSQL, Authentication, Realtime DB)
- **UI & UX**
  - Native components for better performance
  - Minor UI refinements for consistency

## Tech Stack

- **React Native**: Mobile app framework
- **Supabase**: Backend-as-a-Service (Authentication, Database, Realtime)
- **Redux**: State management
- **Axios / Fetch**: API requests
- **React Navigation**: Navigation between screens

## Folder Structure
/src
/api # API functions
/components
/screens
/redux # Redux store, slices, actions
/navigation
/utils
/App.js



## Getting Started

### Prerequisites

- Node.js >= 18.x
- Expo CLI or React Native CLI
- Supabase project (configured with `supabaseUrl` and `supabaseKey`)

### Installation

```bash
git clone <repository-url>
cd murmur-mobile-app
npm install



Running the App
# Start Metro bundler
npx expo start
Run on iOS simulator, Android emulator, or physical device using Expo Go.

Environment Variables

Create a .env file at the root with:


SUPABASE_URL=<your-supabase-url>
SUPABASE_KEY=<your-supabase-anon-key>


Redux Store

userSlice: stores current user information and authentication state

murmurSlice: stores timeline murmurs and pagination info

likeSlice: stores liked murmurs per user

Future Improvements

Enhance UI/UX with custom components

Implement offline support for murmur caching

Add push notifications for new murmurs