export type MissionTemplate = {
  id: number;
  title: string;
  description: string;
  customPrompt?: string;
  customOptions?: string[];
  tags: string[];
  photoRequired: boolean;
  validWindow: string; // e.g. "3시간"
  recommendSchedule?: string; // free text
};

export type ActiveMission = {
  id: string; // uuid-like
  templateId: number;
  title: string;
  createdAt: string; // ISO
  reminderTime?: string; // "20:00"
  customValue?: string;
  isActive: boolean;
};

export type MissionCheckIn = {
  id: string;
  activeMissionId: string;
  createdAt: string; // ISO
  note?: string;
  tag?: string;
  photoUri?: string;
  status: 'success' | 'fail';
};

export type Category = {
  id: number;
  name: string;
  subs: string[];
};

export type User = {
  id: string;
  nickname: string;
  email?: string;
};
