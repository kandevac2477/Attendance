/*===========================================
 ログイン画面のコンポーネント
===========================================*/
'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation'

export default function Login (){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{email?: string; password?: string}>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter()

    // クライアント側バリデーション
    const validateForm = () => {
        const newErrors: {email?: string; password?: string} = {};
      
        // メールアドレスのバリデーション
        if (!email) {
            newErrors.email = 'メールアドレスを入力してください';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = '有効なメールアドレスを入力してください';
        }
      
        // パスワードのバリデーション
        if (!password) {
            newErrors.password = 'パスワードを入力してください';
        } else if (password.length < 6) {
            newErrors.password = 'パスワードは6文字以上で入力してください';
        }
      
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // データベースでの認証
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
      
        // クライアント側バリデーション
        if (!validateForm()) {
            return;
        }
      
        setIsSubmitting(true);
        setErrors({});
      
        try {
            // データベースでの認証
            const response = await fetch('/api/auth/simple-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                // const loginData = await response.json();
                // console.log(loginData);
                router.push('/');
            } else {
                const errorData = await response.json();
                setErrors({ 
                    password: errorData.message || 'ログインに失敗しました' 
                });
            }
        
        } catch (error) {
            console.error('ログインエラー:', error);
            setErrors({ password: 'ログインに失敗しました' });
        } finally {
            setIsSubmitting(false);
        }
    };
  
    return (
        <div className='mx-auto max-w-md my-16 p-8 border rounded-lg shadow-lg bg-white'>
            <h1 className='text-2xl font-bold text-center mb-8'>ログイン</h1>
            
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                        メールアドレス
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => {
                            setEmail(e.target.value);
                            if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                        }}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        disabled={isSubmitting}
                        placeholder="メールアドレスを入力"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1 whitespace-pre-line">{errors.email}</p>
                    )}
                </div>

                <div className='mb-6'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                        パスワード
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => {
                            setPassword(e.target.value);
                            if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
                        }}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.password ? 'border-red-500' : 'border-gray-300'
                        }`}
                        disabled={isSubmitting}
                        placeholder="パスワードを入力"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1 whitespace-pre-line">{errors.password}</p>
                    )}
                </div>

                <button 
                    type="submit" 
                    className={`w-full py-2 px-4 rounded-md font-medium ${
                        isSubmitting 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    } text-white transition duration-200`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'ログイン中...' : 'ログイン'}
                </button>
            </form>
        </div>
    );
}