import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import {
  getServicios,
  getServicioById,
  createServicio,
  updateServicio,
  deleteServicio,
} from '../services/serviciosService';

import type { FumigationService } from '../types';
import type { ServicioInput } from '../services/serviciosService';

export function useServicios() {
  return useQuery({
    queryKey: ['servicios'],
    queryFn: getServicios,
  });
}

export function useServicioDetalle(id: string) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['servicios', id],
    queryFn: async () => {
      const servicios =
        queryClient.getQueryData<FumigationService[]>(['servicios']);

      const servicioGuardado = servicios?.find(
        (servicio) => servicio.id === id
      );

      if (servicioGuardado) {
        return servicioGuardado;
      }

      return getServicioById(id);
    },
    enabled: Boolean(id),
  });
}

export function useCrearServicio() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createServicio,

    onSuccess: async (nuevoServicio) => {
      queryClient.setQueryData<FumigationService[]>(
        ['servicios'],
        (servicios = []) => [...servicios, nuevoServicio]
      );

      await queryClient.invalidateQueries({
        queryKey: ['servicios'],
        refetchType: 'none',
      });
    },
  });
}

export function useActualizarServicio() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      servicio,
    }: {
      id: string;
      servicio: ServicioInput;
    }) => {
      if (id.startsWith('local-')) {
        return {
          ...servicio,
          id,
        };
      }

      return updateServicio(id, servicio);
    },

    onSuccess: async (servicioActualizado) => {
      queryClient.setQueryData<FumigationService[]>(
        ['servicios'],
        (servicios = []) =>
          servicios.map((servicio) =>
            servicio.id === servicioActualizado.id
              ? servicioActualizado
              : servicio
          )
      );

      queryClient.setQueryData(
        ['servicios', servicioActualizado.id],
        servicioActualizado
      );

      await queryClient.invalidateQueries({
        queryKey: ['servicios'],
        refetchType: 'none',
      });
    },
  });
}

export function useEliminarServicio() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!id.startsWith('local-')) {
        await deleteServicio(id);
      }

      return id;
    },

    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: ['servicios'],
      });

      const serviciosAnteriores =
        queryClient.getQueryData<FumigationService[]>(['servicios']);

      queryClient.setQueryData<FumigationService[]>(
        ['servicios'],
        (servicios = []) =>
          servicios.filter((servicio) => servicio.id !== id)
      );

      return { serviciosAnteriores };
    },

    onError: (_error, _id, context) => {
      if (context?.serviciosAnteriores) {
        queryClient.setQueryData(
          ['servicios'],
          context.serviciosAnteriores
        );
      }
    },

    onSuccess: async (id) => {
      queryClient.removeQueries({
        queryKey: ['servicios', id],
      });

      await queryClient.invalidateQueries({
        queryKey: ['servicios'],
        refetchType: 'none',
      });
    },
  });
}
