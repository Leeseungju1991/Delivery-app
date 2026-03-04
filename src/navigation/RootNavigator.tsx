import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppStore } from '@/store/useAppStore';
import { AuthStackParamList } from '@/navigation/types';
import { WelcomeScreen } from '@/screens/auth/WelcomeScreen';
import { LoginScreen } from '@/screens/auth/LoginScreen';
import { AppTabs } from '@/navigation/Tabs';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function RootNavigator() {
  const user = useAppStore((s) => s.user);

  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: '로그인' }} />
      </Stack.Navigator>
    );
  }

  return <AppTabs />;
}
