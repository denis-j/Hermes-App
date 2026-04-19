import { FirebaseError } from 'firebase/app';
import {
  User,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
} from 'firebase/auth';

import {
  AuthError,
  AuthUser,
  AuthErrorCode,
  SignInCredentials,
  SignUpCredentials,
} from './types';

function mapFirebaseError(error: FirebaseError): AuthErrorCode {
  switch (error.code) {
    case 'auth/invalid-email':
      return AuthError.INVALID_EMAIL;
    case 'auth/user-not-found':
      return AuthError.USER_NOT_FOUND;
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return AuthError.INVALID_CREDENTIAL;
    case 'auth/email-already-in-use':
      return AuthError.EMAIL_ALREADY_IN_USE;
    case 'auth/weak-password':
    case 'auth/weak-password.password-weak':
      return AuthError.WEAK_PASSWORD;
    case 'auth/network-request-failed':
      return AuthError.NETWORK_ERROR;
    case 'auth/too-many-requests':
      return AuthError.TOO_MANY_REQUESTS;
    case 'auth/user-disabled':
      return AuthError.USER_DISABLED;
    default:
      return AuthError.UNKNOWN;
  }
}

function toAuthUser(user: User | null): AuthUser | null {
  if (!user) return null;
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
  };
}

export async function signIn(credentials: SignInCredentials): Promise<AuthUser> {
  const auth = getAuth();
  try {
    const result = await signInWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    );
    return toAuthUser(result.user)!;
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw mapFirebaseError(error);
    }
    throw AuthError.UNKNOWN;
  }
}

export async function signUp(credentials: SignUpCredentials): Promise<AuthUser> {
  const auth = getAuth();
  try {
    const result = await createUserWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    );
    return toAuthUser(result.user)!;
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw mapFirebaseError(error);
    }
    throw AuthError.UNKNOWN;
  }
}

export async function signOut(): Promise<void> {
  const auth = getAuth();
  await firebaseSignOut(auth);
}

export async function sendPasswordReset(email: string): Promise<void> {
  const auth = getAuth();
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw mapFirebaseError(error);
    }
    throw AuthError.UNKNOWN;
  }
}
