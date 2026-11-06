import { NavigatorScreenParams } from '@react-navigation/native';

export type HomeStackParamList = {
  HomeList: undefined;
  Detail: {
    serviceId: string;
  };
};

export type RootTabParamList = {
  Inicio: NavigatorScreenParams<HomeStackParamList>;
  Guardados: undefined;
};