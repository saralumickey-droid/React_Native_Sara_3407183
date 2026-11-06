import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { HomeStackParamList } from '../navigation/types';
import { fumigationServices } from '../data/mockData';
import { useSavedStore } from '../stores/savedStore';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme';

type Props = NativeStackScreenProps<HomeStackParamList, 'Detail'>;

export default function DetailScreen({ route }: Props): React.JSX.Element {
  const { serviceId } = route.params;

  const service = fumigationServices.find(
    (item) => item.id === serviceId
  );

  const isSaved = useSavedStore((state) =>
    state.savedServices.some((item) => item.id === serviceId)
  );

  const addService = useSavedStore((state) => state.addService);
  const removeService = useSavedStore((state) => state.removeService);

  const [message, setMessage] = useState('');

  if (!service) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Servicio no encontrado</Text>
      </View>
    );
  }

  const handleSave = (): void => {
    if (isSaved) {
      removeService(service.id);
      setMessage('El servicio se eliminó de tus guardados.');
    } else {
      addService(service);
      setMessage('El servicio se agregó a tus guardados.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.category}>{service.category}</Text>

      <Text style={styles.title}>{service.name}</Text>

      <Text style={styles.description}>{service.description}</Text>

      <View style={styles.infoCard}>
        <Text style={styles.label}>Duración estimada</Text>
        <Text style={styles.value}>{service.duration}</Text>

        <View style={styles.divider} />

        <Text style={styles.label}>Cobertura</Text>
        <Text style={styles.value}>{service.coverage}</Text>

        <View style={styles.divider} />

        <Text style={styles.label}>Precio estimado</Text>
        <Text style={styles.price}>
          ${service.price.toLocaleString('es-CO')}
        </Text>
      </View>

      <Pressable
        style={[
          styles.button,
          isSaved && styles.removeButton,
        ]}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>
          {isSaved ? 'Eliminar de guardados' : 'Guardar servicio'}
        </Text>
      </Pressable>

      {message !== '' && (
        <Text style={styles.message}>{message}</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
  },
  category: {
    color: COLORS.secondary,
    fontSize: TYPOGRAPHY.body,
    fontWeight: 'bold',
    marginBottom: SPACING.sm,
  },
  title: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.title,
    fontWeight: 'bold',
    marginBottom: SPACING.md,
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.body,
    lineHeight: 24,
  },
  infoCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: 14,
    marginTop: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.caption,
    marginBottom: SPACING.xs,
  },
  value: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.body,
    fontWeight: '600',
  },
  price: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.subtitle,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  removeButton: {
    backgroundColor: COLORS.danger,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: TYPOGRAPHY.body,
  },
  message: {
    color: COLORS.secondary,
    textAlign: 'center',
    marginTop: SPACING.md,
    fontSize: TYPOGRAPHY.body,
  },
});