/*=======================================
休日申請のコンポーネント
呼び出されるファイル：src/app/request/leavave/page.tsx
=======================================*/

'use client'; // Client Component であることを宣言
import React from 'react';
import { Calendar, Clock, FileEdit, FileCheck, FilePlus, Edit, Repeat, Briefcase, Home } from 'lucide-react';
import { useRouter } from 'next/navigation'; // next/navigation から useRouter をインポート
import Link from 'next/link';

// Propsの型をインターフェースで定義
interface DynamicButtonProps {
    id: number; // IDは数値であると明示
    text: string;
    href: string;
  }

export default function LeaveRequest({ id,text, href }:DynamicButtonProps) {
    const router = useRouter(); // useRouterフックを使用
    const handleButtonClick = () => {
        // クリック時に/dashboardに遷移
        router.push('/request/leave/annualsalary');
    };

  return (
    <Link href= {href}>
        <button className="block p-6 rounded-lg border border-border bg-card text-card-foreground hover:shadow-md transition-all">
        {text}
        </button>
    </Link>
    /* <div>
        <button className="block p-6 rounded-lg border border-border bg-card text-card-foreground hover:shadow-md transition-all" onClick={handleButtonClick}>
            年次有給申請
        </button>
        <button className="block p-6 rounded-lg border border-border bg-card text-card-foreground hover:shadow-md transition-all">
            振替休日申請
        </button>
      </div>*/
  );

}
