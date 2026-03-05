/*===========================================
 登録画面のコンポーネント
===========================================*/
'use client'
import { useState } from 'react';

export default function Regist (){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // ここでログイン処理を実装
        alert(`メール: ${email}\nパスワード: ${password}`);
    };
  
    return (
        <div className='mx-32 my-16 border rounded-2 text-center'>
            <p>ログイン画面</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className='flex flex-col'>
              メールアドレス
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            className='w-96 border mx-auto'
                        />
                    </label>
                </div>
                <div>
                    <label className='flex flex-col'>
              パスワード
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            className='w-96 border mx-auto'
                        />
                    </label>
                </div>
                <button type="submit" className='m-16 border p-2'>ログイン</button>
            </form>
        </div>
    );
}