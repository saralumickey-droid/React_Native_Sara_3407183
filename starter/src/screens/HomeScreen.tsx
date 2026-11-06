import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { HomeStackParamList } from '../navigation/types';
import { fumigationServices } from '../data/mockData';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme';

type Props = NativeStackScreenProps<HomeStackParamList, 'HomeList'>;

export default function HomeScreen({ navigation }: Props): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nuestros servicios</Text>
      <Text style={styles.subtitle}>
        Encuentra el servicio de control de plagas que necesitas.
      </Text>

      <FlatList
        data={fumigationServices}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              navigation.navigate('Detail', { serviceId: item.id })
            }
          >
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>

            <View style={styles.footer}>
              <Text style={styles.duration}>{item.duration}</Text>
              <Text style={styles.price}>
                ${item.price.toLocaleString('es-CO')}
              </Text>
            </View>
          </Pressable>
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
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.md,
  },
  duration: {
    color: COLORS.textSecondary,
  },
  price: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});