export type WorkoutCreateInput = {
  userId: string;
  date: Date | string;
  type: string;
  title: string;
  description?: string;
  plannedDistance?: number;
  plannedDuration?: number;
  actualDistance?: number;
  actualDuration?: number;
  status?: string;
};

export type WorkoutUpdateInput = {
  date?: Date | string;
  type?: string;
  title?: string;
  description?: string;
  plannedDistance?: number;
  plannedDuration?: number;
  actualDistance?: number;
  actualDuration?: number;
  status?: string;
};
