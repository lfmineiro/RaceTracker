export const useCurrentWeek = () => {
  const today = new Date();
  const currentDay = today.getDay();
  
  const startOfWeek = new Date(today);
  const diffToMonday = currentDay === 0 ? -6 : 1 - currentDay;
  startOfWeek.setDate(today.getDate() + diffToMonday);
  startOfWeek.setHours(0, 0, 0, 0);
  
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  
  return { startOfWeek, endOfWeek };
};