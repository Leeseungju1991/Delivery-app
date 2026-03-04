import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MissionStackParamList } from '@/navigation/types';
import { MissionsHomeScreen } from '@/screens/missions/MissionsHomeScreen';
import { MissionDetailScreen } from '@/screens/missions/MissionDetailScreen';
import { MissionSetupScreen } from '@/screens/missions/MissionSetupScreen';
import { MissionCheckInScreen } from '@/screens/missions/MissionCheckInScreen';

const Stack = createNativeStackNavigator<MissionStackParamList>();

export function MissionStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MissionsHome" component={MissionsHomeScreen} options={{ title: '미션' }} />
      <Stack.Screen name="MissionDetail" component={MissionDetailScreen} options={{ title: '미션 상세' }} />
      <Stack.Screen name="MissionSetup" component={MissionSetupScreen} options={{ title: '미션 설정' }} />
      <Stack.Screen name="MissionCheckIn" component={MissionCheckInScreen} options={{ title: '미션 인증' }} />
    </Stack.Navigator>
  );
}
