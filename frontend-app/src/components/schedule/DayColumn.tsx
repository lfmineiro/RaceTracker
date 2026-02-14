import WorkoutCard from "./WorkoutCard";
import type { WorkoutCreateInput } from "../../types/workout";

interface Props {
  day: string;
  workouts: WorkoutCreateInput[];
}

const DayColumn = ({ day, workouts }: Props) => {
  return (
    <div className="bg-slate-50 rounded-xl p-3 min-h-[400px] border border-slate-200">
      <h3 className="text-xs font-semibold text-slate-500 uppercase mb-3 text-center">
        {day}
      </h3>

      {workouts.length === 0 ? (
        <p className="text-xs text-slate-400 text-center mt-4">No workouts</p>
      ) : (
        workouts.map((workout, index) => (
          <WorkoutCard
            key={index}
            type={workout.type}
            distance={workout.plannedDistance}
            time={workout.plannedDuration}
            status={(workout.status as "Pending" | "Completed" | "Skipped") || "Pending"}
          />
        ))
      )}
    </div>
  );
};

export default DayColumn;
