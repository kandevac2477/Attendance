/*===================================
 ホーム画面
====================================*/
'use client';
import { useState, useEffect } from 'react'
import TimeClock from '@/components/TimeClock';
import Dashboard from "@/components/DashBord";
import { User, ApiResponse } from './lib/types'
// import PostCreator from '@/components/DBtests'


export default function Home() {
    const [users, setUsers] = useState<User[]>([])
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
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result: ApiResponse<User[]> = await response.json()
  
        if (result.error) {
          setError(result.error)
        } else {
          setUsers(result.data || [])
        }
      } catch (err) {
        setError('Failed to fetch users')
      } finally {
        setLoading(false)
      }
    }

    return (
        <div className="space-y-8">
            <TimeClock />
            <div className="max-w-3/4 mx-auto px-4">
                <Dashboard />
            </div>
            
            {/* ユーザーリストセクション */}
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-2xl font-bold mb-4">ユーザーリスト</h2>
                {loading && <p className="text-blue-500">Loading users...</p>}
                {error && <p className="text-red-500">Error: {error}</p>}
                {!loading && !error && users.length === 0 && (
                    <p className="text-gray-500">ユーザーが見つかりません</p>
                )}
                {users.length > 0 && (
                    <div className="grid gap-4">
                        {users.map((item) => (
                            <div key={item.id} className="border p-4 rounded-lg shadow-sm">
                                <h3 className="font-semibold text-lg">{item.firstName} {item.lastName}</h3>
                                <p className="text-gray-600">{item.email}</p>
                                <p className="text-sm text-gray-400">
                                    作成日: {new Date(item.createdDate).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-400">
                                    会社コード: {item.companyCode}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            {/* DBTestsコンポーネントを別セクションに配置 */}
            {/* <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-2xl font-bold mb-4">データベーステスト</h2>
                <PostCreator />
            </div> */}
        </div>
    );
}