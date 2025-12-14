import { MMKV } from 'react-native-mmkv';

const storage = new MMKV({
  id: 'supabase-auth',
});

export const supabaseStorage = {
  getItem: (key) => {
    const value = storage.getString(key);
    return value ?? null;
  },
  setItem: (key, value) => {
    storage.set(key, value);
  },
  removeItem: (key) => {
    storage.delete(key);
  },
};
