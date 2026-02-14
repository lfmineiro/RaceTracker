import StatCard from "../components/StatCard";
import {
  Map,
  Activity,
  Flag,
  Zap,
} from "lucide-react";

const Dashboard = () => {
  return (
      <main className="flex-1 mr-10">
          <div className="m-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Dashboard
            </h1>
            <p className="text-slate-500 mt-1">
              Good morning, Mineiro. Phase:{" "}
              <span className="text-indigo-600 font-medium">
                Base Building
              </span>{" "}
              (Week 4/12)
            </p>
          </div>

          <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
            M
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Volume"
            value="32km / 50km"
            subtitle="64% of weekly goal"
            icon={<Map size={18} />}
          />

          <StatCard
            title="Workouts"
            value="3 / 5"
            subtitle="2 remaining this week"
            icon={<Activity size={18} />}
          />

          <StatCard
            title="Next Race"
            value="18 Days"
            subtitle="Army Run (5km) - Priority A"
            icon={<Flag size={18} />}
          />

          <StatCard
            title="Training Load"
            value="Moderate"
            subtitle="Accumulated Fatigue: Low"
            icon={<Zap size={18} />}
          />
        </div>

        {/* Charts Section Placeholder */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h2 className="font-semibold text-slate-700 mb-4">
              Distance: Planned vs Actual
            </h2>
            <div className="h-40 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 text-sm">
              Chart Placeholder
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h2 className="font-semibold text-slate-700 mb-4">
              Intensity Breakdown
            </h2>
            <div className="h-40 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 text-sm">
              Chart Placeholder
            </div>
          </div>
        </div>

        {/* Upcoming Workouts */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800 mb-6">
            Upcoming Workouts
          </h2>

          <div className="flex flex-col gap-4">
            <WorkoutCard
              day="Tomorrow"
              title="Fartlek: 3' Hard / 2' Easy"
              details="8km | Pace 4:00"
              status="Planned"
            />

            <WorkoutCard
              day="Saturday"
              title="Strength & Calisthenics"
              details="45 min"
              status="Planned"
            />

            <WorkoutCard
              day="Sunday"
              title="Long Run - Zone 2"
              details="15km | Pace 5:10"
              status="Pending"
            />
          </div>
        </div>
      </main>
  );
};

interface WorkoutCardProps {
  day: string;
  title: string;
  details: string;
  status: string;
}

const WorkoutCard = ({
  day,
  title,
  details,
  status,
}: WorkoutCardProps) => {
  return (
    <div className="flex justify-between items-center bg-slate-50 rounded-xl p-4 border border-slate-200">
      <div>
        <div className="text-xs text-indigo-600 font-semibold uppercase">
          {day}
        </div>
        <div className="font-medium text-slate-800">
          {title}
        </div>
        <div className="text-sm text-slate-500">
          {details}
        </div>
      </div>

      <span className="text-xs bg-slate-200 px-3 py-1 rounded-full text-slate-600 font-medium">
        {status}
      </span>
    </div>
  );
};

export default Dashboard;
