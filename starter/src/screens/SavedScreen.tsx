import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useSavedStore } from '../stores/savedStore';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme';

export default function SavedScreen(): React.JSX.Element {
  const savedServices = useSavedStore(
    (state) => state.savedServices
  );

  const removeService = useSavedStore(
    (state) => state.removeService
  );

  const clearServices = useSavedStore(
    (state) => state.clearServices
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Servicios guardados</Text>

      <Text style={styles.subtitle}>
        Consulta los servicios que has seleccionado.
      </Text>

      {savedServices.length > 0 && (
        <Pressable
          style={styles.clearButton}
          onPress={clearServices}
        >
          <Text style={styles.clearButtonText}>
            Vaciar lista
          </Text>
        </Pressable>
      )}

      <FlatList
        data={savedServices}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>
              No tienes servicios guardados
            </Text>

            <Text style={styles.emptyDescription}>
              Explora el catálogo y guarda los servicios que te interesen.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.category}>
              {item.category}
            </Text>

            <Text style={styles.name}>
              {item.name}
            </Text>

            <Text style={styles.description}>
              {item.description}
            </Text>

            <View style={styles.footer}>
              <Text style={styles.price}>
                ${item.price.toLocaleString('es-CO')}
              </Text>

              <Pressable
                style={styles.removeButton}
                onPress={() => removeService(item.id)}
              >
                <Text style={styles.removeButtonText}>
                  Eliminar
                </Text>
              </Pressable>
            </View>
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
  list: {
    flexGrow: 1,
    paddingBottom: SPACING.lg,
  },
  card: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: 14,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  category: {
    color: COLORS.secondary,
    fontSize: TYPOGRAPHY.caption,
    fontWeight: 'bold',
  },
  name: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.subtitle,
    fontWeight: 'bold',
    marginTop: SPACING.xs,
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.body,
    marginTop: SPACING.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  price: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: COLORS.danger,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 8,
  },
  removeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  clearButton: {
    alignSelf: 'flex-end',
    padding: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  clearButtonText: {
    color: COLORS.danger,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  emptyTitle: {
    fontSize: TYPOGRAPHY.subtitle,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.sm,
  },
});