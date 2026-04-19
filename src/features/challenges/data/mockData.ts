// Mock data for challenges - structure matches Firestore schema
export interface Participant {
  id: string;
  name: string;
  avatar?: string;
  steps: number;
  rank: number;
  joinedAt: Date;
}

export interface Challenge {
  id: string;
  name: string;
  description: string;
  goalType: 'steps' | 'distance';
  goalValue: number;
  durationDays: number;
  startDate: Date;
  endDate: Date;
  maxParticipants: number;
  participants: Participant[];
  createdBy: string;
  isJoined: boolean;
  isCompleted: boolean;
}

export interface UserChallengeProgress {
  challengeId: string;
  userId: string;
  currentSteps: number;
  currentDistance: number;
  joinedAt: Date;
  lastUpdated: Date;
}

// Mock current user for ranking purposes
export const MOCK_CURRENT_USER_ID = 'user-1';

export const MOCK_PARTICIPANTS: Participant[] = [
  { id: 'user-1', name: 'Du', steps: 45890, rank: 3, joinedAt: new Date('2026-04-01') },
  { id: 'user-2', name: 'Sarah M.', steps: 89500, rank: 1, joinedAt: new Date('2026-04-01') },
  { id: 'user-3', name: 'Mike T.', steps: 72340, rank: 2, joinedAt: new Date('2026-04-02') },
  { id: 'user-4', name: 'Emma L.', steps: 41200, rank: 4, joinedAt: new Date('2026-04-03') },
  { id: 'user-5', name: 'John D.', steps: 38500, rank: 5, joinedAt: new Date('2026-04-03') },
  { id: 'user-6', name: 'Lisa K.', steps: 31200, rank: 6, joinedAt: new Date('2026-04-04') },
  { id: 'user-7', name: 'Tom B.', steps: 28900, rank: 7, joinedAt: new Date('2026-04-05') },
  { id: 'user-8', name: 'Anna W.', steps: 24500, rank: 8, joinedAt: new Date('2026-04-06') },
];

export const MOCK_CHALLENGES: Challenge[] = [
  {
    id: 'challenge-1',
    name: 'April Run Challenge',
    description: 'Complete as many steps as possible this April!',
    goalType: 'steps',
    goalValue: 100000,
    durationDays: 30,
    startDate: new Date('2026-04-01'),
    endDate: new Date('2026-04-30'),
    maxParticipants: 100,
    participants: MOCK_PARTICIPANTS,
    createdBy: 'user-2',
    isJoined: true,
    isCompleted: false,
  },
  {
    id: 'challenge-2',
    name: 'Weekend Warriors',
    description: 'Who can walk the most on weekends?',
    goalType: 'steps',
    goalValue: 20000,
    durationDays: 7,
    startDate: new Date('2026-04-13'),
    endDate: new Date('2026-04-19'),
    maxParticipants: 50,
    participants: MOCK_PARTICIPANTS.slice(0, 5),
    createdBy: 'user-3',
    isJoined: true,
    isCompleted: false,
  },
  {
    id: 'challenge-3',
    name: 'Spring Sprint',
    description: 'Get ready for spring with this step challenge!',
    goalType: 'distance',
    goalValue: 50,
    durationDays: 21,
    startDate: new Date('2026-03-25'),
    endDate: new Date('2026-04-14'),
    maxParticipants: 75,
    participants: MOCK_PARTICIPANTS.slice(0, 6),
    createdBy: 'user-4',
    isJoined: false,
    isCompleted: true,
  },
  {
    id: 'challenge-4',
    name: 'Morning Miles',
    description: 'Start your day right with morning walks!',
    goalType: 'steps',
    goalValue: 30000,
    durationDays: 14,
    startDate: new Date('2026-04-20'),
    endDate: new Date('2026-05-04'),
    maxParticipants: 40,
    participants: MOCK_PARTICIPANTS.slice(0, 3),
    createdBy: 'user-1',
    isJoined: true,
    isCompleted: false,
  },
  {
    id: 'challenge-5',
    name: 'Step Marathon',
    description: 'Marathon-long step challenge for the dedicated!',
    goalType: 'steps',
    goalValue: 50000,
    durationDays: 7,
    startDate: new Date('2026-04-10'),
    endDate: new Date('2026-04-16'),
    maxParticipants: 30,
    participants: MOCK_PARTICIPANTS.slice(0, 4),
    createdBy: 'user-5',
    isJoined: false,
    isCompleted: true,
  },
];

// Helper to get user's rank in a challenge
export function getUserRank(challenge: Challenge, userId: string): number | null {
  const participant = challenge.participants.find(p => p.id === userId);
  return participant?.rank ?? null;
}

// Helper to get days remaining
export function getDaysRemaining(endDate: Date): number {
  const now = new Date();
  const diff = endDate.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}
