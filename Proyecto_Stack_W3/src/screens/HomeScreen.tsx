
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../navigation/types';
import { services } from '../data/mockData';
import { COLORS, SPACING } from '../theme';

type Props = {
  navigation: NativeStackNavigationProp<HomeStackParamList, 'HomeList'>;
};

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Servicios de fumigación</Text>
      <Text style={styles.subtitle}>
        Selecciona un servicio para consultar su información.
      </Text>

      <FlatList
        data={services}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              navigation.navigate('HomeDetail', {
                id: item.id,
                name: item.name,
              })
            }
          >
            <View style={styles.iconCircle}>
              <Text style={styles.icon}>✓</Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.price}>
                Desde ${item.price.toLocaleString('es-CO')}
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
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
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: SPACING.sm,
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 14,
    marginTop: SPACING.sm,
    marginBottom: SPACING.md,
  },
  list: {
    paddingBottom: SPACING.lg,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E2F2E7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 22,
    color: COLORS.primary,
    fontWeight: '700',
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
    color: COLORS.muted,
    marginTop: 4,
  },
  price: {
    color: COLORS.primary,
    fontWeight: '700',
    marginTop: 8,
  },
  arrow: {
    fontSize: 28,
    color: COLORS.primary,
    marginLeft: 8,
  },
});
