import axios from 'axios'
import { X } from "lucide-react";
import { useState } from "react";
import type { WorkoutCreateInput } from '../../../types/workout'

interface Props {
  onClose: () => void;
}

const WorkoutModal = ({ onClose }: Props) => {

  const [workoutData, setWorkoutData] = useState<WorkoutCreateInput>({
    date: "",
    type: "Easy Run",
    title: "",
    description: "",
    plannedDistance: undefined,
    plannedDuration: undefined,
    actualDistance: undefined,
    actualDuration: undefined,
    status: "Pending",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setWorkoutData(prev => ({
      ...prev,
      [name]:
        name === "plannedDistance" || name === "plannedDuration" || name === "actualDistance" || name === "actualDuration"
          ? value === "" ? undefined : Number(value)
          : value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        ...workoutData,
        userId: "12345"
      };

      console.log("Enviando workout para backend:", payload);

      await axios.post("http://localhost:3000/api/workouts", payload);

      onClose();

    } catch (err: unknown) { 
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message || err.message || "Erro ao criar treino";
        setError(message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocorreu um erro desconhecido");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-700"
        >
          <X size={18} />
        </button>

        <h2 className="text-xl font-semibold mb-6">
          Create / Edit Workout
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              name="date"
              className="w-full border rounded-lg px-3 py-2"
              value={workoutData.date}
              onChange={handleChange}
              required
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              name="type"
              className="w-full border rounded-lg px-3 py-2"
              value={workoutData.type}
              onChange={handleChange}
              required
            >
              <option>Easy Run</option>
              <option>Long Run</option>
              <option>Interval</option>
              <option>Fartlek</option>
              <option>Recovery</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              className="w-full border rounded-lg px-3 py-2"
              value={workoutData.title}
              onChange={handleChange}
              placeholder="Race Title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              rows={4}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Warm-up...\n10x (2' hard + 1' easy)\nCool-down"
              value={workoutData.description}
              onChange={handleChange}
            />
          </div>

          {/* Goals */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="plannedDistance"
              placeholder="Distance (km)"
              className="border rounded-lg px-3 py-2"
              value={workoutData.plannedDistance ?? ""}
              onChange={handleChange}
              min={0}
            />
            <input
              type="number"
              name="plannedDuration"
              placeholder="Time (min)"
              className="border rounded-lg px-3 py-2"
              value={workoutData.plannedDuration ?? ""}
              onChange={handleChange}
              min={0}
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              className="w-full border rounded-lg px-3 py-2"
              value={workoutData.status}
              onChange={handleChange}
            >
              <option>Pending</option>
              <option>Completed</option>
              <option>Skipped</option>
            </select>
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-medium mt-4 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Workout"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WorkoutModal;
