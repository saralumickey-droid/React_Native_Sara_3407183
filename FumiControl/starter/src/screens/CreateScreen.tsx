
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import FormField from '../components/FormField';
import { servicioSchema, type ServicioFormData } from '../schemas/servicioSchema';
import { useCrearServicio } from '../hooks/useServicios';
import type { HomeStackParamList } from '../navigation/types';
import { COLORS } from '../theme';

type Props = NativeStackScreenProps<HomeStackParamList, 'Create'>;

export default function CreateScreen({ navigation }: Props): React.JSX.Element {
  const crearServicio = useCrearServicio();
  const [enviando, setEnviando] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ServicioFormData>({
    resolver: zodResolver(servicioSchema),
    defaultValues: {
      name: '',
      category: '',
      description: '',
      duration: '',
      coverage: '',
      price: undefined,
    },
  });

  const registrarServicio = async (data: ServicioFormData) => {
    try {
      setEnviando(true);

      await crearServicio.mutateAsync({
        ...data,
        imageUrl:
          'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900',
      });

      Alert.alert(
        'Servicio registrado',
        'El servicio se agregó correctamente.'
      );

      navigation.goBack();
    } catch {
      Alert.alert(
        'Error',
        'No fue posible registrar el servicio. Inténtalo nuevamente.'
      );
    } finally {
      setEnviando(false);
    }
  };

  const cargando = isSubmitting || enviando || crearServicio.isPending;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <Text style={styles.title}>Nuevo servicio</Text>
        <Text style={styles.subtitle}>
          Completa la información del servicio de fumigación.
        </Text>
      </View>

      <FormField
        control={control}
        name="name"
        label="Nombre del servicio"
        placeholder="Ej. Fumigación residencial"
      />

      <FormField
        control={control}
        name="category"
        label="Categoría"
        placeholder="Ej. Control de plagas"
      />

      <FormField
        control={control}
        name="description"
        label="Descripción"
        placeholder="Describe en qué consiste el servicio"
        multiline
      />

      <FormField
        control={control}
        name="duration"
        label="Duración"
        placeholder="Ej. 2 horas"
      />

      <FormField
        control={control}
        name="coverage"
        label="Cobertura"
        placeholder="Ej. Hasta 100 m²"
      />

      <FormField
        control={control}
        name="price"
        label="Precio"
        placeholder="Ej. 85000"
        keyboardType="decimal-pad"
      />

      <Pressable
        style={[styles.button, cargando && styles.buttonDisabled]}
        onPress={() => handleSubmit(registrarServicio)()}
        disabled={cargando}
      >
        {cargando ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Registrar servicio</Text>
        )}
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 20,
    paddingBottom: 35,
  },
  header: {
    marginBottom: 22,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 7,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 21,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    minHeight: 50,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
