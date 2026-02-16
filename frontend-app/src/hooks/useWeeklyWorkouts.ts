import { useMemo } from "react"
import { useWorkouts } from "./useWorkouts"
import { useCurrentWeek } from "./useCurrentWeek"
import { getDayName, isDateInRange, parseISOToLocalDate } from "../utils/dateUtils"
import type { Workout } from "../types/workout"

export const useWeeklyWourkouts = () => {
  const { workouts, loading, error, refetch } = useWorkouts()
  const { startOfWeek, endOfWeek } = useCurrentWeek()
 

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