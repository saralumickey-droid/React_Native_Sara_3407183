import { NavigatorScreenParams } from '@react-navigation/native';

export type HomeStackParamList = {
  HomeList: undefined;
  Detail: {
    serviceId: string;
  };
  Create: undefined;
  Edit: {
    serviceId: string;
  };
};

export type RootTabParamList = {
  Inicio: NavigatorScreenParams<HomeStackParamList>;
  Guardados: undefined;
};
