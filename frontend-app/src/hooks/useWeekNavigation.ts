import { useState, useMemo, useCallback } from "react";
import { getWeekBounds } from "../utils/weekUtils";

export const useWeekNavigation = () => {
  const [weekOffset, setWeekOffset] = useState(0);

  const { startOfWeek, endOfWeek } = useMemo(() => {
    return getWeekBounds(new Date(), weekOffset);
  }, [weekOffset]);

  const goToPreviousWeek = useCallback(() => {
    setWeekOffset(prev => prev - 1);
  }, []);

  const goToNextWeek = useCallback(() => {
    setWeekOffset(prev => prev + 1);
  }, []);

  const goToCurrentWeek = useCallback(() => {
    setWeekOffset(0);
  }, []);

  const isViewingCurrentWeek = useMemo(() => {
    return weekOffset === 0;
  }, [weekOffset]);

  return {
    startOfWeek,
    endOfWeek,
    weekOffset,
    isViewingCurrentWeek,
    goToPreviousWeek,
    goToNextWeek,
    goToCurrentWeek,
  };
};
