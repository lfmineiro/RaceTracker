import type { Race, RaceCreateInput } from "../types/race";
import { api } from './api';

export const RaceService = {
  getAll: async (): Promise<Race[]> => {
    const response = await api.get('/races');
    return response.data;
  },

  create: async (data: RaceCreateInput): Promise<Race> => {
    const response = await api.post('/races', data);
    return response.data;
  },

  update: async (id: string, data: Partial<RaceCreateInput>): Promise<Race> => {
    const response = await api.put(`/races/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/races/${id}`);
  }
};