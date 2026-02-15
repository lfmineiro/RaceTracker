import type { WorkoutCreateInput } from "../types/workout";
import { api } from './api';

export const WorkoutService = {
  getAll: async (): Promise<WorkoutCreateInput[]> => {
    const response = await api.get('/workouts');
    return response.data;
  },

  create: async (data: WorkoutCreateInput) => {
    const response = await api.post('/workouts', data);
    return response.data;
  }
};



        