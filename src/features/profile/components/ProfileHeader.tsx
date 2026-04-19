import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

interface ProfileHeaderProps {
  displayName: string;
  email: string | null;
  onEditProfile: () => void;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function ProfileHeader({ displayName, email, onEditProfile }: ProfileHeaderProps) {
  const initials = getInitials(displayName);

  return (
    <View className="items-center gap-4 py-6">
      {/* Avatar */}
      <View className="bg-primary/20 h-24 w-24 items-center justify-center rounded-full">
        <Text className="text-3xl font-bold text-primary">{initials}</Text>
      </View>

      {/* Name & Email */}
      <View className="items-center gap-1">
        <Text variant="h3" className="text-card-foreground">
          {displayName}
        </Text>
        {email && (
          <Text className="text-sm text-muted-foreground">{email}</Text>
        )}
      </View>

      {/* Edit Button */}
      <Button variant="outline" size="sm" onPress={onEditProfile}>
        <Text>Profil bearbeiten</Text>
      </Button>
    </View>
  );
}
