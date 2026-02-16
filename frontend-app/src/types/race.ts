export type RacePriority = "A" | "B" | "C";

export interface RaceCreateInput {
  name: string;
  date: string;
  distance: number;
  priorityLevel: RacePriority;
  goalTimeSeconds?: number;
  resultTimeSeconds?: number;
}

export interface Race extends RaceCreateInput {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
