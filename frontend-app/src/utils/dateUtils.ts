export const parseISOToLocalDate = (dateInput: string | Date): Date => {
  if (dateInput instanceof Date) return new Date(dateInput.setHours(0, 0, 0, 0));
  const dateStr = dateInput.toString().split('T')[0];
  const [year, month, day] = dateStr.split('-').map(Number);
  const localDate = new Date(year, month - 1, day);
  localDate.setHours(0, 0, 0, 0);
  
  return localDate;
};

export const getDayName = (date: Date): string => {
  return date.toLocaleDateString("en-US", { weekday: "long" });
};

export const isDateInRange = (date: Date, start: Date, end: Date): boolean => {
  const target = new Date(date).setHours(0,0,0,0);
  const s = new Date(start).setHours(0,0,0,0);
  const e = new Date(end).setHours(0,0,0,0);

  return target >= s && target <= e;
};