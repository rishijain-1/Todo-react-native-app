// services/storage.ts

import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'bfgfghvxcert';

// Save token to AsyncStorage
export const saveToken = async (token: string) => {
    try {
        await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
        console.error('Failed to save token:', error);
    }
};

// Retrieve token from AsyncStorage
export const getToken = async (): Promise<string | null> => {
    try {
        return await AsyncStorage.getItem(TOKEN_KEY);
    } catch (error) {
        console.error('Failed to retrieve token:', error);
        return null;
    }
};

// Remove token from AsyncStorage
export const removeToken = async () => {
    try {
        await AsyncStorage.removeItem(TOKEN_KEY);
    } catch (error) {
        console.error('Failed to remove token:', error);
    }
};
