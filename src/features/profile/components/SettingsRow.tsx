import { Pressable, View } from 'react-native';
import { Text } from '@/components/ui/text';

interface SettingsRowProps {
  label: string;
  value?: string;
  isToggle?: boolean;
  isActive?: boolean;
  onPress?: () => void;
  showChevron?: boolean;
}

export function SettingsRow({
  label,
  value,
  isToggle = false,
  isActive = false,
  onPress,
  showChevron = true,
}: SettingsRowProps) {
  return (
    <Pressable
      onPress={isToggle ? undefined : onPress}
      className="flex-row items-center justify-between py-4 border-b border-border last:border-b-0"
    >
      <Text className="text-foreground">{label}</Text>
      <View className="flex-row items-center gap-2">
        {isToggle ? (
          <View
            className={`h-6 w-11 items-center justify-center rounded-full px-0.5 ${
              isActive ? 'bg-primary' : 'bg-muted'
            }`}
          >
            <View
              className={`h-5 w-5 rounded-full bg-white shadow-sm ${
                isActive ? 'translate-x-2.5' : '-translate-x-2.5'
              }`}
            />
          </View>
        ) : (
          <>
            {value && (
              <Text className="text-sm text-muted-foreground">{value}</Text>
            )}
            {showChevron && (
              <Text className="text-muted-foreground">›</Text>
            )}
          </>
        )}
      </View>
    </Pressable>
  );
}
