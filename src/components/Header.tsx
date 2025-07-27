/*=======================================
 ヘッダーのコンポーネント
=======================================*/

'use client';

import React from 'react';
import { Clock, Menu, Bell, User } from 'lucide-react';
import { useNavigationContext } from '@/contexts/NavigationContext';
import { useRouter } from 'next/navigation'; // next/navigation から useRouter をインポート
import Link from 'next/link'


const Header: React.FC = () => {
  const { toggleSidebar } = useNavigationContext();

  const router = useRouter(); // useRouterフックを使用
  const handleButtonClick = () => {
    // クリック時に/dashboardに遷移
    router.push('/');
};
  
  return (
    <header className="bg-white border-b border-gray-200 fixed w-full z-10">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} className="text-gray-700" />
          </button>
          <div className="flex items-center">
            <Clock size={22} className="text-gray-900 mr-2" />
            <Link href = '/'>
            <h1 className="text-xl font-semibold text-gray-900" onClick={handleButtonClick}>
              勤怠管理システム
            </h1>
            </Link>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
            <Bell size={20} className="text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <User size={20} className="text-gray-700" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;