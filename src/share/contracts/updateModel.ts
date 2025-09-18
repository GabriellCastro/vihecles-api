export type UpdateModel<T> = Omit<Partial<T>, 'createdAt' | 'updatedAt' | 'id'>;
