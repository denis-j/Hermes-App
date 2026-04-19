import { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { RootStackParamList } from '@/navigation/RootNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface FormData {
  name: string;
  description: string;
  goalType: 'steps' | 'distance';
  goalValue: string;
  durationDays: string;
  maxParticipants: string;
}

interface FormErrors {
  name?: string;
  description?: string;
  goalValue?: string;
  durationDays?: string;
  maxParticipants?: string;
}

const GOAL_TYPE_OPTIONS: { key: 'steps' | 'distance'; label: string }[] = [
  { key: 'steps', label: 'Schritte' },
  { key: 'distance', label: 'Entfernung (km)' },
];

export function CreateChallengeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    goalType: 'steps',
    goalValue: '',
    durationDays: '',
    maxParticipants: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name ist erforderlich';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Name muss mindestens 3 Zeichen haben';
    } else if (formData.name.length > 50) {
      newErrors.name = 'Name darf maximal 50 Zeichen haben';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Beschreibung ist erforderlich';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Beschreibung muss mindestens 10 Zeichen haben';
    }

    const goalNum = parseInt(formData.goalValue, 10);
    if (!formData.goalValue) {
      newErrors.goalValue = 'Ziel ist erforderlich';
    } else if (isNaN(goalNum) || goalNum <= 0) {
      newErrors.goalValue = 'Ziel muss eine positive Zahl sein';
    } else if (formData.goalType === 'steps' && (goalNum < 1000 || goalNum > 1000000)) {
      newErrors.goalValue = 'Schritte müssen zwischen 1.000 und 1.000.000 liegen';
    } else if (formData.goalType === 'distance' && (goalNum < 1 || goalNum > 500)) {
      newErrors.goalValue = 'Entfernung muss zwischen 1 und 500 km liegen';
    }

    const durationNum = parseInt(formData.durationDays, 10);
    if (!formData.durationDays) {
      newErrors.durationDays = 'Dauer ist erforderlich';
    } else if (isNaN(durationNum) || durationNum < 1) {
      newErrors.durationDays = 'Dauer muss mindestens 1 Tag sein';
    } else if (durationNum > 90) {
      newErrors.durationDays = 'Dauer darf maximal 90 Tage sein';
    }

    const maxNum = parseInt(formData.maxParticipants, 10);
    if (!formData.maxParticipants) {
      newErrors.maxParticipants = 'Maximale Teilnehmer sind erforderlich';
    } else if (isNaN(maxNum) || maxNum < 2) {
      newErrors.maxParticipants = 'Mindestens 2 Teilnehmer erforderlich';
    } else if (maxNum > 500) {
      newErrors.maxParticipants = 'Maximal 500 Teilnehmer erlaubt';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In production, this would create the challenge in Firestore
    console.log('Creating challenge:', {
      ...formData,
      goalValue: parseInt(formData.goalValue, 10),
      durationDays: parseInt(formData.durationDays, 10),
      maxParticipants: parseInt(formData.maxParticipants, 10),
    });

    setIsSubmitting(false);
    navigation.goBack();
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="gap-6 px-6 py-4"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View className="gap-2">
            <Text variant="h2" className="text-foreground">
              Herausforderung erstellen
            </Text>
            <Text className="text-muted-foreground">
              Erstelle eine neue Herausforderung für dich und deine Freunde
            </Text>
          </View>

          {/* Form Card */}
          <Card className="gap-5 p-5">
            {/* Name */}
            <View className="gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="z.B. April Running Challenge"
                value={formData.name}
                onChangeText={(v) => updateField('name', v)}
                autoCapitalize="words"
              />
              {errors.name && (
                <Text className="text-sm text-destructive">{errors.name}</Text>
              )}
            </View>

            {/* Description */}
            <View className="gap-2">
              <Label htmlFor="description">Beschreibung</Label>
              <Input
                id="description"
                placeholder="Beschreibe deine Herausforderung..."
                value={formData.description}
                onChangeText={(v) => updateField('description', v)}
                multiline
                numberOfLines={3}
                className="min-h-20 text-left"
              />
              {errors.description && (
                <Text className="text-sm text-destructive">{errors.description}</Text>
              )}
            </View>

            {/* Goal Type */}
            <View className="gap-2">
              <Label>Zieltyp</Label>
              <View className="flex-row gap-3">
                {GOAL_TYPE_OPTIONS.map((option) => (
                  <View key={option.key} className="flex-1">
                    <Button
                      variant={formData.goalType === option.key ? 'default' : 'outline'}
                      onPress={() => setFormData(prev => ({ ...prev, goalType: option.key }))}
                      className="w-full"
                    >
                      <Text>{option.label}</Text>
                    </Button>
                  </View>
                ))}
              </View>
            </View>

            {/* Goal Value */}
            <View className="gap-2">
              <Label htmlFor="goalValue">
                Ziel ({formData.goalType === 'steps' ? 'Schritte' : 'Kilometer'})
              </Label>
              <Input
                id="goalValue"
                placeholder={formData.goalType === 'steps' ? '100000' : '50'}
                value={formData.goalValue}
                onChangeText={(v) => updateField('goalValue', v.replace(/[^0-9]/g, ''))}
                keyboardType="number-pad"
              />
              {errors.goalValue && (
                <Text className="text-sm text-destructive">{errors.goalValue}</Text>
              )}
            </View>

            {/* Duration */}
            <View className="gap-2">
              <Label htmlFor="durationDays">Dauer (Tage)</Label>
              <Input
                id="durationDays"
                placeholder="30"
                value={formData.durationDays}
                onChangeText={(v) => updateField('durationDays', v.replace(/[^0-9]/g, ''))}
                keyboardType="number-pad"
              />
              {errors.durationDays && (
                <Text className="text-sm text-destructive">{errors.durationDays}</Text>
              )}
            </View>

            {/* Max Participants */}
            <View className="gap-2">
              <Label htmlFor="maxParticipants">Maximale Teilnehmer</Label>
              <Input
                id="maxParticipants"
                placeholder="50"
                value={formData.maxParticipants}
                onChangeText={(v) => updateField('maxParticipants', v.replace(/[^0-9]/g, ''))}
                keyboardType="number-pad"
              />
              {errors.maxParticipants && (
                <Text className="text-sm text-destructive">{errors.maxParticipants}</Text>
              )}
            </View>
          </Card>

          {/* Submit Button */}
          <View className="gap-3 pb-6">
            <Button
              className="w-full"
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text className="font-semibold">
                {isSubmitting ? 'Wird erstellt...' : 'Herausforderung erstellen'}
              </Text>
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onPress={() => navigation.goBack()}
              disabled={isSubmitting}
            >
              <Text>Abbrechen</Text>
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
