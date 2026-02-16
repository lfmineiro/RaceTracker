import { type Race } from "../../types/race";
import { formatDate, formatSecondsToTime } from "../../utils/dateUtils";
import PriorityBadge from "./PriorityBadge";

interface Props {
  race: Race;
}

const RaceCard = ({ race }: Props) => {
  const { day, month } = formatDate(race.date);
  const isUpcoming = new Date(race.date) >= new Date();

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex justify-between items-center">
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
    </div>
  );
};

export default RaceCard;
