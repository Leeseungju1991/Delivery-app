export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
};

export type MissionStackParamList = {
  MissionsHome: undefined;
  MissionDetail: { templateId: number };
  MissionSetup: { templateId: number };
  MissionCheckIn: { activeMissionId: string };
};

export type TabParamList = {
  Missions: undefined;
  Info: undefined;
  MyPage: undefined;
};
