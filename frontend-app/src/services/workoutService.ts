import axios from "axios";
import type { WorkoutCreateInput } from "../types/workout";

const API_URL = "http://localhost:3000/api/workouts"

export const WorkoutService = {
  getAll: async (): Promise<WorkoutCreateInput[]> => {
  const response = await axios.get(API_URL);
  return response.data
},

  create: async (data: WorkoutCreateInput) => {
    const response = await axios.post(API_URL, data);
    return response.data
  }
};



        