export enum AuthError {
  INVALID_EMAIL = 'auth/invalid-email',
  USER_NOT_FOUND = 'auth/user-not-found',
  WRONG_PASSWORD = 'auth/wrong-password',
  EMAIL_ALREADY_IN_USE = 'auth/email-already-in-use',
  WEAK_PASSWORD = 'auth/weak-password',
  INVALID_CREDENTIAL = 'auth/invalid-credential',
  NETWORK_ERROR = 'auth/network-error',
  TOO_MANY_REQUESTS = 'auth/too-many-requests',
  USER_DISABLED = 'auth/user-disabled',
  UNKNOWN = 'auth/unknown',
}

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  email: string;
  password: string;
}

export type AuthErrorCode = AuthError | string;
