
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { favoriteServices } from '../data/mockData';
import { COLORS, SPACING } from '../theme';

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Servicios favoritos</Text>
      <Text style={styles.subtitle}>
        Una selección de servicios guardados como ejemplo.
      </Text>

      <FlatList
        data={favoriteServices}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Ionicons
              name="heart"
              size={25}
              color={COLORS.primary}
            />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.price}>
                ${item.price.toLocaleString('es-CO')}
              </Text>
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
    padding: SPACING.md,
    backgroundColor: COLORS.background,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: SPACING.sm,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.muted,
    marginTop: SPACING.sm,
    marginBottom: SPACING.md,
  },
  list: {
    paddingBottom: SPACING.lg,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.md,
  },
  info: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  category: {
    fontSize: 13,
    color: COLORS.muted,
    marginTop: 4,
  },
  price: {
    color: COLORS.primary,
    fontWeight: '700',
    marginTop: 6,
  },
});
