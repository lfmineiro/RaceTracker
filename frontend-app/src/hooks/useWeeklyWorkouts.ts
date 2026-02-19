import { useMemo } from "react"
import { useWorkouts } from "./useWorkouts"
import { getDayName, isDateInRange, parseISOToLocalDate } from "../utils/dateUtils"
import type { Workout } from "../types/workout"

interface UseWeeklyWorkoutsProps {
  startOfWeek: Date;
  endOfWeek: Date;
}

export const useWeeklyWourkouts = ({ startOfWeek, endOfWeek }: UseWeeklyWorkoutsProps) => {
  const { workouts, loading, error, refetch } = useWorkouts()

  const currentWorkouts = useMemo(() => {
    return workouts.filter((workout) => {
      const workoutDate = parseISOToLocalDate(workout.date); 
      return isDateInRange(workoutDate, startOfWeek, endOfWeek);
    })
  }, [workouts, startOfWeek, endOfWeek])

  const getWorkoutsForDay = (dayName: string): Workout[] => {
    return currentWorkouts.filter((workout) => {
      const workoutDate = parseISOToLocalDate(workout.date)
      return getDayName(workoutDate) === dayName 
    })
  }

  return { currentWorkouts, getWorkoutsForDay, loading, error, refetch }
}