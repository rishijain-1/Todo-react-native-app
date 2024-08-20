import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppNavigator from '../navigation/AppNavigator'; // Adjust the path if needed
import { AuthProvider } from '../contexts/AuthContext'; // Adjust the path if needed

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        
          <AppNavigator />
       
      </AuthProvider>
    </QueryClientProvider>
  );
}
