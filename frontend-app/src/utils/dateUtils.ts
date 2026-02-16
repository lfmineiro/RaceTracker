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

export const formatDate = (dateString: string) => {
  const [year, month, day] = dateString.split('T')[0].split('-').map(Number);
  const date = new Date(year, month - 1, day);
  
  return {
    day: date.getDate(),
    month: date.toLocaleString("en-US", { month: "short" }).toUpperCase(),
  };
};

export const formatSecondsToTime = (seconds?: number): string => {
  if (!seconds) return "Not set";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map(v => v.toString().padStart(2, "0")).join(":");
};

 export const formatTimeToSeconds = (timeString: string) => {
    const parts = timeString.split(":");
    if (parts.length !== 3) return undefined;
    const [hours, minutes, seconds] = parts.map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };