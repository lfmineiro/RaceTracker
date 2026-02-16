import { useCallback } from "react"
import { WorkoutService } from "../services/workoutService"
import { useFetch } from "./useFetch";
import type { Workout } from "../types/workout";

export const useWorkouts = () => {

  const fetcher = useCallback(() => WorkoutService.getAll(), [])

  const { data: workouts, loading, error, refetch } = useFetch<Workout[]>(fetcher);

  return { workouts: workouts || [], 
    loading, 
    error, 
    refetch }
}