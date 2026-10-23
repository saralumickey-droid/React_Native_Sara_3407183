import { ScrollView, StyleSheet, Pressable, Text, View } from 'react-native';
import {
  useNavigation,
  useRoute,
  type RouteProp,
} from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../navigation/types';
import { services } from '../data/mockData';
import { COLORS, SPACING } from '../theme';

type DetailRoute = RouteProp<HomeStackParamList, 'HomeDetail'>;

type DetailNavigation = NativeStackNavigationProp<
  HomeStackParamList,
  'HomeDetail'
>;

export default function DetailScreen() {
    const navigation = useNavigation<DetailNavigation>();
    const route = useRoute<DetailRoute>();
    const { id, name } = route.params;

    const service = services.find((item) => item.id === id);

    if (!service) {
        return (
        <View style={styles.container}>
            <Text style={styles.title}>Servicio no encontrado</Text>
        </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.banner}>
            <Text style={styles.bannerIcon}>✓</Text>
            <Text style={styles.bannerText}>Servicio de fumigación</Text>
        </View>
        <Pressable
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        >
        <Text style={styles.backButtonText}>‹ Volver a servicios</Text>
        </Pressable>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.category}>{service.category}</Text>

        <Text style={styles.sectionTitle}>Descripción</Text>
        <Text style={styles.description}>{service.description}</Text>

        <View style={styles.card}>
            <Text style={styles.label}>Precio de referencia</Text>
            <Text style={styles.price}>
            ${service.price.toLocaleString('es-CO')}
            </Text>

            <View style={styles.divider} />

            <Text style={styles.label}>Duración estimada</Text>
            <Text style={styles.value}>{service.duration}</Text>

            <View style={styles.divider} />

            <Text style={styles.label}>Técnico asignado</Text>
            <Text style={styles.value}>{service.technician}</Text>

            <View style={styles.divider} />

            <Text style={styles.label}>Código del servicio</Text>
            <Text style={styles.value}>SRV-{String(service.id).padStart(3, '0')}</Text>
        </View>

        <Text style={styles.note}>
            Información demostrativa. Los precios y las asignaciones no representan
            una contratación real.
        </Text>
        </ScrollView>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        padding: SPACING.md,
        paddingBottom: SPACING.xl,
    },
    banner: {
        backgroundColor: '#E2F2E7',
        borderRadius: 14,
        padding: SPACING.lg,
        alignItems: 'center',
        marginBottom: SPACING.lg,
    },
    bannerIcon: {
        fontSize: 38,
        color: COLORS.primary,
        fontWeight: '700',
    },
    bannerText: {
        fontSize: 15,
        color: COLORS.primary,
        fontWeight: '600',
        marginTop: SPACING.sm,
    },
    title: {
        fontSize: 25,
        fontWeight: '700',
        color: COLORS.text,
    },
    category: {
        fontSize: 14,
        color: COLORS.muted,
        marginTop: SPACING.sm,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.text,
        marginTop: SPACING.lg,
        marginBottom: SPACING.sm,
    },
    description: {
        fontSize: 15,
        color: COLORS.muted,
        lineHeight: 23,
    },
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: 14,
        padding: SPACING.md,
        marginTop: SPACING.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    label: {
        fontSize: 13,
        color: COLORS.muted,
    },
    price: {
        fontSize: 23,
        fontWeight: '700',
        color: COLORS.primary,
        marginTop: 5,
    },
    value: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.text,
        marginTop: 5,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: SPACING.md,
    },
    note: {
        fontSize: 12,
        color: COLORS.muted,
        marginTop: SPACING.md,
        lineHeight: 18,
    },
    backButton: {
        alignSelf: 'flex-start',
        paddingVertical: 10,
        paddingHorizontal: 14,
        marginBottom: 16,
        borderRadius: 8,
        backgroundColor: '#E2F2E7',
    },
    backButtonText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: '600',
    },
});
