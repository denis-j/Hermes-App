import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { hasFirebaseEnv } from '@/lib/env';

import { firebaseConfig } from './config';

export const firebaseProjectSummary = hasFirebaseEnv
  ? `Connected to Firebase project ${firebaseConfig.projectId}.`
  : 'Firebase is configured as a service shell only.';

export function getFirebaseApp() {
  if (!hasFirebaseEnv) {
    return null;
  }
  return getApps()[0] ?? initializeApp(firebaseConfig);
}

export function requireFirebaseApp() {
  return getApps()[0] ?? getApp();
}

// Auth singleton — null when Firebase env vars are missing
let _auth: ReturnType<typeof getAuth> | null = null;
if (hasFirebaseEnv) {
  const app = getApps()[0] ?? initializeApp(firebaseConfig);
  _auth = getAuth(app);
}
export const auth = _auth;
