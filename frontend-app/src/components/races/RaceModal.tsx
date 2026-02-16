import { useState } from "react";
import { Modal } from "../ui/Modal";
import { FormField } from "../ui/FormField";
import { FormSelect } from "../ui/FormSelect";
import { Button } from "../ui/Button";
import type { Race, RaceCreateInput } from "../../types/race";
import { RaceService } from "../../services/raceService";
import { formatTimeToSeconds, formatSecondsToTime } from "../../utils/dateUtils";
import { useEntityForm } from "../../hooks/useEntityForm";
import { mergeEntityDataForEdit } from "../../utils/formUtils";

interface Props {
  race?: Race | null;
  onClose: () => void;
  onSuccess?: () => void;
}

const INITIAL_RACE_DATA: RaceCreateInput = {
  name: "",
  date: "",
  distance: 0,
  priorityLevel: "B",
  goalTimeSeconds: undefined,
  resultTimeSeconds: undefined,
};

const NUMBER_FIELDS = ["distance", "goalTimeSeconds", "resultTimeSeconds"];

const RaceCreateModal = ({ race, onClose, onSuccess }: Props) => {
  const [goalTimeInput, setGoalTimeInput] = useState<string>("");

  const {
    formData: raceData,
    loading,
    error,
    isEditing,
    handleNumberChange,
    handleSubmit: handleFormSubmit,
  } = useEntityForm<RaceCreateInput, Race>({
    initialData: INITIAL_RACE_DATA,
    entity: race,
    service: RaceService,
    onSuccess,
    onClose,
    prepareDataForEdit: (entity) => {
      // Update goal time input for display
      if (entity.goalTimeSeconds) {
        setGoalTimeInput(formatSecondsToTime(entity.goalTimeSeconds));
      }
      return mergeEntityDataForEdit(INITIAL_RACE_DATA, entity);
    },
    prepareDataForSubmit: (data) => ({
      ...data,
      goalTimeSeconds: formatTimeToSeconds(goalTimeInput),
    }),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    handleNumberChange(e, NUMBER_FIELDS);
  };

  const handleSubmit = (e: React.FormEvent) => {
    handleFormSubmit(e);
  };

  return (
    <Modal isOpen={true} onClose={onClose} title={isEditing ? "Edit Race" : "Create New Race"}>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <FormField
          label="Race Name"
          name="name"
          type="text"
          placeholder="e.g., São Paulo Marathon 2026"
          value={raceData.name}
          onChange={handleChange}
          required
        />

        <FormField
          label="Date"
          name="date"
          type="date"
          value={raceData.date}
          onChange={handleChange}
          required
        />

        <FormField
          label="Distance (meters)"
          name="distance"
          type="number"
          placeholder="e.g., 42195 for marathon"
          value={raceData.distance || ""}
          onChange={handleChange}
          min={0}
          required
        />

        <FormSelect
          label="Priority Level"
          name="priorityLevel"
          value={raceData.priorityLevel}
          onChange={handleChange}
          required
        >
          <option value="A">A - Main Goal</option>
          <option value="B">B - Important</option>
          <option value="C">C - Training Race</option>
        </FormSelect>

        <FormField
          label="Goal Time (HH:MM:SS)"
          name="goalTime"
          type="text"
          placeholder="e.g., 3:30:00 or 1:45:30"
          value={goalTimeInput}
          onChange={(e) => setGoalTimeInput(e.target.value)}
        />

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
          {isEditing ? "Update Race" : "Create Race"}
        </Button>
      </form>
    </Modal>
  );
};

export default RaceCreateModal;
