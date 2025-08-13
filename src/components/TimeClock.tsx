/*===================================
勤怠打刻のコンポーネント
====================================*/
'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Clock1 } from 'lucide-react';

const TimeClock: React.FC = () => {
    const [currentTime, setCurrentTime] = useState<Date | null>(null);
    const [clockStatus, setClockStatus] = useState<'out' | 'in'>('out');
    const [lastAction, setLastAction] = useState<{time: Date, type: string} | null>(null);
    const [mounted, setMounted] = useState(false);
  
    useEffect(() => {
        setMounted(true);
        setCurrentTime(new Date());
    
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
    
        return () => clearInterval(timer);
    }, []);
  
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('ja-JP', { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            hour12: false
        });
    };
  
    const formatDate = (date: Date) => {
        return date.toLocaleDateString('ja-JP', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            weekday: 'long' 
        });
    };
  
    const handleClockAction = (action: 'in' | 'out') => {
        setClockStatus(action);
        setLastAction({
            time: new Date(),
            type: action === 'in' ? '出勤' : '退勤'
        });
    };
  
    return (
        <div className="bg-white rounded-lg shadow-sm p-6 max-w-md mx-auto my-16">
            <div className="flex items-center justify-center mb-6">
                <Clock size={28} className="text-gray-900 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-900">勤怠打刻</h2>
            </div>
      
            <div className="text-center mb-8">
                {mounted && currentTime ? (
                    <>
                        <p className="text-lg text-gray-600">{formatDate(currentTime)}</p>
                        <p className="text-4xl font-bold text-gray-900 mt-2">{formatTime(currentTime)}</p>
                    </>
                ) : (
                    <>
                        <p className="text-lg text-gray-600">読み込み中...</p>
                        <p className="text-4xl font-bold text-gray-900 mt-2">--:--:--</p>
                    </>
                )}
            </div>
      
            <div className="grid grid-cols-2 gap-4 mb-8">
                <button 
                    onClick={() => handleClockAction('in')}
                    disabled={clockStatus === 'in'}
                    className={`py-4 rounded-lg text-center transition-all ${
                        clockStatus === 'in' 
                            ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                            : 'bg-gray-900 text-white hover:bg-gray-800 shadow-md hover:shadow-lg'
                    }`}
                >
                    <div className="flex flex-col items-center">
                        <Clock1 size={24} className="mb-1" />
                        <span className="font-medium">出勤</span>
                    </div>
                </button>
        
                <button 
                    onClick={() => handleClockAction('out')}
                    disabled={clockStatus === 'out'}
                    className={`py-4 rounded-lg text-center transition-all ${
                        clockStatus === 'out' 
                            ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                            : 'bg-gray-900 text-white hover:bg-gray-800 shadow-md hover:shadow-lg'
                    }`}
                >
                    <div className="flex flex-col items-center">
                        <Clock1 size={24} className="mb-1" />
                        <span className="font-medium">退勤</span>
                    </div>
                </button>
            </div>
      
            {lastAction && (
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-gray-600">最後の打刻:</p>
                    <p className="text-lg font-medium text-gray-900">
                        {lastAction.type} - {formatTime(lastAction.time)}
                    </p>
                </div>
            )}
        </div>
    );
};

export default TimeClock;