/*=======================================
休日申請のコンポーネント
呼び出されるファイル：src/app/request/leavave/page.tsx
=======================================*/

'use client'; // Client Component であることを宣言
import React from 'react';
import Link from 'next/link';

// Propsの型をインターフェースで定義
interface DynamicButtonProps {
    text: string;
    href: string;
  }

export default function LeaveRequest({ text, href }: DynamicButtonProps) {
    return (
        <Link href={href}>
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
