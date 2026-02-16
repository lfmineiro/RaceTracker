export type RaceCreateInput = {
  userId?: string;
  name: string;
  date: Date | string;
  distance: number;
  priorityLevel: string;
  goalTimeSeconds?: number;
  resultTimeSeconds?: number;
};

export type RaceUpdateInput = {
  name?: string;
  date?: Date | string;
  distance?: number;
  priorityLevel?: string;
  goalTimeSeconds?: number;
  resultTimeSeconds?: number;
};
