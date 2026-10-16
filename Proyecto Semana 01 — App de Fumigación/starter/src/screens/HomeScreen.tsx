
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import ItemCard from '../components/ItemCard';
import { mockData } from '../data/mockData';

export default function HomeScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={true}
    >
      <View style={styles.header}>
        <Text style={styles.eyebrow}>CONTROL PROFESIONAL DE PLAGAS</Text>
        <Text style={styles.title}>FumiControl</Text>
        <Text style={styles.subtitle}>
          Administración de clientes, servicios, técnicos y productos.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Panel de gestión</Text>

      {mockData.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}

      <Text style={styles.footer}>
        FumiControl | Aplicación de práctica
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F5F1',
  },
  content: {
    padding: 20,
    paddingTop: 55,
    paddingBottom: 35,
  },
  header: {
    backgroundColor: '#14532D',
    padding: 22,
    borderRadius: 16,
    marginBottom: 22,
  },
  eyebrow: {
    color: '#BBF7D0',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 9,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 29,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: '#DCFCE7',
    fontSize: 14,
    lineHeight: 21,
  },
  sectionTitle: {
    color: '#172B22',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  footer: {
    color: '#64748B',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 15,
  },
});
