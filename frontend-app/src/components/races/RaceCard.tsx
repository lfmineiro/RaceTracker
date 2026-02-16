import { Pencil, Trash2 } from "lucide-react";
import { type Race } from "../../types/race";
import { formatDate, formatSecondsToTime } from "../../utils/dateUtils";
import PriorityBadge from "./PriorityBadge";

interface Props {
  race: Race;
  onEdit?: (race: Race) => void;
  onDelete?: (id: string) => void;
}

const RaceCard = ({ race, onEdit, onDelete }: Props) => {
  const { day, month } = formatDate(race.date);
  const isUpcoming = new Date(race.date) >= new Date();

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex justify-between items-center group hover:shadow-md transition">
      {/* Left */}
      <div className="flex items-center gap-6">
        <div className="bg-slate-100 w-20 h-20 rounded-xl flex flex-col justify-center items-center font-semibold text-slate-700">
          <span className="text-xl">{day}</span>
          <span className="text-sm">{month}</span>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-800">
            {race.name}
          </h3>

          <p className="text-slate-500 text-sm">
            Distance: {race.distance} km
          </p>

          <PriorityBadge priority={race.priorityLevel} />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="font-medium text-slate-700">
            Goal Time: {formatSecondsToTime(race.goalTimeSeconds)}
          </p>

          {isUpcoming && (
            <p className="text-slate-400 text-sm">Result: Pending</p>
          )}

          {!isUpcoming && race.resultTimeSeconds && (
            <p className="text-green-600 text-sm font-medium">
              ✓ Official Result: {formatSecondsToTime(race.resultTimeSeconds)}
            </p>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {onEdit && (
            <button
              onClick={() => onEdit(race)}
              className="p-2 hover:bg-indigo-50 rounded-lg text-indigo-600 transition"
              title="Edit race"
            >
              <Pencil size={18} />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => {
                  onDelete(race.id);
                
              }}
              className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition"
              title="Delete race"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RaceCard;
