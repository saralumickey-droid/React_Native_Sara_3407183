import type { DomainItem } from '../types';

export const mockData: DomainItem[] = [
  {
    id: 1,
    entity: 'clients',
    name: 'Residencial Los Pinos',
    subtitle: 'Cliente residencial',
    description: 'Servicio solicitado para el control de plagas en zonas comunes.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600',
    actionLabel: 'Ver cliente',
  },
  {
    id: 2,
    entity: 'services',
    name: 'Fumigación residencial',
    subtitle: 'Control de insectos',
    description: 'Tratamiento preventivo para viviendas y espacios interiores.',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600',
    actionLabel: 'Ver servicio',
  },
  {
    id: 3,
    entity: 'technicians',
    name: 'Carlos Martínez',
    subtitle: 'Técnico de fumigación',
    description: 'Encargado de realizar inspecciones y servicios programados.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600',
    actionLabel: 'Ver técnico',
  },
  {
    id: 4,
    entity: 'products',
    name: 'Insecticida profesional',
    subtitle: 'Producto para control de plagas',
    description: 'Producto de uso profesional sujeto a las indicaciones de su etiqueta.',
    image: 'https://images.unsplash.com/photo-1603909223429-69bb7101f420?w=600',
    actionLabel: 'Ver producto',
  },
];
