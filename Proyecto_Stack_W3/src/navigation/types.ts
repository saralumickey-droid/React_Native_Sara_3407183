import type { NavigatorScreenParams } from '@react-navigation/native';

export type HomeStackParamList = {
  HomeList: undefined;
  HomeDetail: { id: number; name: string };
};

export type RootParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Favorites: undefined;
};
