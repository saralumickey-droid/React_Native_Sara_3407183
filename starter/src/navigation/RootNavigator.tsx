import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStackParamList, RootTabParamList } from './types';

import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import SavedScreen from '../screens/SavedScreen';

import { useSavedStore } from '../stores/savedStore';
import { COLORS } from '../theme';

const Stack = createNativeStackNavigator<HomeStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

function HomeStack(): React.JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: 'bold' },
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Stack.Screen
        name="HomeList"
        component={HomeScreen}
        options={{ title: 'FumiControl' }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{ title: 'Detalle del servicio' }}
      />
    </Stack.Navigator>
  );
}

export default function RootNavigator(): React.JSX.Element {
  const savedCount = useSavedStore(
    (state) => state.savedServices.length
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
            backgroundColor: COLORS.surface,
            borderTopWidth: 0,
            borderRadius: 14,
            height: 70,
            marginHorizontal: 14,
            marginBottom: 12,
            paddingTop: 8,
            paddingBottom: 8,
            elevation: 5,
            shadowColor: '#000000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.10,
            shadowRadius: 6,
        },
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeStack}
        options={{
          tabBarLabel: 'Inicio',
        }}
      />

      <Tab.Screen
        name="Guardados"
        component={SavedScreen}
        options={{
          tabBarLabel: 'Guardados',
          tabBarBadge: savedCount > 0 ? savedCount : undefined,
          tabBarBadgeStyle: {
            backgroundColor: COLORS.accent,
            color: COLORS.text,
          },
        }}
      />
    </Tab.Navigator>
  );
}