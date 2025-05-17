/*==============================
勤怠修正・申請画面に表示される内容のコンポーネント
==============================*/

import React, { useState } from 'react';
import { Calendar, Clock, FileEdit, FileCheck, FilePlus, Edit, Repeat, Briefcase, Home } from 'lucide-react';


export default function RequestPage() {
  // Array of request types
  const requestTypes = [
    {
      id: 'leave',
      title: '休暇申請',
      description: '有給休暇、特別休暇、欠勤などの申請',
      href: '/request/leave',
      icon: <Calendar className="h-6 w-6" />
    },
    {
      id: 'overtime',
      title: '残業申請',
      description: '所定労働時間を超える勤務の事前申請',
      href: '/request/overtime',
      icon: <Clock className="h-6 w-6" />
    },
    {
      id: 'correction',
      title: '勤怠修正',
      description: '打刻忘れや修正が必要な勤怠記録の申請',
      href: '/request/correction',
      icon: <Edit className="h-6 w-6" />
    },
    {
      id: 'shift_change',
      title: 'シフト変更',
      description: '既存シフトの変更や交代の申請',
      href: '/request/shift',
      icon: <Repeat className="h-6 w-6" />
    },
    {
      id: 'business_trip',
      title: '出張申請',
      description: '出張予定と経費の事前申請',
      href: '/request/business-trip',
      icon: <Briefcase className="h-6 w-6" />
    },
    {
      id: 'remote_work',
      title: 'リモートワーク',
      description: '自宅やオフィス以外での勤務申請',
      href: '/request/remote-work',
      icon: <Home className="h-6 w-6" />
    }
  ];
  
  // Array of recent requests for the history section
  const recentRequests = [
    {
      id: 1,
      type: '有給休暇',
      date: '2025-04-14',
      requestDate: '2025-04-20',
      status: 'pending',
      approver: '田中 部長'
    },
    {
      id: 2,
      type: '勤怠修正',
      date: '2025-04-13',
      requestDate: '2025-04-12',
      status: 'approved',
      approver: '田中 部長'
    },
    {
      id: 3,
      type: 'シフト変更',
      date: '2025-04-12',
      requestDate: '2025-04-18',
      status: 'rejected',
      approver: '田中 部長'
    },
    {
      id: 4,
      type: '残業申請',
      date: '2025-04-10',
      requestDate: '2025-04-10',
      status: 'approved',
      approver: '田中 部長'
    }
  ];
  
  // Function to format date strings
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Function to get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-chart-4/10 text-chart-4 border border-chart-4/20">
            保留中
          </span>
        );
      case 'approved':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-chart-1/10 text-chart-1 border border-chart-1/20">
            承認済
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-chart-5/10 text-chart-5 border border-chart-5/20">
            却下
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-muted text-muted-foreground">
            {status}
          </span>
        );
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <h1 className="text-2xl font-semibold mb-6">申請メニュー</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {requestTypes.map((type) => (
          <a
            key={type.id}
            href={type.href}
            className="block p-6 rounded-lg border border-border bg-card text-card-foreground hover:shadow-md transition-all"
          >
            <div className="flex items-start">
              <div className="mr-4 p-2 rounded-md bg-muted">
                {type.icon}
              </div>
              <div>
                <h2 className="text-lg font-medium">{type.title}</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {type.description}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
      
      <h2 className="text-xl font-semibold mt-10 mb-4">最近の申請履歴</h2>
      
      <div className="rounded-lg border border-border bg-card text-card-foreground shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-3 text-left text-sm font-medium">申請種類</th>
                <th className="px-4 py-3 text-left text-sm font-medium">申請日</th>
                <th className="px-4 py-3 text-left text-sm font-medium">対象日</th>
                <th className="px-4 py-3 text-left text-sm font-medium">承認者</th>
                <th className="px-4 py-3 text-left text-sm font-medium">状態</th>
                <th className="px-4 py-3 text-left text-sm font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentRequests.map((request) => (
                <tr 
                  key={request.id}
                  className="hover:bg-muted/40 transition-colors"
                >
                  <td className="px-4 py-4 text-sm font-medium">
                    {request.type}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    {formatDate(request.date)}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    {formatDate(request.requestDate)}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    {request.approver}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    {getStatusBadge(request.status)}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <div className="flex space-x-2">
                      <button className="text-muted-foreground hover:text-foreground transition-colors">
                        詳細
                      </button>
                      {request.status === 'pending' && (
                        <button className="text-chart-5 hover:text-chart-5/80 transition-colors">
                          取消
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-border bg-muted/30 flex justify-center">
          <a href="/request/history" className="text-sm font-medium hover:underline">
            すべての申請履歴を表示
          </a>
        </div>
      </div>
    </div>
  );
}

//export default AttendanceRequests;