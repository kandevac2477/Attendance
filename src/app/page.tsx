/*===================================
 ホーム画面
====================================*/
'use client';
import TimeClock from '@/components/TimeClock';
import Dashboard from "@/components/DashBord";

export default function Home() {
    return (
        <div className="space-y-8">
            <TimeClock />
            <div className="max-w-3/4 mx-auto px-4">
                <Dashboard />
            </div>
        </div>
    );
}