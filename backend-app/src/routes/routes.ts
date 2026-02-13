import { Router } from "express";
import { createWorkout, getWorkouts } from "../controllers/workoutController.js";
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../controllers/userController.js";

const router = Router();

router.get('/workouts', getWorkouts);
router.post('/workouts', createWorkout);

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;