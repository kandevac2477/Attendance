/*===================================
ハンバーガーメニューの表示のコンポーネント
====================================*/

'use client';

import React from 'react';
import { 
    Clock, 
    Calendar, 
    FileText, 
    Settings, 
    Briefcase
} from 'lucide-react';
import { useNavigationContext } from '@/contexts/NavigationContext';
import { useRouter } from 'next/navigation';

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
    const router = useRouter();
  
    return (
        <aside 
            className={`fixed left-0 top-0 z-20 h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${
                isOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full'
            }`}
            style={{
                transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
                width: isOpen ? '256px' : '0px',
                visibility: isOpen ? 'visible' : 'hidden',
                pointerEvents: isOpen ? 'auto' : 'none',
                display: isOpen ? 'block' : 'none',
                position: 'fixed',
                left: '0',
                top: '0',
                height: '100vh',
                backgroundColor: isOpen ? 'white' : 'transparent',
                borderRight: isOpen ? '1px solid #e5e7eb' : 'none',
                zIndex: 20
            }}
        >
            <div className={`h-16 border-b border-gray-200 flex items-center justify-center transition-opacity duration-300 ${
                isOpen ? 'opacity-100' : 'opacity-0'
            }`}>
                <div className="flex items-center space-x-2">
                    <Briefcase size={22} className="text-gray-900" />
                    <h2 className="text-lg font-semibold text-gray-900">勤怠システム</h2>
                </div>
            </div>
      
            <nav className={`mt-6 transition-opacity duration-300 ${
                isOpen ? 'opacity-100' : 'opacity-0'
            }`}>
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
                        onClick={() => {
                            setActiveTab('requests');
                            router.push('/request');
                        }}
                    />
                    <NavItem 
                        icon={<Calendar size={20} />} 
                        label="シフト管理" 
                        isActive={activeTab === 'shifts'} 
                        onClick={() => {setActiveTab('shifts');
                            router.push('/shift');
                        }}
                    />
                    {/*  
            <NavItem 
            icon={<BarChart2 size={20} />} 
            label="勤怠レポート(ホーム画面に移動)" 
            isActive={activeTab === 'reports'} 
            onClick={() => setActiveTab('reports')}
          />
          <NavItem 
            icon={<Users size={20} />} 
            label="従業員" 
            isActive={activeTab === 'employees'} 
            onClick={() => setActiveTab('employees')}
          />
          */}
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