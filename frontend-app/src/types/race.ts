export type RacePriority = "A" | "B" | "C";

export type RaceStatus = "UPCOMING" | "COMPLETED";

export interface Race {
  id: string;
  title: string;
  date: string; 
  distance: number; 
  goalTime: string;
  actualTime?: string;
  priority: RacePriority;
  status: RaceStatus;
}
