import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabParamList } from '@/navigation/types';
import { MissionStack } from '@/navigation/stacks/MissionStack';
import { InfoScreen } from '@/screens/info/InfoScreen';
import { MyPageScreen } from '@/screens/mypage/MyPageScreen';

const Tab = createBottomTabNavigator<TabParamList>();

export function AppTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Missions" component={MissionStack} options={{ title: '미션' }} />
      <Tab.Screen name="Info" component={InfoScreen} options={{ title: '정보' }} />
      <Tab.Screen name="MyPage" component={MyPageScreen} options={{ title: '마이' }} />
    </Tab.Navigator>
  );
}
