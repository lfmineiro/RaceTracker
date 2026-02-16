import { useState } from "react";
import { Plus } from "lucide-react";
import WeeklyCalendar from "../components/schedule/WeeklyCalendar";
import WorkoutModal from "../components/schedule/WorkoutModal";
import { useCurrentWeek } from "../hooks/useCurrentWeek";
import { WorkoutService } from "../services/workoutService";
import type { Workout } from "../types/workout";

const Schedule = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const {startOfWeek,endOfWeek} = useCurrentWeek()

  const handleWorkoutCreated = () => {
    setOpenModal(false);
    setEditingWorkout(null);
    setRefreshTrigger(prev => prev + 1);
  };

  const handleEditWorkout = (workout: Workout) => {
    setEditingWorkout(workout);
    setOpenModal(true);
  };

  const handleDeleteWorkout = async (id: string) => {
    try {
      await WorkoutService.delete(id);
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error('Error deleting workout:', error);
      alert('Failed to delete workout');
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingWorkout(null);
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

      <WeeklyCalendar 
        refreshTrigger={refreshTrigger}
        onEditWorkout={handleEditWorkout}
        onDeleteWorkout={handleDeleteWorkout}
      />

      {openModal && (
        <WorkoutModal 
          workout={editingWorkout || undefined}
          onClose={handleCloseModal}
          onSuccess={handleWorkoutCreated}
        />
      )}
    </main>
  );
};

export default Schedule;
