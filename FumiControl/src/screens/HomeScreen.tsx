
import { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  RefreshControl,
  TextInput,
  View,
} from 'react-native';

import ItemCard from '../components/ItemCard';
import { mockData } from '../data/mockData';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme';
import type { Service } from '../types';

export default function HomeScreen() {
  const [search, setSearch] = useState('');

  const [refreshing, setRefreshing] = useState(false);

const onRefresh = useCallback(() => {
  setRefreshing(true);

  setSearch('');

  setRefreshing(false);
}, []);

  const filteredServices = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('es-CO');

    if (!query) {
      return mockData;
    }

    return mockData.filter((service) => {
      return (
        service.name.toLocaleLowerCase('es-CO').includes(query) ||
        service.category.toLocaleLowerCase('es-CO').includes(query)
      );
    });
  }, [search]);

  const renderItem = useCallback(
    ({ item }: { item: Service }) => <ItemCard item={item} />,
    [],
  );

  const renderEmptyState = useCallback(
    () => (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No encontramos servicios</Text>
        <Text style={styles.emptyMessage}>
          Intenta buscar con otro nombre o categoría.
        </Text>
      </View>
    ),
    [],
  );

  const renderSeparator = useCallback(
    () => <View style={styles.separator} />,
    [],
  );

  const renderListHeader = useCallback(
    () => (
      <View style={styles.listHeader}>
        <Text style={styles.resultsTitle}>Catálogo de servicios</Text>
        <Text style={styles.resultsCount}>
          {filteredServices.length}{' '}
          {filteredServices.length === 1 ? 'servicio' : 'servicios'}
        </Text>
      </View>
    ),
    [filteredServices.length],
  );

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Text style={styles.eyebrow}>EMPRESA DE FUMIGACIÓN</Text>
        <Text style={styles.title}>Nuestros servicios</Text>
        <Text style={styles.subtitle}>
          Encuentra el tratamiento que necesitas.
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar servicio o categoría..."
          placeholderTextColor={COLORS.textSecondary}
          value={search}
          onChangeText={setSearch}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          accessibilityLabel="Buscar servicios de fumigación"
        />
        {search.length > 0 && (
          <Text
            accessibilityRole="button"
            onPress={() => setSearch('')}
            style={styles.clearButton}
          >
            Limpiar
          </Text>
        )}
      </View>

      <FlatList
        style={styles.list}
        contentContainerStyle={[
          styles.listContent,
          filteredServices.length === 0 && styles.emptyListContent,
        ]}
        data={filteredServices}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={renderEmptyState}
        refreshing={refreshing}
        onRefresh={onRefresh}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: SPACING.xl,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  eyebrow: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.caption,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: SPACING.sm,
  },
  title: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.title,
    fontWeight: '800',
    marginBottom: SPACING.xs,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.body,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    minHeight: 52,
    gap: SPACING.sm,
  },
  searchIcon: {
    fontSize: 25,
    color: COLORS.primary,
  },
  searchInput: {
    flex: 1,
    color: COLORS.text,
    fontSize: TYPOGRAPHY.body,
    paddingVertical: SPACING.sm
  },
  clearButton: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.caption,
    fontWeight: '700',
    padding: SPACING.xs,
  },
  resultsHeader: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  resultsTitle: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.subtitle,
    fontWeight: '700',
  },
  resultsCount: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.caption,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  separator: {
    height: SPACING.md,
  },
  emptyListContent: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  emptyTitle: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.subtitle,
    fontWeight: '700',
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  emptyMessage: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.body,
    textAlign: 'center',
  },
  listHeader: {
  paddingBottom: SPACING.md,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: SPACING.sm,
  },
});
