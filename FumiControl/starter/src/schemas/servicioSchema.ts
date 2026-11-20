import { z } from 'zod';

export const servicioSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'El nombre debe tener mínimo 3 caracteres'),

  category: z
    .string()
    .trim()
    .min(1, 'La categoría es obligatoria'),

  description: z
    .string()
    .trim()
    .min(10, 'La descripción debe tener mínimo 10 caracteres'),

  duration: z
    .string()
    .trim()
    .min(1, 'La duración es obligatoria'),

  coverage: z
    .string()
    .trim()
    .min(1, 'La cobertura es obligatoria'),

  price: z
    .number({
      error: 'El precio debe ser un número',
    })
    .positive('El precio debe ser mayor que 0'),
});

export type ServicioFormData = z.infer<typeof servicioSchema>;
