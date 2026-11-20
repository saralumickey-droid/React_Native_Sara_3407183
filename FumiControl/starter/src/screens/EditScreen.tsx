import { useEffect } from 'react';

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
import {
  servicioSchema,
  type ServicioFormData,
} from '../schemas/servicioSchema';

import {
  useServicioDetalle,
  useActualizarServicio,
} from '../hooks/useServicios';

import type { HomeStackParamList } from '../navigation/types';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme';

type Props = NativeStackScreenProps<HomeStackParamList, 'Edit'>;

export default function EditScreen({
  route,
  navigation,
}: Props): React.JSX.Element {
  const { serviceId } = route.params;

  const {
    data: servicio,
    isLoading,
    isError,
    refetch,
  } = useServicioDetalle(serviceId);

  const actualizarServicio = useActualizarServicio();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ServicioFormData>({
    resolver: zodResolver(servicioSchema),
    defaultValues: {
      name: '',
      category: '',
      description: '',
      duration: '',
      coverage: '',
      price: 0,
    },
  });

  useEffect(() => {
    if (servicio) {
      reset({
        name: servicio.name,
        category: servicio.category,
        description: servicio.description,
        duration: servicio.duration,
        coverage: servicio.coverage,
        price: servicio.price,
      });
    }
  }, [servicio, reset]);

  const guardarCambios = async (data: ServicioFormData) => {
    try {
      await actualizarServicio.mutateAsync({
        id: serviceId,
        servicio: {
          ...data,
          imageUrl: servicio?.imageUrl,
        },
      });

      Alert.alert(
        'Servicio actualizado',
        'Los cambios se guardaron correctamente.'
      );

      navigation.goBack();
    } catch {
      Alert.alert(
        'Error',
        'No fue posible actualizar el servicio. Inténtalo nuevamente.'
      );
    }
  };

  const cargando =
    isSubmitting || actualizarServicio.isPending;

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.message}>Cargando servicio...</Text>
      </View>
    );
  }

  if (isError || !servicio) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>
          No fue posible cargar la información del servicio.
        </Text>

        <Pressable
          style={styles.button}
          onPress={() => refetch()}
        >
          <Text style={styles.buttonText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <Text style={styles.title}>Editar servicio</Text>
        <Text style={styles.subtitle}>
          Modifica la información del servicio seleccionado.
        </Text>
      </View>

      <FormField
        control={control}
        name="name"
        label="Nombre del servicio"
        placeholder="Nombre del servicio"
      />

      <FormField
        control={control}
        name="category"
        label="Categoría"
        placeholder="Categoría del servicio"
      />

      <FormField
        control={control}
        name="description"
        label="Descripción"
        placeholder="Describe el servicio"
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
        placeholder="Precio en pesos colombianos"
        keyboardType="decimal-pad"
      />

      <Pressable
        style={[styles.button, cargando && styles.disabledButton]}
        onPress={() => handleSubmit(guardarCambios)()}
        disabled={cargando}
      >
        {cargando ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Guardar cambios</Text>
        )}
      </Pressable>

      <Pressable
        style={[styles.button, styles.cancelButton]}
        onPress={() => navigation.goBack()}
        disabled={cargando}
      >
        <Text style={styles.buttonText}>Cancelar</Text>
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
    padding: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  header: {
    marginBottom: SPACING.lg,
  },
  title: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.title,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.body,
    lineHeight: 22,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
  },
  message: {
    color: COLORS.textSecondary,
    marginTop: SPACING.md,
    fontSize: TYPOGRAPHY.body,
  },
  error: {
    color: COLORS.danger,
    fontSize: TYPOGRAPHY.body,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
    marginTop: SPACING.md,
  },
  cancelButton: {
    backgroundColor: COLORS.textSecondary,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: TYPOGRAPHY.body,
  },
});
