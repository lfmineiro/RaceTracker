import React from "react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  extra?: string;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  extra,
  icon,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="text-slate-500 text-sm font-medium">{title}</div>
        <div className="p-2 rounded-lg bg-slate-100">{icon}</div>
      </div>

      <div className="text-2xl font-bold text-slate-800">{value}</div>

      {subtitle && (
        <div className="text-sm text-slate-500">{subtitle}</div>
      )}

      {extra && <div className="text-xs text-slate-400">{extra}</div>}
    </div>
  );
};

export default StatCard;
