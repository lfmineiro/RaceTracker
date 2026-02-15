import DayColumn from "./DayColumn";
import { useWeeklyWourkouts } from "../../hooks/useWeeklyWorkouts";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const WeeklyCalendar = () => {
  const { getWorkoutsForDay, loading } = useWeeklyWourkouts()


  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      {loading ? (
        <div className="text-center py-8 text-slate-500">Loading workouts...</div>
      ) : (
        <div className="grid grid-cols-7 gap-4">
          {days.map((day) => (
            <DayColumn key={day} day={day} workouts={getWorkoutsForDay(day)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WeeklyCalendar;
