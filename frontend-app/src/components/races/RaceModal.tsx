import { useState } from "react";
import { Modal } from "../ui/Modal";
import { FormField } from "../ui/FormField";
import { FormSelect } from "../ui/FormSelect";
import { Button } from "../ui/Button";
import type { RaceCreateInput } from "../../types/race";
import { RaceService } from "../../services/raceService";
import { formatTimeToSeconds } from "../../utils/dateUtils";

interface Props {
  onClose: () => void;
  onSuccess?: () => void;
}

const RaceCreateModal = ({ onClose, onSuccess }: Props) => {
  const [raceData, setRaceData] = useState<RaceCreateInput>({
    name: "",
    date: "",
    distance: 0,
    priorityLevel: "B",
    goalTimeSeconds: undefined,
    resultTimeSeconds: undefined,
  });
  const [goalTimeInput, setGoalTimeInput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setRaceData((prev) => ({
      ...prev,
      [name]:
        name === "distance" || name === "goalTimeSeconds" || name === "resultTimeSeconds"
          ? value === "" ? undefined : Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const goalSeconds = formatTimeToSeconds(goalTimeInput);
      const finalData = {
        ...raceData,
        goalTimeSeconds: goalSeconds
      };

      await RaceService.create(finalData);

      if (onSuccess) {
        onSuccess();
      } else {
        onClose();
      }
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        const message =
          axiosError.response?.data?.message ||
          axiosError.message ||
          "Error creating race";
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
    <Modal isOpen={true} onClose={onClose} title="Create New Race">
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
          Create Race
        </Button>
      </form>
    </Modal>
  );
};

export default RaceCreateModal;
