import { Home, Calendar, Flag, Settings } from "lucide-react";
import React from "react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  active = false,
}) => {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all
      ${
        active
          ? "bg-indigo-600 text-white"
          : "text-slate-400 hover:bg-slate-800 hover:text-white"
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};

const Sidebar: React.FC = () => {
  return (
    <aside className="h-screen w-64 bg-slate-900 flex flex-col justify-between">
      <div>
        {/* Logo */}
        <div className="px-6 py-6 text-white text-xl font-bold border-b border-slate-800">
          RunTrack
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex flex-col gap-2 px-4">
          <SidebarItem icon={<Home size={18} />} label="Dashboard" active />
          <SidebarItem icon={<Calendar size={18} />} label="My Schedule" />
          <SidebarItem icon={<Flag size={18} />} label="Races & Goals" />
          <SidebarItem icon={<Settings size={18} />} label="Settings" />
        </nav>
      </div>

      {/* Bottom button */}
      <div className="p-4">
        <button className="w-full bg-orange-500 hover:bg-orange-600 transition-colors text-white py-2 rounded-xl font-medium">
          Connect Strava
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
