
import { useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import type { DomainItem } from '../types';

interface ItemCardProps {
  item: DomainItem;
}

export default function ItemCard({ item }: ItemCardProps) {
  const [selected, setSelected] = useState(false);

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.category}>
          {item.entity.toUpperCase()}
        </Text>

        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
        <Text style={styles.description}>{item.description}</Text>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
            selected && styles.buttonSelected,
          ]}
          onPress={() => {
            setSelected(!selected);
            console.log(`Elemento seleccionado: ${item.name}`);
          }}
          accessibilityRole="button"
          accessibilityLabel={`${item.actionLabel}: ${item.name}`}
        >
          <Text style={styles.buttonText}>
            {selected ? 'Seleccionado' : item.actionLabel}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 18,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 170,
    backgroundColor: '#E2E8F0',
  },
  content: {
    padding: 16,
  },
  category: {
    color: '#15803D',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 6,
  },
  name: {
    color: '#172B22',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    color: '#47715A',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 9,
  },
  description: {
    color: '#64748B',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#166534',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 9,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.65,
  },
  buttonSelected: {
    backgroundColor: '#475569',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
