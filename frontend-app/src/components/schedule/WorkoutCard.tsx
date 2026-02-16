import { Pencil, Trash2 } from "lucide-react";
import type { Workout } from "@prisma/client";

interface Props {
  workout: Workout;
  onEdit?: (workout: Workout) => void;
  onDelete?: (id: string) => void;
}

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Completed: "bg-green-100 text-green-700",
  Skipped: "bg-red-100 text-red-700",
};

const WorkoutCard = ({ workout, onEdit, onDelete }: Props) => {
  const status = (workout.status as "Pending" | "Completed" | "Skipped") || "Pending";

  return (
    <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-200 mb-3 hover:shadow-md transition group">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="font-medium text-slate-800 text-sm">{workout.type}</div>

          <div className="text-xs text-slate-500 mt-1">
            {workout.plannedDistance && `${workout.plannedDistance}km`} 
            {workout.plannedDuration && `${workout.plannedDistance ? ' | ' : ''}${workout.plannedDuration}min`}
          </div>

          <span
            className={`mt-2 inline-block text-xs px-2 py-1 rounded-full ${statusColors[status]}`}
          >
            {status}
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(workout);
              }}
              className="p-1.5 hover:bg-indigo-50 rounded-lg text-indigo-600 transition"
              title="Edit workout"
            >
              <Pencil size={14} />
            </button>
          )}
          {onDelete && workout.id && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                  onDelete(workout.id);
              }}
              className="p-1.5 hover:bg-red-50 rounded-lg text-red-600 transition"
              title="Delete workout"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
