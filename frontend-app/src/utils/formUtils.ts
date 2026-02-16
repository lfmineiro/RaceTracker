export function extractDateFromISO(isoDate: string): string {
  return isoDate.split('T')[0];
}

export function createNumberFieldHandler(fieldNames: string[]) {
  return (name: string, value: string): number | undefined | string => {
    if (!fieldNames.includes(name)) {
      return value;
    }
    return value === "" ? undefined : Number(value);
  };
}

export function mergeEntityDataForEdit<T>(
  initialData: T,
  entity: Partial<T>,
  dateFields: string[] = ['date']
): T {
  const merged = { ...initialData, ...entity } as Record<string, unknown>;
  
  dateFields.forEach(field => {
    const value = merged[field];
    if (value && typeof value === 'string' && value.includes('T')) {
      merged[field] = extractDateFromISO(value);
    }
  });
  
  return merged as T;
}
