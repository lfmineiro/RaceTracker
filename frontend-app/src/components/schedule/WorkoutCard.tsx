interface Props {
  type: string;
  distance?: number;
  time?: number;
  status: "Pending" | "Completed" | "Skipped";
}

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Completed: "bg-green-100 text-green-700",
  Skipped: "bg-red-100 text-red-700",
};

const WorkoutCard = ({ type, distance, time, status }: Props) => {
  return (
    <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-200 mb-3 cursor-pointer hover:shadow-md transition">
      <div className="font-medium text-slate-800 text-sm">{type}</div>

      <div className="text-xs text-slate-500 mt-1">
        {distance && `${distance}km`} {time && `| ${time}min`}
      </div>

      <span
        className={`mt-2 inline-block text-xs px-2 py-1 rounded-full ${statusColors[status]}`}
      >
        {status}
      </span>
    </div>
  );
};

export default WorkoutCard;
