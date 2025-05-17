/*===================================
ハンバーガーメニューのメニュー内容クリック後の画面に飛ぶようにするコンポーネント
====================================*/

'use client';
import Image from "next/image";

import { useNavigationContext } from '@/contexts/NavigationContext';
import TimeClock from '@/components/TimeClock';
import AttendanceRequests from '@/components/AttendanceRequests';
import ShiftManagement from '@/components/ShiftManagement';
import Dashboard from "@/components/DashBord";
import DBTests from "@/components/DBtests"

export default function Home() {
  const { activeTab } = useNavigationContext();
  
  const renderContent = () => {
    switch (activeTab) {
      case 'timeclock':
        return (
          <div className="space-y-8">
            <TimeClock />
            <div className="max-w-3/4 mx-auto px-4">
              <Dashboard />
            </div>
            <div className="max-w-3/4 mx-auto px-4">
            <DBTests />
            </div>
          </div>
        );
      case 'requests':
        return <AttendanceRequests />;
      case 'shifts':
        return <ShiftManagement />;
      // case 'reports':
        /*
        return (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">勤怠レポート</h2>
            <p className="text-gray-600">この機能は開発中です</p>
          </div>
        );
      case 'employees':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">従業員管理</h2>
            <p className="text-gray-600">この機能は開発中です</p>
          </div>
        );
        */
      case 'employees':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">設定</h2>
            <p className="text-gray-600">この機能は開発中です</p>
          </div>
        );
      default:
        return <TimeClock />;
    }
  };
  
  return (
    <div className="space-y-6">
      {renderContent()}
    </div>
  );
}