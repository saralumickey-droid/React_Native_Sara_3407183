import { api } from './api';
import type { FumigationService } from '../types';

interface PostResponse {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export type ServicioInput = Omit<FumigationService, 'id'>;

// Catálogo de servicios de FumiControl.
const catalogoServicios: ServicioInput[] = [
  {
    name: 'Control de plagas en el hogar',
    category: 'Servicio residencial',
    description:
      'Servicio de control de plagas comunes en viviendas, habitaciones, cocinas y zonas compartidas.',
    duration: '2 horas',
    coverage: 'Viviendas y apartamentos',
    price: 120000,
    imageUrl:
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900',
  },
  {
    name: 'Fumigación comercial',
    category: 'Servicio comercial',
    description:
      'Servicio de control de plagas para locales comerciales y establecimientos.',
    duration: '3 horas',
    coverage: 'Locales y establecimientos',
    price: 180000,
    imageUrl:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900',
  },
  {
    name: 'Control de roedores',
    category: 'Control especializado',
    description:
      'Inspección y control de presencia de roedores en espacios residenciales y comerciales.',
    duration: '2 horas',
    coverage: 'Zonas interiores y exteriores',
    price: 150000,
    imageUrl:
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=900',
  },
  {
    name: 'Control de insectos rastreros',
    category: 'Control especializado',
    description:
      'Servicio enfocado en el control de insectos rastreros en diferentes espacios.',
    duration: '2 horas',
    coverage: 'Cocinas, baños y zonas comunes',
    price: 130000,
    imageUrl:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900',
  },
  {
    name: 'Fumigación de oficinas',
    category: 'Servicio empresarial',
    description:
      'Servicio de control de plagas para oficinas y espacios de trabajo.',
    duration: '2 horas',
    coverage: 'Oficinas y espacios administrativos',
    price: 160000,
    imageUrl:
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900',
  },
  {
    name: 'Control de insectos voladores',
    category: 'Control especializado',
    description:
      'Servicio orientado al control de insectos voladores en espacios interiores y exteriores.',
    duration: '2 horas',
    coverage: 'Espacios interiores y exteriores',
    price: 140000,
    imageUrl:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900',
  },
  {
    name: 'Inspección preventiva',
    category: 'Servicio preventivo',
    description:
      'Evaluación de espacios para identificar señales de presencia de plagas y recomendar medidas preventivas.',
    duration: '1 hora',
    coverage: 'Viviendas y establecimientos',
    price: 80000,
    imageUrl:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900',
  },
  {
    name: 'Control de plagas en bodegas',
    category: 'Servicio empresarial',
    description:
      'Inspección y control de plagas en bodegas y espacios de almacenamiento.',
    duration: '3 horas',
    coverage: 'Bodegas y almacenes',
    price: 200000,
    imageUrl:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900',
  },
];

// Convertir la respuesta de JSONPlaceholder al modelo FumiControl.
function mapPostToServicio(post: PostResponse): FumigationService {
  const indice = (post.id - 1) % catalogoServicios.length;

  return {
    ...catalogoServicios[indice],
    id: String(post.id),
  };
}

// Consultar servicios.
export async function getServicios(): Promise<FumigationService[]> {
  const response = await api.get<PostResponse[]>('/posts?_limit=8');

  return response.data.map(mapPostToServicio);
}

// Consultar un servicio por ID.
export async function getServicioById(
  id: string
): Promise<FumigationService> {
  const response = await api.get<PostResponse>(`/posts/${id}`);

  return mapPostToServicio(response.data);
}

// Crear servicio.
export async function createServicio(
  input: ServicioInput
): Promise<FumigationService> {
  // JSONPlaceholder simula el POST, pero no persiste el registro.
  await api.post<PostResponse>('/posts', {
    title: input.name,
    body: input.description,
    userId: 1,
  });

  return {
    ...input,
    id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
  };
}

// Actualizar servicio.
export async function updateServicio(
  id: string,
  input: ServicioInput
): Promise<FumigationService> {
  await api.put<PostResponse>(`/posts/${id}`, {
    id: Number(id),
    title: input.name,
    body: input.description,
    userId: 1,
  });

  return {
    ...input,
    id,
  };
}

// Eliminar servicio.
export async function deleteServicio(id: string): Promise<void> {
  await api.delete(`/posts/${id}`);
}
