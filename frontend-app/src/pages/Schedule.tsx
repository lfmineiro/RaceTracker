import { useState } from "react";
import { Plus } from "lucide-react";
import WeeklyCalendar from "../components/schedule/WeeklyCalendar";
import WorkoutModal from "../components/schedule/WorkoutModal";

const Schedule = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <main className="flex-1 bg-slate-100 min-h-screen p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            My Schedule - Week 12 to 18 Feb
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

      <WeeklyCalendar />

      {openModal && <WorkoutModal onClose={() => setOpenModal(false)} />}
    </main>
  );
};

export default Schedule;
