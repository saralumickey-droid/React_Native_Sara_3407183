
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';

export default function App() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.mainTitle}>Ejercicio 02: Flexbox</Text>
      <Text style={styles.description}>
        Cuatro layouts usando Flexbox en React Native
      </Text>

      {/* LAYOUT 1: Header con título y botón */}
      <Text style={styles.sectionTitle}>Layout 1: Header</Text>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Inicio</Text>
        <Text style={styles.newButton}>+ Nuevo</Text>
      </View>

      {/* LAYOUT 2: Barra de navegación */}
      <Text style={styles.sectionTitle}>Layout 2: Tab Bar</Text>
      <View style={styles.tabBar}>
        <Text style={styles.tab}>Inicio</Text>
        <Text style={styles.tab}>Buscar</Text>
        <Text style={styles.tab}>Perfil</Text>
        <Text style={styles.tab}>Config</Text>
      </View>

      {/* LAYOUT 3: Avatar e información */}
      <Text style={styles.sectionTitle}>Layout 3: Tarjeta de usuario</Text>
      <View style={styles.userCard}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/100' }}
          style={styles.avatar}
          resizeMode="cover"
        />
        <View style={styles.textContainer}>
          <Text style={styles.userName}>Ada Lovelace</Text>
          <Text style={styles.subtitle}>Ingeniera de Software</Text>
        </View>
      </View>

      {/* LAYOUT 4: Pantalla dividida */}
      <Text style={styles.sectionTitle}>Layout 4: Pantalla dividida</Text>
      <View style={styles.splitLayout}>
        <View style={styles.sidePanel}>
          <Text style={styles.panelTitle}>Panel lateral</Text>
          <Text style={styles.panelText}>flex: 1</Text>
          <Text style={styles.panelText}>1/3 del espacio</Text>
        </View>
        <View style={styles.mainPanel}>
          <Text style={styles.panelTitle}>Contenido principal</Text>
          <Text style={styles.panelText}>flex: 2</Text>
          <Text style={styles.panelText}>2/3 del espacio</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Conceptos clave</Text>
      <View style={styles.infoCard}>
        <Text style={styles.infoText}>
          row: organiza elementos horizontalmente.
        </Text>
        <Text style={styles.infoText}>
          column: organiza elementos verticalmente.
        </Text>
        <Text style={styles.infoText}>
          justifyContent: distribuye elementos en el eje principal.
        </Text>
        <Text style={styles.infoText}>
          alignItems: alinea elementos en el eje transversal.
        </Text>
        <Text style={styles.infoText}>
          flex: distribuye el espacio disponible proporcionalmente.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  content: {
    paddingVertical: 24,
    paddingBottom: 40,
  },
  mainTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#1E293B',
    marginHorizontal: 20,
  },
  description: {
    fontSize: 14,
    color: '#64748B',
    marginHorizontal: 20,
    marginTop: 6,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#334155',
    marginHorizontal: 20,
    marginTop: 22,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  newButton: {
    backgroundColor: '#2563EB',
    color: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    overflow: 'hidden',
    fontWeight: 'bold',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 10,
  },
  tab: {
    color: '#334155',
    fontSize: 13,
    fontWeight: '500',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    padding: 14,
    borderRadius: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  splitLayout: {
    flexDirection: 'row',
    height: 180,
    marginHorizontal: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  sidePanel: {
    flex: 1,
    backgroundColor: '#93C5FD',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  mainPanel: {
    flex: 2,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  panelTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
  },
  panelText: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 3,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 10,
    gap: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 20,
  },
});
