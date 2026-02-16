import { Modal } from "../ui/Modal";
import { FormField } from "../ui/FormField";
import { FormSelect } from "../ui/FormSelect";
import { FormTextarea } from "../ui/FormTextarea";
import { Button } from "../ui/Button";
import type { Workout, WorkoutCreateInput } from '../../types/workout';
import { WorkoutService } from '../../services/workoutService';
import { useEntityForm } from '../../hooks/useEntityForm';
import { mergeEntityDataForEdit } from '../../utils/formUtils';

interface Props {
  workout?: Workout;
  onClose: () => void;
  onSuccess?: () => void;
}

const INITIAL_WORKOUT_DATA: WorkoutCreateInput = {
  date: "",
  type: "Easy Run",
  title: "",
  description: "",
  plannedDistance: undefined,
  plannedDuration: undefined,
  actualDistance: undefined,
  actualDuration: undefined,
  status: "Pending",
};

const NUMBER_FIELDS = ["plannedDistance", "plannedDuration", "actualDistance", "actualDuration"];

const WorkoutModal = ({ workout, onClose, onSuccess }: Props) => {
  const {
    formData: workoutData,
    loading,
    error,
    isEditing,
    handleNumberChange,
    handleSubmit,
  } = useEntityForm<WorkoutCreateInput, Workout>({
    initialData: INITIAL_WORKOUT_DATA,
    entity: workout,
    service: WorkoutService,
    onSuccess,
    onClose,
    prepareDataForEdit: (entity) => mergeEntityDataForEdit(INITIAL_WORKOUT_DATA, entity),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    handleNumberChange(e as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, NUMBER_FIELDS);
  };

  return (
    <Modal isOpen={true} onClose={onClose} title={isEditing ? "Edit Workout" : "Create Workout"}>
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
          {isEditing ? "Update Workout" : "Create Workout"}
        </Button>
      </form>
    </Modal>
  );
};

export default WorkoutModal;
