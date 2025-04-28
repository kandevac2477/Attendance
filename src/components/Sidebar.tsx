'use client';

import React from 'react';
import { 
  Clock, 
  Calendar, 
  FileText, 
  Settings, 
  Users, 
  BarChart2,
  Briefcase
} from 'lucide-react';
import { useNavigationContext } from '@/contexts/NavigationContext';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive = false, onClick }) => {
  return (
    <li>
      <button
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
          isActive 
            ? 'bg-gray-900 text-white' 
            : 'text-gray-700 hover:bg-gray-100'
        }`}
        onClick={onClick}
      >
        {icon}
        <span className="font-medium">{label}</span>
      </button>
    </li>
  );
};

const Sidebar: React.FC = () => {
  const { isOpen, activeTab, setActiveTab } = useNavigationContext();
  
  return (
    <aside 
      className={`fixed z-20 h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${
        isOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full'
      }`}
    >
      <div className="h-16 border-b border-gray-200 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Briefcase size={22} className="text-gray-900" />
          <h2 className="text-lg font-semibold text-gray-900">勤怠システム</h2>
        </div>
      </div>
      
      <nav className="mt-6">
        <ul className="space-y-1 px-2">
          <NavItem 
            icon={<Clock size={20} />} 
            label="打刻" 
            isActive={activeTab === 'timeclock'} 
            onClick={() => setActiveTab('timeclock')}
          />
          <NavItem 
            icon={<FileText size={20} />} 
            label="勤怠修正・申請" 
            isActive={activeTab === 'requests'} 
            onClick={() => setActiveTab('requests')}
          />
          <NavItem 
            icon={<Calendar size={20} />} 
            label="シフト管理" 
            isActive={activeTab === 'shifts'} 
            onClick={() => setActiveTab('shifts')}
          />
          <NavItem 
            icon={<BarChart2 size={20} />} 
            label="勤怠レポート" 
            isActive={activeTab === 'reports'} 
            onClick={() => setActiveTab('reports')}
          />
          <NavItem 
            icon={<Users size={20} />} 
            label="従業員" 
            isActive={activeTab === 'employees'} 
            onClick={() => setActiveTab('employees')}
          />
          <NavItem 
            icon={<Settings size={20} />} 
            label="設定" 
            isActive={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')}
          />
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;