import React, { useState } from 'react';
import { Calendar, Clock, FileEdit, FileCheck, FilePlus } from 'lucide-react';

interface RequestFormProps {
  onClose: () => void;
  onSubmit: (data: RequestData) => void;
}

interface RequestData {
  type: string;
  date: string;
  startTime?: string;
  endTime?: string;
  reason: string;
}

const RequestForm: React.FC<RequestFormProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState<RequestData>({
    type: '修正',
    date: new Date().toISOString().split('T')[0],
    startTime: '',
    endTime: '',
    reason: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900">勤怠申請フォーム</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">申請タイプ</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="修正">勤怠修正</option>
              <option value="休暇">休暇申請</option>
              <option value="残業">残業申請</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">日付</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          {formData.type !== '休暇' && (
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-2">開始時間</label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
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
                  value={formData.endTime}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
          )}
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">理由</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md h-24"
              required
            ></textarea>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
            >
              申請する
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AttendanceRequests: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [requests, setRequests] = useState<(RequestData & { id: number, status: string })[]>([
    {
      id: 1,
      type: '修正',
      date: '2025-04-15',
      startTime: '09:30',
      endTime: '18:30',
      reason: '社内システムの不具合で打刻できませんでした。',
      status: '承認待ち'
    },
    {
      id: 2,
      type: '休暇',
      date: '2025-04-20',
      reason: '私用のため',
      status: '承認済み'
    }
  ]);
  
  const handleSubmitRequest = (data: RequestData) => {
    const newRequest = {
      ...data,
      id: requests.length + 1,
      status: '承認待ち'
    };
    setRequests([...requests, newRequest]);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FileEdit size={24} className="text-gray-900 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900">勤怠申請</h2>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
        >
          <FilePlus size={18} className="mr-1" />
          <span>新規申請</span>
        </button>
      </div>
      
      {requests.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">日付</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">タイプ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">時間</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">理由</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ステータス</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.startTime && request.endTime 
                      ? `${request.startTime} - ${request.endTime}` 
                      : '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{request.reason}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      request.status === '承認済み' 
                        ? 'bg-gray-200 text-gray-800' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {request.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8">
          <FileCheck size={36} className="mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500">申請はありません</p>
        </div>
      )}
      
      {showForm && (
        <RequestForm onClose={() => setShowForm(false)} onSubmit={handleSubmitRequest} />
      )}
    </div>
  );
};

export default AttendanceRequests;