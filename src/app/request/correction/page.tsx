/*=======================================
打刻修正のコンポーネント
=======================================*/

import React from 'react';
//import { useNavigationContext } from '@/contexts/NavigationContext';
// import { RequestPage } from '../AttendanceRequests';
import { Calendar, Clock, FileEdit, FileCheck, FilePlus, Edit, Repeat, Briefcase, Home } from 'lucide-react';

export default function Correction() {
// const formatDate = (dateString: string): string => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('ja-JP', {
//       month: 'long',
//       day: 'numeric'
//     });
//   };
// const { activeTab } = useNavigationContext();
   
  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <h1 className="text-2xl font-semibold mb-6">打刻修正</h1>
      {/* <div>
        <p>{formatDate('2025-04-10')}</p>
      </div> */}
    </div>
  );

}