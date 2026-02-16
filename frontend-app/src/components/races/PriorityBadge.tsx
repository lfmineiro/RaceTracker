import { type RacePriority } from "../../types/race";

interface Props {
  priority: RacePriority;
}

const styles = {
  A: "bg-red-100 text-red-600",
  B: "bg-blue-100 text-blue-600",
  C: "bg-gray-100 text-gray-600",
};

const labels = {
  A: "Priority A - Target",
  B: "Priority B - Prep",
  C: "Priority C - Training",
};

const PriorityBadge = ({ priority }: Props) => {
  return (
    <span
      className={`inline-block mt-2 text-xs px-3 py-1 rounded-full font-medium ${styles[priority]}`}
    >
      {labels[priority]}
    </span>
  );
};

export default PriorityBadge;
