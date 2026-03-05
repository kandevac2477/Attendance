/*===================================
 管理者用ユーザー管理画面
====================================*/
'use client';
import { useState, useEffect } from 'react'
import { UserWithoutPassword, ApiResponse } from '@/app/lib/types'

export default function AdminUsersPage() {
    const [users, setUsers] = useState<UserWithoutPassword[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
  
    useEffect(() => {
      fetchUsers()
    }, [])
  
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/users')
        
        if (!response.ok) {
          if (response.status === 401) {
            setError('認証が必要です。ログインしてください。')
          } else if (response.status === 403) {
            setError('アクセス権限がありません。管理者のみアクセス可能です。')
          } else {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          return
        }
        
        const result: ApiResponse<UserWithoutPassword[]> = await response.json()
  
        if (result.error) {
          setError(result.error)
        } else {
          setUsers(result.data || [])
        }
      } catch (err) {
        setError('ユーザー情報の取得に失敗しました')
      } finally {
        setLoading(false)
      }
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">ユーザー管理</h1>
            
            {loading && (
                <div className="text-center py-8">
                    <p className="text-blue-500">ユーザー情報を読み込み中...</p>
                </div>
            )}
            
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-red-600">{error}</p>
                    {error.includes('認証が必要') && (
                        <a href="/login" className="text-blue-600 underline mt-2 inline-block">
                            ログインページへ
                        </a>
                    )}
                </div>
            )}
            
            {!loading && !error && users.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-gray-500">ユーザーが見つかりません</p>
                </div>
            )}
            
            {users.length > 0 && (
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="px-6 py-4 bg-gray-50 border-b">
                        <h2 className="text-xl font-semibold">登録ユーザー一覧 ({users.length}名)</h2>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ユーザー情報
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        会社情報
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        在籍状況
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        登録日
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.map((user) => (
                                    <tr key={user.id.toString()} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {user.firstName} {user.lastName}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {user.email}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {user.companyCode}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                user.affiliationFlg === 1 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {user.affiliationFlg === 1 ? '在籍' : '退職'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(user.createdDate).toLocaleDateString('ja-JP')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
