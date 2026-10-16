import { useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  StatusBar,
} from 'react-native';

export default function App() {
  const [siguiendo, setSiguiendo] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* PASO 1: Estructura base */}
      <Text style={styles.title}>Mi Perfil</Text>

      {/* PASO 2: Imagen de perfil */}
      <Image
        source={{ uri: 'https://i.pravatar.cc/120' }}
        style={styles.avatar}
        resizeMode="cover"
      />

      {/* PASO 3: Información del perfil */}
      <Text style={styles.name}>Ada Lovelace</Text>
      <Text style={styles.role}>Ingeniera de Software</Text>

      <Text style={styles.bio} numberOfLines={2}>
        Primera programadora de la historia. Escribió el primer algoritmo
        diseñado para ser procesado por una máquina.
      </Text>

      {/* PASO 4: Estadísticas */}
      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>42</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.statNumber}>1.2k</Text>
          <Text style={styles.statLabel}>Seguidores</Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.statNumber}>318</Text>
          <Text style={styles.statLabel}>Siguiendo</Text>
        </View>
      </View>

      {/* PASO 5: Botón de acción */}
      <Pressable
        style={({ pressed }) => [
          styles.btnFollow,
          pressed && styles.btnFollowPressed,
        ]}
        onPress={() => {
          console.log('¡Siguiendo!');
          setSiguiendo(!siguiendo);
        }}
      >
        <Text style={styles.btnText}>
          {siguiendo ? 'Siguiendo' : 'Seguir'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121826',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  role: {
    color: '#60A5FA',
    fontSize: 15,
    marginBottom: 12,
  },
  bio: {
    color: '#CBD5E1',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 24,
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 4,
  },
  btnFollow: {
    backgroundColor: '#3B82F6',
    width: '100%',
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnFollowPressed: {
    opacity: 0.6,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
