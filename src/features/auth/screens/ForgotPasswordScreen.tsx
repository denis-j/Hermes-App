import { useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { AuthError } from '@/services/auth/types';

type ForgotPasswordScreenProps = {
  navigation: {
    navigate: (screen: string) => void;
  };
};

export function ForgotPasswordScreen({ navigation }: ForgotPasswordScreenProps) {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit() {
    setError(null);
    if (!email.trim()) {
      setError('Email is required.');
      return;
    }
    setLoading(true);
    try {
      await resetPassword(email.trim());
      setSent(true);
    } catch (err) {
      setError(errorMessage(err as AuthError));
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 justify-center px-6">
          <Card className="gap-6 p-6">
            <View>
              <Text variant="h2" className="text-card-foreground">
                Check your email
              </Text>
              <Text className="mt-2 text-muted-foreground">
                We sent a password reset link to{' '}
                <Text className="font-medium text-foreground">{email}</Text>
              </Text>
            </View>
            <Button onPress={() => navigation.navigate('Login')}>
              <Text>Back to sign in</Text>
            </Button>
          </Card>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View className="flex-1 justify-center px-6">
          <Card className="gap-6 p-6">
            <View>
              <Text variant="h2" className="text-card-foreground">
                Reset password
              </Text>
              <Text className="mt-1 text-muted-foreground">
                Enter your email and we'll send you a reset link.
              </Text>
            </View>

            <View className="gap-4">
              <View>
                <Text className="mb-2 text-sm font-medium text-foreground">
                  Email
                </Text>
                <Input
                  placeholder="you@example.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {error && (
                <Text className="text-sm text-destructive">{error}</Text>
              )}
            </View>

            <Button onPress={handleSubmit} disabled={loading}>
              <Text>{loading ? 'Sending...' : 'Send reset link'}</Text>
            </Button>
          </Card>

          <View className="mt-6 flex-row justify-center">
            <Button variant="link" onPress={() => navigation.navigate('Login')}>
              <Text className="text-sm text-muted-foreground">
                Back to sign in
              </Text>
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function errorMessage(code: AuthError): string {
  switch (code) {
    case AuthError.INVALID_EMAIL:
      return 'Please enter a valid email address.';
    case AuthError.USER_NOT_FOUND:
      return 'No account found with this email.';
    case AuthError.NETWORK_ERROR:
      return 'Network error. Check your connection.';
    default:
      return 'Failed to send reset email. Please try again.';
  }
}
