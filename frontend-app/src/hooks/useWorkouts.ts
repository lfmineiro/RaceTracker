import { useCallback } from "react"
import { WorkoutService } from "../services/workoutService"
import { useFetch } from "./useFetch";

export const useWorkouts = () => {

  const fetcher = useCallback(() => WorkoutService.getAll(), [])

  const { data: workouts, loading, error, refetch } = useFetch(fetcher);

  return { workouts: workouts || [], 
    loading, 
    error, 
    refetch }
}