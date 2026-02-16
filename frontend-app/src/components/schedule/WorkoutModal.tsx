import { useState } from "react";
import { Modal } from "../ui/Modal";
import { FormField } from "../ui/FormField";
import { FormSelect } from "../ui/FormSelect";
import { FormTextarea } from "../ui/FormTextarea";
import { Button } from "../ui/Button";
import type { WorkoutCreateInput } from '../../types/workout';
import { WorkoutService } from '../../services/workoutService';

interface Props {
  onClose: () => void;
  onSuccess?: () => void;
}

const WorkoutModal = ({ onClose, onSuccess }: Props) => {
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
      await WorkoutService.create(workoutData);

      if (onSuccess) {
        onSuccess();
      } else {
        onClose();
      }
    } catch (err: unknown) { 
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosError = err as { response?: { data?: { message?: string } }; message?: string };
        const message = axiosError.response?.data?.message || axiosError.message || "Error creating workout";
        setError(message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Create / Edit Workout">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <FormField
          label="Date"
          name="date"
          type="date"
          value={workoutData.date}
          onChange={handleChange}
          required
        />

        <FormSelect
          label="Type"
          name="type"
          value={workoutData.type}
          onChange={handleChange}
          required
        >
          <option>Easy Run</option>
          <option>Long Run</option>
          <option>Interval</option>
          <option>Fartlek</option>
          <option>Recovery</option>
        </FormSelect>

        <FormField
          label="Title"
          name="title"
          type="text"
          placeholder="Workout Title"
          value={workoutData.title}
          onChange={handleChange}
        />

        <FormTextarea
          label="Description"
          name="description"
          rows={4}
          placeholder="Warm-up...\n10x (2' hard + 1' easy)\nCool-down"
          value={workoutData.description}
          onChange={handleChange}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Distance (km)"
            name="plannedDistance"
            type="number"
            placeholder="Distance"
            value={workoutData.plannedDistance ?? ""}
            onChange={handleChange}
            min={0}
          />
          <FormField
            label="Time (min)"
            name="plannedDuration"
            type="number"
            placeholder="Duration"
            value={workoutData.plannedDuration ?? ""}
            onChange={handleChange}
            min={0}
          />
        </div>

        <FormSelect
          label="Status"
          name="status"
          value={workoutData.status}
          onChange={handleChange}
        >
          <option>Pending</option>
          <option>Completed</option>
          <option>Skipped</option>
        </FormSelect>

        {error && (
          <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
            {error}
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={loading}
          className="w-full"
        >
          Save Workout
        </Button>
      </form>
    </Modal>
  );
};

export default WorkoutModal;
