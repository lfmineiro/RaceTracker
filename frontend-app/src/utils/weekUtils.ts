export const getWeekBounds = (referenceDate: Date = new Date(), weekOffset: number = 0) => {
  const adjustedDate = new Date(referenceDate);
  adjustedDate.setDate(referenceDate.getDate() + (weekOffset * 7));
  
  const currentDay = adjustedDate.getDay();
  
  const startOfWeek = new Date(adjustedDate);
  const diffToMonday = currentDay === 0 ? -6 : 1 - currentDay;
  startOfWeek.setDate(adjustedDate.getDate() + diffToMonday);
  startOfWeek.setHours(0, 0, 0, 0);
  
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  
  return { startOfWeek, endOfWeek };
};

export const isCurrentWeek = (date: Date): boolean => {
  const { startOfWeek, endOfWeek } = getWeekBounds();
  const timestamp = date.getTime();
  return timestamp >= startOfWeek.getTime() && timestamp <= endOfWeek.getTime();
};

export const formatWeekRange = (
  startDate: Date, 
  endDate: Date, 
  locale: string = 'en-US'
): string => {
  const options: Intl.DateTimeFormatOptions = { 
    month: 'short', 
    day: 'numeric' 
  };
  
  const startStr = startDate.toLocaleDateString(locale, options);
  const endStr = endDate.toLocaleDateString(locale, options);
  const year = endDate.getFullYear();
  
  return `${startStr} - ${endStr}, ${year}`;
};
