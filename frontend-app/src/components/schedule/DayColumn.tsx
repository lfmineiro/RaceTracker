import WorkoutCard from "./WorkoutCard";

interface Props {
  day: string;
}

const DayColumn = ({ day }: Props) => {
  return (
    <div className="bg-slate-50 rounded-xl p-3 min-h-[400px] border border-slate-200">
      <h3 className="text-xs font-semibold text-slate-500 uppercase mb-3 text-center">
        {day}
      </h3>

      {/* Example Workout */}
      <WorkoutCard
        type="Fartlek"
        distance={8}
        time={40}
        status="Pending"
      />
    </div>
  );
};

export default DayColumn;
