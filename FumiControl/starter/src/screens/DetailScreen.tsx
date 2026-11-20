import { useEffect, useState } from 'react';

import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { HomeStackParamList } from '../navigation/types';
import {
  useServicioDetalle,
  useActualizarServicio,
} from '../hooks/useServicios';
import { useSavedStore } from '../stores/savedStore';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme';

type Props = NativeStackScreenProps<HomeStackParamList, 'Detail'>;

export default function DetailScreen({ route }: Props): React.JSX.Element {
  const { serviceId } = route.params;

  const {
    data: service,
    isLoading,
    isError,
    refetch,
  } = useServicioDetalle(serviceId);

  const actualizarServicio = useActualizarServicio();

  // Estado de favoritos con Zustand
  const isSaved = useSavedStore((state) =>
    state.savedServices.some((item) => item.id === serviceId)
  );

  const addService = useSavedStore((state) => state.addService);
  const removeService = useSavedStore((state) => state.removeService);

  // Estados del formulario
  const [editando, setEditando] = useState(false);
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [duracion, setDuracion] = useState('');
  const [cobertura, setCobertura] = useState('');
  const [precio, setPrecio] = useState('');
  const [message, setMessage] = useState('');

  // Cargar los datos del servicio en el formulario
  useEffect(() => {
    if (service) {
      setNombre(service.name);
      setCategoria(service.category);
      setDescripcion(service.description);
      setDuracion(service.duration);
      setCobertura(service.coverage);
      setPrecio(String(service.price));
    }
  }, [service]);

  // Estado de carga
  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.message}>Cargando información...</Text>
      </View>
    );
  }

  // Estado de error
  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>
          No fue posible cargar la información del servicio.
        </Text>

        <Pressable
          style={styles.button}
          onPress={async () => {
            await refetch();
          }}
        >
          <Text style={styles.buttonText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  // Servicio inexistente
  if (!service) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Servicio no encontrado</Text>
      </View>
    );
  }

  // Guardar o eliminar de favoritos
  const handleSave = (): void => {
    if (isSaved) {
      removeService(service.id);
      setMessage('El servicio se eliminó de tus guardados.');
    } else {
      addService(service);
      setMessage('El servicio se agregó a tus guardados.');
    }
  };

  // Activar edición
  const handleEdit = (): void => {
    setMessage('');
    setEditando(true);
  };

  // Cancelar edición
  const handleCancel = (): void => {
    setNombre(service.name);
    setCategoria(service.category);
    setDescripcion(service.description);
    setDuracion(service.duration);
    setCobertura(service.coverage);
    setPrecio(String(service.price));
    setEditando(false);
    setMessage('');
  };

  // Actualizar servicio mediante PUT
  const handleUpdate = (): void => {
    const precioNumerico = Number(precio);

    if (
      !nombre.trim() ||
      !categoria.trim() ||
      !descripcion.trim() ||
      !duracion.trim() ||
      !cobertura.trim() ||
      !precio.trim()
    ) {
      setMessage('Todos los campos son obligatorios.');
      return;
    }

    if (!Number.isFinite(precioNumerico) || precioNumerico <= 0) {
      setMessage('Ingresa un precio válido mayor que cero.');
      return;
    }

    actualizarServicio.mutate(
      {
        id: service.id,
        servicio: {
          name: nombre.trim(),
          category: categoria.trim(),
          description: descripcion.trim(),
          duration: duracion.trim(),
          coverage: cobertura.trim(),
          price: precioNumerico,
          imageUrl: service.imageUrl,
        },
      },
      {
        onSuccess: () => {
          setEditando(false);
          setMessage('Servicio actualizado correctamente.');
        },
        onError: () => {
          setMessage('No fue posible actualizar el servicio.');
        },
      }
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {editando ? (
        <>
          <Text style={styles.title}>Editar servicio</Text>

          <Text style={styles.label}>Nombre del servicio</Text>
          <TextInput
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
            placeholder="Nombre del servicio"
            placeholderTextColor={COLORS.textSecondary}
          />

          <Text style={styles.label}>Categoría</Text>
          <TextInput
            style={styles.input}
            value={categoria}
            onChangeText={setCategoria}
            placeholder="Categoría"
            placeholderTextColor={COLORS.textSecondary}
          />

          <Text style={styles.label}>Descripción</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            value={descripcion}
            onChangeText={setDescripcion}
            placeholder="Descripción del servicio"
            placeholderTextColor={COLORS.textSecondary}
            multiline
            numberOfLines={4}
          />

          <Text style={styles.label}>Duración</Text>
          <TextInput
            style={styles.input}
            value={duracion}
            onChangeText={setDuracion}
            placeholder="Ejemplo: 2 horas"
            placeholderTextColor={COLORS.textSecondary}
          />

          <Text style={styles.label}>Cobertura</Text>
          <TextInput
            style={styles.input}
            value={cobertura}
            onChangeText={setCobertura}
            placeholder="Cobertura del servicio"
            placeholderTextColor={COLORS.textSecondary}
          />

          <Text style={styles.label}>Precio</Text>
          <TextInput
            style={styles.input}
            value={precio}
            onChangeText={setPrecio}
            placeholder="Precio en pesos colombianos"
            placeholderTextColor={COLORS.textSecondary}
            keyboardType="numeric"
          />

          <Pressable
            style={[
              styles.button,
              actualizarServicio.isPending && styles.disabledButton,
            ]}
            onPress={handleUpdate}
            disabled={actualizarServicio.isPending}
          >
            {actualizarServicio.isPending ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>
                Guardar cambios
              </Text>
            )}
          </Pressable>

          <Pressable
            style={[styles.button, styles.cancelButton]}
            onPress={handleCancel}
            disabled={actualizarServicio.isPending}
          >
            <Text style={styles.buttonText}>Cancelar</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text style={styles.category}>{service.category}</Text>

          <Text style={styles.title}>{service.name}</Text>

          <Text style={styles.description}>
            {service.description}
          </Text>

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
            style={styles.button}
            onPress={handleEdit}
          >
            <Text style={styles.buttonText}>Editar servicio</Text>
          </Pressable>

          <Pressable
            style={[styles.button, isSaved && styles.removeButton]}
            onPress={handleSave}
          >
            <Text style={styles.buttonText}>
              {isSaved ? 'Eliminar de guardados' : 'Guardar servicio'}
            </Text>
          </Pressable>
        </>
      )}

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

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

  input: {
    backgroundColor: COLORS.surface,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    fontSize: TYPOGRAPHY.body,
  },

  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
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

  cancelButton: {
    backgroundColor: COLORS.textSecondary,
    marginTop: SPACING.sm,
  },

  disabledButton: {
    opacity: 0.6,
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

  error: {
    color: COLORS.danger,
    fontSize: TYPOGRAPHY.body,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
});
