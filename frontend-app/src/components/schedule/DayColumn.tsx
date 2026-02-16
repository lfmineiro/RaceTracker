import WorkoutCard from "./WorkoutCard";
import type { Workout } from "../../types/workout";

interface Props {
  day: string;
  workouts: Workout[];
  onEditWorkout?: (workout: Workout) => void;
  onDeleteWorkout?: (id: string) => void;
}

const DayColumn = ({ day, workouts, onEditWorkout, onDeleteWorkout }: Props) => {
  return (
    <div className="bg-slate-50 rounded-xl p-3 min-h-[400px] border border-slate-200">
      <h3 className="text-xs font-semibold text-slate-500 uppercase mb-3 text-center">
        {day}
      </h3>

      {workouts.length === 0 ? (
        <p className="text-xs text-slate-400 text-center mt-4">No workouts</p>
      ) : (
        workouts.map((workout) => (
          <WorkoutCard
            key={workout.id || `${workout.date}-${workout.type}`}
            workout={workout}
            onEdit={onEditWorkout}
            onDelete={onDeleteWorkout}
          />
        ))
      )}
    </div>
  );
};

export default DayColumn;
