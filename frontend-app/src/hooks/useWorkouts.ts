import { useEffect, useState } from "react"
import { WorkoutService } from "../services/workoutService"
import type { WorkoutCreateInput } from "../types/workout"

export const useWorkouts = () => {
  const [workouts, setWorkouts] = useState<WorkoutCreateInput[]>([])
   const [loading, setLoading] = useState(true)

  useEffect(() => {
    WorkoutService.getAll()
    .then(setWorkouts)
    .finally(() => setLoading(false))
  }, [])

    return { workouts, loading }
}