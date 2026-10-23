
import type { Item } from '../types';

export const services: Item[] = [
  {
    id: 1,
    name: 'Fumigación residencial',
    category: 'Hogares',
    description:
      'Servicio para controlar cucarachas, hormigas y otros insectos en viviendas.',
    price: 120000,
    duration: '1 a 2 horas',
    technician: 'Carlos Méndez',
  },
  {
    id: 2,
    name: 'Control de plagas comerciales',
    category: 'Empresas',
    description:
      'Tratamiento preventivo y correctivo para oficinas y establecimientos comerciales.',
    price: 220000,
    duration: '2 a 3 horas',
    technician: 'Andrés Torres',
  },
  {
    id: 3,
    name: 'Control de roedores',
    category: 'Control especializado',
    description:
      'Inspección y control de roedores con medidas preventivas para evitar su reaparición.',
    price: 180000,
    duration: '1 a 2 horas',
    technician: 'Laura Rodríguez',
  },
  {
    id: 4,
    name: 'Desinfección de espacios',
    category: 'Desinfección',
    description:
      'Servicio de desinfección para espacios residenciales y comerciales.',
    price: 150000,
    duration: '1 hora',
    technician: 'Carlos Méndez',
  },
];

export const favoriteServices: Item[] = [
  services[0],
  services[1],
  services[2],
];
