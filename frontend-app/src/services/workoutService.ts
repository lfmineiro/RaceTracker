import type { Workout, WorkoutCreateInput } from "../types/workout";
import { api } from './api';

export const WorkoutService = {
  getAll: async (): Promise<Workout[]> => {
    const response = await api.get('/workouts');
    return response.data;
  },

  create: async (data: WorkoutCreateInput): Promise<Workout> => {
    const response = await api.post('/workouts', data);
    return response.data;
  },

  update: async (id: string, data: Partial<WorkoutCreateInput>): Promise<Workout> => {
    const response = await api.put(`/workouts/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/workouts/${id}`);
  }
};



        