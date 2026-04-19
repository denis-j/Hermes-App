import { firebaseEnv } from '@/lib/env';

export const firebaseConfig = {
  apiKey: firebaseEnv.apiKey,
  appId: firebaseEnv.appId,
  authDomain: firebaseEnv.authDomain,
  measurementId: firebaseEnv.measurementId,
  messagingSenderId: firebaseEnv.messagingSenderId,
  projectId: firebaseEnv.projectId,
  storageBucket: firebaseEnv.storageBucket,
};
