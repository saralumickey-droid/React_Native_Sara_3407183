export type EntityType = 'clients' | 'services' | 'technicians' | 'products';

export interface DomainItem {
  id: number;
  entity: EntityType;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  actionLabel: string;
}
