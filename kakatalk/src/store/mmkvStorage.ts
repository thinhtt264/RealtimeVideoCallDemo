import { MMKV } from 'react-native-mmkv';
import { Storage } from 'redux-persist';

// Create storage instances for different slices
export const storage = new MMKV({ id: 'global' });
// Add more storage instances as needed

// Create storage adapters for redux-persist
export const MMKVStorage: Storage = {
  setItem: (key: string, value: string) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key: string) => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key: string) => {
    storage.delete(key);
    return Promise.resolve();
  },
};
