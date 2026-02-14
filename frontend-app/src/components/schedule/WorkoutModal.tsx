import { X } from "lucide-react";

interface Props {
  onClose: () => void;
}

const WorkoutModal = ({ onClose }: Props) => {
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

        <div className="space-y-4">
          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Date
            </label>
            <input
              type="date"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Type
            </label>
            <select className="w-full border rounded-lg px-3 py-2">
              <option>Easy Run</option>
              <option>Long Run</option>
              <option>Interval / Fartlek</option>
              <option>Recovery</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              rows={4}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Warm-up...
10x (2' hard + 1' easy)
Cool-down"
            />
          </div>

          {/* Goals */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Distance (km)"
              className="border rounded-lg px-3 py-2"
            />
            <input
              type="number"
              placeholder="Time (min)"
              className="border rounded-lg px-3 py-2"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Status
            </label>
            <select className="w-full border rounded-lg px-3 py-2">
              <option>Pending</option>
              <option>Completed</option>
              <option>Skipped</option>
            </select>
          </div>

          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-medium mt-4">
            Save Workout
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutModal;
