export type WorkoutCreateInput = {
  date: string;
  type: string;
  title: string;
  description?: string;
  plannedDistance?: number;
  plannedDuration?: number;
  actualDistance?: number;
  actualDuration?: number;
  status?: string;
};