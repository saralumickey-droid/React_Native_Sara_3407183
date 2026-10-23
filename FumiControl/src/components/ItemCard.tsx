import { StyleSheet, Text, View } from 'react-native';
import type { Service } from '../types';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme';

interface ItemCardProps {
  item: Service;
}

export default function ItemCard({ item }: ItemCardProps) {
  const formattedPrice = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(item.price);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>+</Text>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.category}>{item.category}</Text>
        </View>

        <View
          style={[
            styles.statusBadge,
            item.available ? styles.availableBadge : styles.unavailableBadge,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              item.available ? styles.availableText : styles.unavailableText,
            ]}
          >
            {item.available ? 'Disponible' : 'No disponible'}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.priceLabel}>Precio del servicio</Text>
        <Text style={styles.price}>{formattedPrice}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: COLORS.primary,
    fontSize: 28,
    fontWeight: '700',
  },
  titleContainer: {
    flex: 1,
    gap: SPACING.xs,
  },
  name: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.body,
    fontWeight: '700',
  },
  category: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.caption,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 20,
  },
  availableBadge: {
    backgroundColor: COLORS.primaryLight,
  },
  unavailableBadge: {
    backgroundColor: '#FCE8E6',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  availableText: {
    color: COLORS.success,
  },
  unavailableText: {
    color: COLORS.danger,
  },
  footer: {
    marginTop: SPACING.md,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  priceLabel: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.caption,
  },
  price: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.subtitle,
    fontWeight: '700',
  },
});