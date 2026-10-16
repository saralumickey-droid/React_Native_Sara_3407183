import { useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  StatusBar,
} from 'react-native';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
}

const PRODUCTS: Product[] = [
  { id: '1', name: 'Laptop', category: 'Tecnología', price: 2500000 },
  { id: '2', name: 'Audífonos', category: 'Accesorios', price: 120000 },
  { id: '3', name: 'Teclado mecánico', category: 'Periféricos', price: 280000 },
  { id: '4', name: 'Mouse inalámbrico', category: 'Periféricos', price: 95000 },
  { id: '5', name: 'Monitor', category: 'Tecnología', price: 850000 },
  { id: '6', name: 'Cargador USB-C', category: 'Accesorios', price: 75000 },
  { id: '7', name: 'Parlante Bluetooth', category: 'Audio', price: 180000 },
  { id: '8', name: 'Memoria USB', category: 'Almacenamiento', price: 35000 },
  { id: '9', name: 'Disco SSD', category: 'Almacenamiento', price: 320000 },
  { id: '10', name: 'Webcam', category: 'Accesorios', price: 160000 },
  { id: '11', name: 'Tablet', category: 'Tecnología', price: 950000 },
  { id: '12', name: 'Base para portátil', category: 'Accesorios', price: 110000 },
];

export default function App() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await new Promise<void>((resolve) => setTimeout(resolve, 1200));
    setIsRefreshing(false);
  }, []);

  const renderItem = ({ item }: { item: Product }) => (
    <Pressable
      style={({ pressed }) => [
        styles.item,
        pressed && styles.itemPressed,
      ]}
      onPress={() => console.log('Seleccionado:', item.name)}
    >
      <View style={styles.itemContent}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemCategory}>{item.category}</Text>
      </View>
      <Text style={styles.itemPrice}>
        ${item.price.toLocaleString('es-CO')}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E3A8A" />

      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.brand}>MI TIENDA</Text>
            <Text style={styles.title}>Catálogo de Productos</Text>
            <Text style={styles.subtitle}>
              Explora nuestros productos disponibles
            </Text>
            <Text style={styles.count}>
              {PRODUCTS.length} productos disponibles
            </Text>
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No hay productos disponibles
          </Text>
        }
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  listContent: {
    padding: 20,
    paddingBottom: 40,
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#1E3A8A',
    padding: 22,
    borderRadius: 14,
    marginBottom: 18,
  },
  brand: {
    color: '#BFDBFE',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 8,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: '#DBEAFE',
    fontSize: 14,
    lineHeight: 21,
  },
  count: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 14,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 10,
  },
  itemPressed: {
    opacity: 0.55,
  },
  itemContent: {
    flex: 1,
    marginRight: 12,
  },
  itemName: {
    color: '#1E293B',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemCategory: {
    color: '#64748B',
    fontSize: 13,
  },
  itemPrice: {
    color: '#1D4ED8',
    fontSize: 14,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#DCE3ED',
    marginVertical: 5,
  },
  emptyText: {
    color: '#64748B',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 35,
  },
});
