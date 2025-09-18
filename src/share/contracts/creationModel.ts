export type CreationModel<T> = Omit<T, 'createdAt' | 'updatedAt' | 'id'>;
