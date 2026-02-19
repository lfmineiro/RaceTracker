import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { formatWeekRange } from "../../utils/weekUtils";

interface Props {
  startDate: Date;
  endDate: Date;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
  isCurrentWeek: boolean;
}

const WeekNavigator = ({
  startDate,
  endDate,
  onPrevious,
  onNext,
  onToday,
  isCurrentWeek,
}: Props) => {
  return (
    <div className="flex items-center justify-between mb-6 bg-white rounded-xl shadow-sm border border-slate-200 p-4">
      {/* Previous Week Button */}
      <button
        onClick={onPrevious}
        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-100 text-slate-700 font-medium transition"
        title="Previous week"
      >
        <ChevronLeft size={20} />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Week Range Display */}
      <div className="flex items-center gap-3">
        <div className="text-center">
          <div className="text-lg font-semibold text-slate-800">
            {formatWeekRange(startDate, endDate)}
          </div>
          {!isCurrentWeek && (
            <div className="text-xs text-slate-500 mt-1">
              {startDate < new Date() ? "Past week" : "Future week"}
            </div>
          )}
          {isCurrentWeek && (
            <div className="text-xs text-indigo-600 font-medium mt-1">
              Current Week
            </div>
          )}
        </div>

        {/* Today Button (only show when not viewing current week) */}
        {!isCurrentWeek && (
          <button
            onClick={onToday}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium transition text-sm"
            title="Go to current week"
          >
            <Calendar size={16} />
            <span className="hidden sm:inline">Today</span>
          </button>
        )}
      </div>

      {/* Next Week Button */}
      <button
        onClick={onNext}
        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-100 text-slate-700 font-medium transition"
        title="Next week"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default WeekNavigator;
