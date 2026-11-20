
import { useMemo, useState } from 'react';

import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { HomeStackParamList } from '../navigation/types';

import {
  useServicios,
  useEliminarServicio,
} from '../hooks/useServicios';

import { COLORS, SPACING, TYPOGRAPHY } from '../theme';

type Props = NativeStackScreenProps<HomeStackParamList, 'HomeList'>;

export default function HomeScreen({
  navigation,
}: Props): React.JSX.Element {
  const [busqueda, setBusqueda] = useState('');

  const {
    data: servicios,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useServicios();

  const eliminarServicio = useEliminarServicio();

  // Filtrar servicios por nombre, categoría o descripción.
  const serviciosFiltrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();

    if (!termino) {
      return servicios ?? [];
    }

    return (servicios ?? []).filter((servicio) =>
      [
        servicio.name,
        servicio.category,
        servicio.description,
      ].some((campo) => campo.toLowerCase().includes(termino))
    );
  }, [servicios, busqueda]);

  // Confirmar antes de eliminar.
  const confirmarEliminacion = (
    id: string,
    nombre: string
  ): void => {
    Alert.alert(
      'Eliminar servicio',
      `¿Estás seguro de que deseas eliminar "${nombre}"?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => eliminarServicio.mutate(id),
        },
      ]
    );
  };

  // Estado de carga inicial.
  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.message}>Cargando servicios...</Text>
      </View>
    );
  }

  // Estado de error.
  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>
          No fue posible cargar los servicios.
        </Text>

        <Pressable
          style={styles.retryButton}
          onPress={() => refetch()}
        >
          <Text style={styles.retryText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nuestros servicios</Text>

      <Text style={styles.subtitle}>
        Encuentra el servicio de control de plagas que necesitas.
      </Text>

      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={21}
          color={COLORS.textSecondary}
        />

        <TextInput
          style={styles.searchInput}
          placeholder="Buscar servicios..."
          placeholderTextColor={COLORS.textSecondary}
          value={busqueda}
          onChangeText={setBusqueda}
          autoCapitalize="none"
          returnKeyType="search"
        />

        {busqueda.length > 0 && (
          <Pressable
            onPress={() => setBusqueda('')}
            accessibilityLabel="Limpiar búsqueda"
          >
            <Ionicons
              name="close-circle"
              size={21}
              color={COLORS.textSecondary}
            />
          </Pressable>
        )}
      </View>

      {/* Navegar al formulario de creación */}
      <Pressable
        style={styles.createButton}
        onPress={() => navigation.navigate('Create')}
      >
        <Text style={styles.createButtonText}>
          + Agregar servicio
        </Text>
      </Pressable>

      {eliminarServicio.isError && (
        <Text style={styles.error}>
          No fue posible eliminar el servicio.
        </Text>
      )}

      <Text style={styles.results}>
        {serviciosFiltrados.length} servicio(s) encontrado(s)
      </Text>

      <FlatList
        data={serviciosFiltrados}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={async () => {
              await refetch();
            }}
            colors={[COLORS.primary]}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="search-outline"
              size={36}
              color={COLORS.textSecondary}
            />

            <Text style={styles.message}>
              {busqueda.trim()
                ? 'No se encontraron servicios con esa búsqueda.'
                : 'No hay servicios disponibles.'}
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Abrir detalles */}
            <Pressable
              onPress={() =>
                navigation.navigate('Detail', {
                  serviceId: item.id,
                })
              }
            >
              {item.imageUrl ? (
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.serviceImage}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Text style={styles.placeholderText}>
                    Imagen no disponible
                  </Text>
                </View>
              )}

              <Text style={styles.category}>
                {item.category}
              </Text>

              <Text style={styles.name}>
                {item.name}
              </Text>

              <Text
                style={styles.description}
                numberOfLines={3}
              >
                {item.description}
              </Text>

              <View style={styles.footer}>
                <Text style={styles.duration}>
                  {item.duration}
                </Text>

                <Text style={styles.price}>
                  ${item.price.toLocaleString('es-CO')}
                </Text>
              </View>
            </Pressable>

            {/* Eliminar servicio */}
            <Pressable
              style={[
                styles.deleteButton,
                eliminarServicio.isPending && styles.disabledButton,
              ]}
              disabled={eliminarServicio.isPending}
              onPress={() =>
                confirmarEliminacion(item.id, item.name)
              }
            >
              {eliminarServicio.isPending ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.deleteButtonText}>
                  Eliminar servicio
                </Text>
              )}
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.md,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
  },

  title: {
    fontSize: TYPOGRAPHY.title,
    fontWeight: 'bold',
    color: COLORS.primary,
  },

  subtitle: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
    marginBottom: SPACING.md,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    minHeight: 48,
  },

  searchInput: {
    flex: 1,
    color: COLORS.text,
    fontSize: TYPOGRAPHY.body,
    paddingVertical: SPACING.sm,
    marginLeft: SPACING.sm,
  },

  createButton: {
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: SPACING.md,
  },

  createButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: TYPOGRAPHY.body,
  },

  results: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.caption,
    marginBottom: SPACING.sm,
  },

  list: {
    paddingBottom: SPACING.lg,
    flexGrow: 1,
  },

  card: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: 14,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },

  serviceImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: SPACING.md,
    backgroundColor: COLORS.border,
  },

  imagePlaceholder: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: SPACING.md,
    backgroundColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },

  placeholderText: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.caption,
  },

  category: {
    color: COLORS.secondary,
    fontSize: TYPOGRAPHY.caption,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },

  name: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.subtitle,
    fontWeight: 'bold',
  },

  description: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.body,
    marginTop: SPACING.sm,
    lineHeight: 22,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.md,
  },

  duration: {
    color: COLORS.textSecondary,
  },

  price: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },

  deleteButton: {
    backgroundColor: COLORS.danger,
    padding: SPACING.md,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.md,
  },

  disabledButton: {
    opacity: 0.6,
  },

  deleteButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: TYPOGRAPHY.body,
  },

  emptyContainer: {
    alignItems: 'center',
    padding: SPACING.lg,
  },

  message: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.body,
    marginTop: SPACING.md,
    textAlign: 'center',
  },

  error: {
    color: COLORS.danger,
    fontSize: TYPOGRAPHY.body,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },

  retryButton: {
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: 10,
  },

  retryText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
