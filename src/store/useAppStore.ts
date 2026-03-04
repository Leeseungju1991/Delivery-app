import { create } from 'zustand';
import { ActiveMission, MissionCheckIn, User } from '@/types';
import { createId } from '@/utils/id';
import { MISSION_TEMPLATES } from '@/data/missions';

type AppState = {
  user: User | null;
  login: (nickname: string) => void;
  logout: () => void;

  activeMissions: ActiveMission[];
  checkIns: MissionCheckIn[];

  startMission: (templateId: number, opts?: { reminderTime?: string; customValue?: string }) => ActiveMission;
  stopMission: (activeMissionId: string) => void;

  addCheckIn: (activeMissionId: string, payload: Omit<MissionCheckIn, 'id' | 'activeMissionId' | 'createdAt'>) => MissionCheckIn;
};

export const useAppStore = create<AppState>((set, get) => ({
  user: null,
  login: (nickname) =>
    set({
      user: {
        id: createId('user'),
        nickname: nickname.trim() || '사용자',
      },
    }),
  logout: () => set({ user: null, activeMissions: [], checkIns: [] }),

  activeMissions: [],
  checkIns: [],

  startMission: (templateId, opts) => {
    const t = MISSION_TEMPLATES.find((m) => m.id === templateId);
    if (!t) throw new Error('Mission template not found');

    const mission: ActiveMission = {
      id: createId('mission'),
      templateId,
      title: t.title,
      createdAt: new Date().toISOString(),
      reminderTime: opts?.reminderTime,
      customValue: opts?.customValue,
      isActive: true,
    };

    set({ activeMissions: [mission, ...get().activeMissions] });
    return mission;
  },

  stopMission: (activeMissionId) =>
    set({
      activeMissions: get().activeMissions.map((m) =>
        m.id === activeMissionId ? { ...m, isActive: false } : m,
      ),
    }),

  addCheckIn: (activeMissionId, payload) => {
    const checkIn: MissionCheckIn = {
      id: createId('checkin'),
      activeMissionId,
      createdAt: new Date().toISOString(),
      ...payload,
    };
    set({ checkIns: [checkIn, ...get().checkIns] });
    return checkIn;
  },
}));
