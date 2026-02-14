import DayColumn from "./DayColumn";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const WeeklyCalendar = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="grid grid-cols-7 gap-4">
        {days.map((day) => (
          <DayColumn key={day} day={day} />
        ))}
      </div>
    </div>
  );
};

export default WeeklyCalendar;
