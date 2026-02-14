import { useEffect, useState } from "react";
import DayColumn from "./DayColumn";
import type { WorkoutCreateInput } from "../../types/workout";
import { useCurrentWeek } from "../../hooks/useCurrentWeek";

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
  const [workouts, setWorkouts] = useState<WorkoutCreateInput[]>([]);
  const [loading, setLoading] = useState(true);
  const {startOfWeek, endOfWeek} = useCurrentWeek();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/workouts");
        const data = await response.json();
        setWorkouts(data);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const getWorkoutsOnActualWeek = () => {
    return workouts.filter((workout) => {
      const dateStr = workout.date.split('T')[0]; 
      const [year, month, day] = dateStr.split('-').map(Number);
      const workoutDate = new Date(year, month - 1, day); 
      workoutDate.setHours(0, 0, 0, 0);
      return workoutDate >= startOfWeek && workoutDate <= endOfWeek;
    });
  };

  const getWorkoutsForDay = (dayName: string, weekWorkouts: WorkoutCreateInput[]) => {
    return weekWorkouts.filter((workout) => {
      console.log(workout.date)
      const dateStr = workout.date.split('T')[0]; 
      const [year, month, day] = dateStr.split('-').map(Number);
      const workoutDate = new Date(year, month - 1, day); 
      const workoutDay = workoutDate.toLocaleDateString("en-US", { weekday: "long" });
      return workoutDay === dayName;
    });
  };

  const currentWeekWorkouts = getWorkoutsOnActualWeek();
  // console.log(currentWeekWorkouts)

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      {loading ? (
        <div className="text-center py-8 text-slate-500">Loading workouts...</div>
      ) : (
        <div className="grid grid-cols-7 gap-4">
          {days.map((day) => (
            <DayColumn key={day} day={day} workouts={getWorkoutsForDay(day, currentWeekWorkouts)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WeeklyCalendar;
