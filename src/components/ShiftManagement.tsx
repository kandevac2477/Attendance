/*=======================================
シフト管理の画面コンポーネント
=======================================*/

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Edit2, Plus, Save } from 'lucide-react';
import { Calendar as BigCalendar, dateFnsLocalizer, Views, Messages, View } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { ja } from 'date-fns/locale';
import { format, parse, startOfWeek, getDay } from 'date-fns';

// 日本語ロケールの設定
const messages: Messages = {
  month: '月',
  week: '週',
  day: '日',
  agenda: '予定',
  date: '日付',
  time: '時間',
  event: '予定',
  noEventsInRange: 'この期間の予定はありません',
  showMore: (total: number) => `他 ${total} 件`,
  today: '今日',
  previous: '前へ',
  next: '次へ',
  yesterday: '昨日',
  tomorrow: '明日',
  allDay: '終日',
  work_week: '週間',
};

// 日付フォーマットの設定
const formats = {
  dateFormat: 'yyyy-MM-dd',
  dayFormat: 'd',
  monthHeaderFormat: 'yyyy年 M月',
  dayHeaderFormat: 'M月d日 (E)',
  dayRangeHeaderFormat: ({ start, end }: { start: Date; end: Date }) => {
    return `${format(start, 'M月d日')} - ${format(end, 'M月d日')}`;
  },
};

interface Shift {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  type: string;
}

// カレンダー用のイベント型
interface CalendarEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  type: string;
}

// カレンダーのローカライズ設定
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { ja },
});

const ShiftManagement: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [currentView, setCurrentView] = useState<View>(Views.MONTH);
  const [editingShiftId, setEditingShiftId] = useState<number | null>(null);
  const [shifts, setShifts] = useState<Shift[]>([
    { id: 1, date: '2025-04-14', startTime: '09:00', endTime: '18:00', type: '通常' },
    { id: 2, date: '2025-04-15', startTime: '09:00', endTime: '18:00', type: '通常' },
    { id: 3, date: '2025-04-16', startTime: '10:00', endTime: '19:00', type: '遅番' },
    { id: 4, date: '2025-04-17', startTime: '09:00', endTime: '18:00', type: '通常' },
    { id: 5, date: '2025-04-18', startTime: '09:00', endTime: '18:00', type: '通常' }
  ]);
  
  const [editForm, setEditForm] = useState<Shift>({
    id: 0,
    date: '',
    startTime: '',
    endTime: '',
    type: '通常'
  });
  
  // クライアントサイドでのみ初期化を行う
  useEffect(() => {
    setCurrentDate(new Date());
  }, []);
  
  // シフトデータをカレンダーイベントに変換
  const calendarEvents: CalendarEvent[] = shifts.map(shift => {
    const date = new Date(shift.date);
    const [startHour, startMinute] = shift.startTime.split(':').map(Number);
    const [endHour, endMinute] = shift.endTime.split(':').map(Number);
    
    const start = new Date(date);
    start.setHours(startHour, startMinute, 0);
    
    const end = new Date(date);
    end.setHours(endHour, endMinute, 0);
    
    return {
      id: shift.id,
      title: `${shift.type} (${shift.startTime}-${shift.endTime})`,
      start,
      end,
      type: shift.type
    };
  });
  
  // イベントのスタイル設定
  const eventStyleGetter = (event: CalendarEvent) => {
    let style: React.CSSProperties = {
      backgroundColor: '#3182ce',
      borderRadius: '4px',
      opacity: 0.8,
      color: 'white',
      border: '0',
      display: 'block',
      padding: '2px 5px'
    };
    
    if (event.type === '遅番') {
      style.backgroundColor = '#805ad5';
    } else if (event.type === '早番') {
      style.backgroundColor = '#38a169';
    }
    
    return { style };
  };
  
  // カレンダーの表示モード変更ハンドラ
  const handleViewChange = (newView: View) => {
    setCurrentView(newView);
  };
  
  // 日付変更ハンドラ
  const handleDateChange = (newDate: Date) => {
    setCurrentDate(newDate);
  };
  
  // イベント選択ハンドラ
  const handleSelectEvent = (event: CalendarEvent) => {
    const shift = shifts.find(s => s.id === event.id);
    if (shift) {
      handleEditShift(shift);
    }
  };
  
  // 新規イベント作成ハンドラ
  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    const newShift: Shift = {
      id: 0,
      date: format(start, 'yyyy-MM-dd'),
      startTime: format(start, 'HH:mm'),
      endTime: format(end, 'HH:mm'),
      type: '通常'
    };
    
    setEditForm(newShift);
    setEditingShiftId(null);
  };
  
  const goToPreviousWeek = () => {
    if (currentDate) {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() - 7);
      setCurrentDate(newDate);
    }
  };
  
  const goToNextWeek = () => {
    if (currentDate) {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() + 7);
      setCurrentDate(newDate);
    }
  };
  
  const getWeekDates = () => {
    if (!currentDate) return [];
    
    const dates = [];
    const startOfWeek = new Date(currentDate);
    const day = currentDate.getDay();
    const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push(date);
    }
    
    return dates;
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ja-JP', {
      month: '2-digit',
      day: '2-digit',
      weekday: 'short'
    });
  };
  
  const formatDateForData = (date: Date) => {
    return date.toISOString().split('T')[0];
  };
  
  const handleEditShift = (shift: Shift) => {
    setEditingShiftId(shift.id);
    setEditForm(shift);
  };
  
  const handleSaveShift = () => {
    if (editingShiftId) {
      setShifts(shifts.map(shift => 
        shift.id === editingShiftId ? editForm : shift
      ));
    } else {
      // Adding new shift
      const newShift = {
        ...editForm,
        id: Math.max(0, ...shifts.map(s => s.id)) + 1
      };
      setShifts([...shifts, newShift]);
    }
    
    setEditingShiftId(null);
    setEditForm({
      id: 0,
      date: '',
      startTime: '',
      endTime: '',
      type: '通常'
    });
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };
  
  // サーバーサイドレンダリング時は何も表示しない
  if (!currentDate) {
    return <div className="bg-white rounded-lg shadow-sm p-6">読み込み中...</div>;
  }
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Calendar size={24} className="text-gray-900 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900">シフト管理</h2>
        </div>
      </div>
      
      {/* カレンダーコンポーネント */}
      <div className="h-[600px] mb-6">
        <BigCalendar
          localizer={localizer}
          events={calendarEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          views={[Views.MONTH, Views.WEEK, Views.DAY]}
          view={currentView}
          onView={handleViewChange}
          date={currentDate}
          onNavigate={handleDateChange}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          eventPropGetter={eventStyleGetter}
          messages={messages}
          formats={formats}
          culture="ja"
        />
      </div>
      
      {/* 編集フォーム */}
      {editingShiftId !== null && (
        <div className="mt-6 p-4 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-medium mb-4">
            {editingShiftId ? 'シフトを編集' : '新規シフト'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                日付
              </label>
              <input
                type="date"
                name="date"
                value={editForm.date}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                タイプ
              </label>
              <select
                name="type"
                value={editForm.type}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="通常">通常</option>
                <option value="早番">早番</option>
                <option value="遅番">遅番</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                開始時間
              </label>
              <input
                type="time"
                name="startTime"
                value={editForm.startTime}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                終了時間
              </label>
              <input
                type="time"
                name="endTime"
                value={editForm.endTime}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={() => setEditingShiftId(null)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              キャンセル
            </button>
            <button
              onClick={handleSaveShift}
              className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 flex items-center"
            >
              <Save size={16} className="mr-1" />
              <span>保存</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShiftManagement;