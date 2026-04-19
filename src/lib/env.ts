type FirebaseEnv = {
  apiKey: string;
  appId: string;
  authDomain: string;
  measurementId: string;
  messagingSenderId: string;
  projectId: string;
  storageBucket: string;
};

function readEnv(name: string) {
  return process.env[name]?.trim() ?? '';
}

export const firebaseEnv: FirebaseEnv = {
  apiKey: readEnv('EXPO_PUBLIC_FIREBASE_API_KEY'),
  appId: readEnv('EXPO_PUBLIC_FIREBASE_APP_ID'),
  authDomain: readEnv('EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN'),
  measurementId: readEnv('EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID'),
  messagingSenderId: readEnv('EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'),
  projectId: readEnv('EXPO_PUBLIC_FIREBASE_PROJECT_ID'),
  storageBucket: readEnv('EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET'),
};

export const hasFirebaseEnv = Object.values(firebaseEnv).every(Boolean);
