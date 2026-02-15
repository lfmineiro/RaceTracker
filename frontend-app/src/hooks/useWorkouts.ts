import { useEffect, useState, useCallback } from "react"
import { WorkoutService } from "../services/workoutService"
import type { WorkoutCreateInput } from "../types/workout"

export const useWorkouts = () => {
  const [workouts, setWorkouts] = useState<WorkoutCreateInput[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchWorkouts = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await WorkoutService.getAll()
      setWorkouts(data)
    } catch (err: unknown) {
      console.error('Error fetching workouts:', err)
      const errorMessage = err && typeof err === 'object' && 'response' in err
        ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
        : 'Failed to fetch workouts';
      setError(errorMessage || 'Failed to fetch workouts')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchWorkouts()
  }, [fetchWorkouts])

  return { workouts, loading, error, refetch: fetchWorkouts }
}