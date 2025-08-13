/*================================
 勤怠打刻(ホーム画面)の勤怠統計のコンポーネント
==================================*/

"use client"
import { useState } from 'react';

// Mock data
const monthlyData = {
    workDays: 21,
    workedDays: 18,
    totalHours: 144,
    overtimeHours: 6,
    lateCount: 1,
    earlyLeaveCount: 0,
    absentCount: 1,
    paidLeaveUsed: 2
};

export default function Dashboard() {
    const [timeframe, setTimeframe] = useState<'day' | 'week' | 'month'>('month');
  
    return (
        <div className="rounded-lg border border-border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">勤怠統計</h2>
                    <div className="flex space-x-1 rounded-md border border-border p-1">
                        <button
                            onClick={() => setTimeframe('day')}
                            className={`px-3 py-1 text-sm rounded-sm ${
                                timeframe === 'day' 
                                    ? 'bg-primary text-primary-foreground' 
                                    : 'hover:bg-muted'
                            }`}
                        >
              日次
                        </button>
                        <button
                            onClick={() => setTimeframe('week')}
                            className={`px-3 py-1 text-sm rounded-sm ${
                                timeframe === 'week' 
                                    ? 'bg-primary text-primary-foreground' 
                                    : 'hover:bg-muted'
                            }`}
                        >
              週次
                        </button>
                        <button
                            onClick={() => setTimeframe('month')}
                            className={`px-3 py-1 text-sm rounded-sm ${
                                timeframe === 'month' 
                                    ? 'bg-primary text-primary-foreground' 
                                    : 'hover:bg-muted'
                            }`}
                        >
              月次
                        </button>
                    </div>
                </div>
        
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCard 
                        title="出勤日数" 
                        value={`${monthlyData.workedDays}/${monthlyData.workDays}日`} 
                    />
                    <StatCard 
                        title="総労働時間" 
                        value={`${monthlyData.totalHours}時間`} 
                    />
                    <StatCard 
                        title="残業時間" 
                        value={`${monthlyData.overtimeHours}時間`} 
                    />
                    <StatCard 
                        title="有休消化" 
                        value={`${monthlyData.paidLeaveUsed}日`} 
                    />
                </div>
        
                <div className="mt-4 pt-4 border-t border-border">
                    <div className="grid grid-cols-3 gap-4">
                        <AttendanceAlert
                            type="warning" 
                            value={monthlyData.lateCount}
                            label="遅刻"
                        />
                        <AttendanceAlert 
                            type="info" 
                            value={monthlyData.earlyLeaveCount}
                            label="早退"
                        />
                        <AttendanceAlert 
                            type="error" 
                            value={monthlyData.absentCount}
                            label="欠勤"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value }: { title: string; value: string }) {
    return (
        <div className="p-4 rounded-md bg-muted">
            <div className="text-sm text-muted-foreground">{title}</div>
            <div className="text-xl font-semibold mt-1">{value}</div>
        </div>
    );
}

interface AttendanceAlertProps {
  type: 'info' | 'warning' | 'error';
  value: number;
  label: string;
}

function AttendanceAlert({ type, value, label }: AttendanceAlertProps) {
    const getStyles = () => {
        switch (type) {
        case 'info':
        // return "border-l-4 border-l-chart-2 bg-chart-2/10";
            return "border-l-4 border-l-blue-500 bg-blue-50";
        case 'warning':
        // return "border-l-4 border-l-chart-4 bg-chart-4/10";
            return "border-l-4 border-l-yellow-500 bg-yellow-50";
        case 'error':
        // return "border-l-4 border-l-chart-5 bg-chart-5/10";
            return "border-l-4 border-l-red-500 bg-red-50";
        default:
        // return "border-l-4 border-l-muted-foreground bg-muted";
            return "border-l-4 border-l-gray-500 bg-gray-50";
        }
    };
  
    return (
        <div className={`p-3 rounded-md ${getStyles()}`}>
            <div className="text-2xl font-semibold">{value}</div>
            <div className="text-sm">{label}</div>
        </div>
    );

  
}

// pages/index.js
// import { useEffect, useState } from 'react';


/*export default function Home() {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PostgrestError | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: results, error: dbError } = await supabase
          .from('Test') // ← ここにあなたのテーブル名を記述
          .select('*'); // 全てのカラムを選択

        if (dbError) {
          setError(dbError);
        } else {
          setData(results);
        }
      } catch (error) {
        //  setError({ message: error.message, code: String(error.code) }); // より具体的なエラーオブジェクトを作成
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <p>データを読み込み中です...</p>;
  }

  if (error) {
    return <p>データの読み込みに失敗しました: {error.message}</p>;
  }

  if (data) {
    return (
      <div>
        <h1>Supabaseのデータ</h1>
        <ul>
          {data.map(item => (
            <li key={item.id}>{JSON.stringify(item)}</li>
          ))}
        </ul>
      </div>
    );
  }

  return <p>データがありません。</p>;
}*/