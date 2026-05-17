import { Heart, Activity, Users, ShieldAlert, LayoutDashboard, Brain, BarChart3, Settings as SettingsIcon } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'predict', label: 'Risk Analysis', icon: Brain },
    { id: 'insights', label: 'Clinical Data', icon: BarChart3 },
    { id: 'settings', label: 'System', icon: SettingsIcon },
  ];

  return (
    <aside className="w-64 border-r border-outline-variant bg-surface-container-low flex flex-col h-screen fixed left-0 top-0 z-20">
      <div className="p-8 flex flex-col gap-6 border-b border-outline-variant">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary-clinical flex items-center justify-center">
            <Heart className="text-white w-5 h-5" fill="currentColor" />
          </div>
          <h1 className="text-xl font-bold tracking-tighter">HEARTFLOW</h1>
        </div>
        <div className="text-[9px] uppercase tracking-[0.3em] opacity-40 font-bold border-l border-primary-clinical pl-3">
          Exhibition No. 042<br/>Clinical Series
        </div>
      </div>

      <nav className="flex-1 p-4 flex flex-col gap-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-medical transition-all group",
              activeTab === item.id 
                ? "bg-primary-clinical text-white" 
                : "text-on-surface-variant hover:bg-surface-container"
            )}
          >
            <item.icon className={cn("w-5 h-5", activeTab === item.id ? "text-white" : "text-outline group-hover:text-primary-clinical")} />
            <span className="font-semibold text-sm">{item.label}</span>
            {activeTab === item.id && (
              <motion.div layoutId="active" className="ml-auto w-1 h-4 bg-white rounded-full" />
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-outline-variant">
        <div className="bg-surface-container-high p-4 rounded-medical border border-outline-variant">
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert className="w-4 h-4 text-status-critical" />
            <span className="label-caps text-on-surface">Emergency Ready</span>
          </div>
          <p className="text-[11px] text-on-surface-variant leading-relaxed">
            Clinical protocols are synced with hospital emergency triage.
          </p>
        </div>
      </div>
    </aside>
  );
};
