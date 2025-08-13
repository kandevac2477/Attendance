/*===========================================
 ログイン画面のコンポーネント
===========================================*/
'use client'
import { useState, useEffect } from 'react';
import { User, ApiResponse } from '../../app/lib/types'
import { useRouter } from 'next/navigation'

export default function Login (){
    const [isEmail, setIsEmail] = useState('');
    const [isPassword, setIsPassword] = useState('');
    const [errors, setErrors] = useState<{email?: string; password?: string}>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [getEmail, setGetEmail] = useState('');
    const [getPassword, setGetPassword] = useState('');    
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        fetchUsers()
      }, [])

      const fetchUsers = async () => {
        try {
          setLoading(true)
          const response = await fetch('/api/users');
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const result: ApiResponse<User[]> = await response.json()

          if (result.error) {
            setError(result.error)
          } else {
            setUsers(result.data || [])
            // 最初のユーザーの情報を設定（必要に応じて）
            if (result.data && result.data.length > 0) {
              setGetEmail(result.data[0].email)
              setGetPassword(result.data[0].password)
            }
          }
        } catch (err) {
          setError('Failed to fetch users')
        } finally {
          setLoading(false)
        }
      }
  
    // クライアント側バリデーション
    const validateForm = () => {
        const newErrors: {email?: string; password?: string} = {};
      
        // メールアドレスのバリデーション
        if (!isEmail) {
            newErrors.email = 'メールアドレスを入力してください';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(isEmail)) {
            newErrors.email = '有効なメールアドレスを入力してください';
        }
      
        // パスワードのバリデーション
        if (!isPassword) {
            newErrors.password = 'パスワードを入力してください';
        } else if (isPassword.length < 6) {
            newErrors.password = 'パスワードは6文字以上で入力してください';
        }
      
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
      
        // クライアント側バリデーション
        if (!validateForm()) {
            return;
        }
      
        setIsSubmitting(true);
      
        try {
        // ここでサーバー側のログイン処理を実装
        const fetchUsers = async () => {
            try {
              setLoading(true)
              const response = await fetch('/api/users');
              
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              
              const result: ApiResponse<User[]> = await response.json()
    
              if (result.error) {
                setError(result.error)
              } else {
                setUsers(result.data || [])
                // 最初のユーザーの情報を設定（必要に応じて）
                if (result.data && result.data.length > 0) {
                  setGetEmail(result.data[0].email)
                  setGetPassword(result.data[0].password)
                }
              }
            } catch (err) {
              setError('Failed to fetch users')
            } finally {
              setLoading(false)
            }
          }

        if (isEmail === getEmail && isPassword === getPassword) {
            router.push('/');
        } else {
            console.log('ログインしていません');
            alert('ログインに失敗しました.メールアドレスまたはパスワードが間違っています.');
        }

        // 実際のAPIエンドポイントを呼び出す
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isEmail, isPassword }),
            });
        
            if (!response.ok) {
                const errorData = await response.json();
                setErrors({ password: errorData.message || 'ログインに失敗しました' });
                return;
            }
        
            // ログイン成功時の処理
            alert('ログインに成功しました！');
            // リダイレクト処理など
        
        } catch {
            setErrors({ password: 'ネットワークエラーが発生しました' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClick = () => {
        console.log('ログインボタンがクリックされました');
        if (isEmail === getEmail && isPassword === getPassword) {
            router.push('/')
        } else {
            console.log('ログインしていません');
            alert('ログインに失敗しました.メールアドレスまたはパスワードが間違っています.');
        }
    }
  
    return (
        <div className='mx-32 my-16 border rounded-2 text-center'>
            <p className='m-8'>ログイン画面</p>
            <form onSubmit={handleSubmit}>
                <div className='m-4'>
                    <label className='flex flex-col'>
                        メールアドレス
                        <input
                            type="email"
                            value={isEmail}
                            onChange={e => {
                                setIsEmail(e.target.value);
                                if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                            }}
                            required
                            className={`w-96 border mx-auto ${errors.email ? 'border-red-500' : ''}`}
                            disabled={isSubmitting}
                        />
                    </label>
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                </div>
                <div className='m-4'>
                    <label className='flex flex-col'>
                        パスワード
                        <input
                            type="password"
                            value={isPassword}
                            onChange={e => {
                                setIsPassword(e.target.value);
                                if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
                            }}
                            required
                            className={`w-96 border mx-auto ${errors.password ? 'border-red-500' : ''}`}
                            disabled={isSubmitting}
                        />
                    </label>
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                </div>
                <button 
                    type="submit" 
                    className={`m-8 border p-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isSubmitting}
                    onClick={handleClick}
                >
                    {isSubmitting ? 'ログイン中...' : 'ログイン'}
                </button>
            </form>
        </div>
    );
}