import { useState } from "react";
import { Plus } from "lucide-react";
import WeeklyCalendar from "../components/schedule/WeeklyCalendar";
import WorkoutModal from "../components/schedule/WorkoutModal";
import { useCurrentWeek } from "../hooks/useCurrentWeek";

const Schedule = () => {
  const [openModal, setOpenModal] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const {startOfWeek,endOfWeek} = useCurrentWeek()

  const handleWorkoutCreated = () => {
    setOpenModal(false);
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <main className="flex-1 bg-slate-100 min-h-screen p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            My Schedule - Week {startOfWeek.toLocaleDateString()} to {endOfWeek.toLocaleDateString()} 
          </h1>
          <p className="text-slate-500 mt-1">
            Plan and track your weekly training sessions
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-medium transition"
        >
          <Plus size={18} />
          New Workout
        </button>
      </div>

      <WeeklyCalendar refreshTrigger={refreshTrigger} />

      {openModal && (
        <WorkoutModal 
          onClose={() => setOpenModal(false)}
          onSuccess={handleWorkoutCreated}
        />
      )}
    </main>
  );
};

export default Schedule;
