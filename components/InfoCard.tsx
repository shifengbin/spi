import React from 'react';

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  colorClass?: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, children, icon, colorClass = "bg-white" }) => {
  return (
    <div className={`${colorClass} rounded-xl p-6 shadow-sm border border-slate-200 transition hover:shadow-md`}>
      <div className="flex items-center gap-3 mb-3">
        {icon && <div className="text-slate-600">{icon}</div>}
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
      </div>
      <div className="text-slate-600 leading-relaxed text-sm">
        {children}
      </div>
    </div>
  );
};