import { Router } from "express";
import { createWorkout, getWorkouts } from "../controllers/workoutController.js";

const router = Router();

router.get('/workouts', getWorkouts);
router.post('/workouts', createWorkout);

export default router;