import { Router } from "express";
import { createWorkout, deleteWorkout, getWorkouts, updateWorkout } from "../controllers/workoutController.js";
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../controllers/userController.js";
import { createRace, deleteRace, getRaces, updateRace } from "../controllers/raceController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// Workout routes (protected)
router.get('/workouts', authMiddleware, getWorkouts);
router.post('/workouts', authMiddleware, createWorkout);
router.put('/workouts/:id', authMiddleware, updateWorkout);
router.delete('/workouts/:id', authMiddleware, deleteWorkout);

// Race routes (protected)
router.get('/races', authMiddleware, getRaces);
router.post('/races', authMiddleware, createRace);
router.put('/races/:id', authMiddleware, updateRace);
router.delete('/races/:id', authMiddleware, deleteRace);

// User routes (public for now)
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;