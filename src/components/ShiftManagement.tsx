import React, { useState } from 'react';
import { Calendar, Clock, Edit2, Plus, Save } from 'lucide-react';

interface Shift {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  type: string;
}

const ShiftManagement: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
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
  
  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };
  
  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };
  
  const getWeekDates = () => {
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
  
  const weekDates = getWeekDates();
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Calendar size={24} className="text-gray-900 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900">シフト管理</h2>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={goToPreviousWeek}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            ←
          </button>
          <span className="font-medium">
            {weekDates[0].toLocaleDateString('ja-JP', { month: 'long', day: 'numeric' })} 
            - 
            {weekDates[6].toLocaleDateString('ja-JP', { month: 'long', day: 'numeric' })}
          </span>
          <button
            onClick={goToNextWeek}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            →
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {weekDates.map((date, index) => (
                <th key={index} className="px-6 py-3 text-center">
                  <div className="font-medium text-gray-900">{formatDate(date)}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {weekDates.map((date, index) => {
                const dateStr = formatDateForData(date);
                const shift = shifts.find(s => s.date === dateStr);
                
                return (
                  <td key={index} className="p-4 border border-gray-100">
                    {shift && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div className="text-sm font-medium text-gray-900">{shift.type}</div>
                          <button 
                            onClick={() => handleEditShift(shift)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <Edit2 size={14} />
                          </button>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <Clock size={14} className="mr-1" />
                          <span className="text-sm">
                            {shift.startTime} - {shift.endTime}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {!shift && (
                      <button
                        onClick={() => {
                          setEditingShiftId(null);
                          setEditForm({
                            id: 0,
                            date: dateStr,
                            startTime: '09:00',
                            endTime: '18:00',
                            type: '通常'
                          });
                        }}
                        className="w-full h-20 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg text-gray-400 hover:text-gray-600 hover:border-gray-300"
                      >
                        <Plus size={20} />
                      </button>
                    )}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
      
      {editForm.date && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {editingShiftId ? 'シフト編集' : 'シフト追加'}
              </h3>
              <button 
                onClick={() => {
                  setEditingShiftId(null);
                  setEditForm({
                    id: 0,
                    date: '',
                    startTime: '',
                    endTime: '',
                    type: '通常'
                  });
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">日付</label>
              <input
                type="date"
                name="date"
                value={editForm.date}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                readOnly
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-2">開始時間</label>
                <input
                  type="time"
                  name="startTime"
                  value={editForm.startTime}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">終了時間</label>
                <input
                  type="time"
                  name="endTime"
                  value={editForm.endTime}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">シフトタイプ</label>
              <select
                name="type"
                value={editForm.type}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="通常">通常</option>
                <option value="早番">早番</option>
                <option value="遅番">遅番</option>
                <option value="休日">休日</option>
              </select>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setEditingShiftId(null);
                  setEditForm({
                    id: 0,
                    date: '',
                    startTime: '',
                    endTime: '',
                    type: '通常'
                  });
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                キャンセル
              </button>
              <button
                type="button"
                onClick={handleSaveShift}
                className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 flex items-center"
              >
                <Save size={18} className="mr-1" />
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShiftManagement;