// pages/index.js
import { useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabaseClient';
import { PostgrestError } from '@supabase/supabase-js'; // 型定義
import { formatDate } from 'date-fns';
// Next.js App Routerでのクライアントコンポーネント用Supabaseクライアント
import { createBrowserClient } from '@supabase/ssr';
import { AttendanceRecord } from '@/app/lib/types';

// Supabaseクライアントの初期化
// このクライアントは、`@supabase/ssr`が提供する認証情報を自動的に使用します
const supabaseGet = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// export default function DBTests() {
//     const [data, setData] = useState<Array<{ id: number; firstName: string }> | null>(null);
//     // const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<PostgrestError | null>(null);
//     const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [userId, setUserId] = useState<string | null>(null);

//     useEffect(() => {
//     // console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
//     // console.log('Supabase Anon Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

//         async function fetchData() {
//             try {
//                 const { data: results, error: dbError } = await supabase
//                 .from('User') // ← ここにあなたのテーブル名を記述
//                     .select('*'); // 全てのカラムを選択
                 
//                 if (dbError) {
//                     setError(dbError);
//                 } else {
//                     setData(results);
//                 }

//             } catch (error) {
//                 setError(error as PostgrestError); // error オブジェクトを PostgrestError 型としてキャスト
//             } 
//             finally {
//                 setLoading(false);
//             }
//         }

//         fetchData();
//     }, [data, error]);

//     if (loading) {
//         return <p>データを読み込み中です...</p>;
//     }

//     if (error) {
//         return <p>データの読み込みに失敗しました: {error.message}</p>;
//     }

//     if (data) {
//         return (
//             <div>       
//                 <table>
//                     <caption>Supabaseのデータ</caption>
//                     <thead>
//                         <tr>
//                             <th>ID</th>
//                             <th>createDate</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {data.map(item => (
//                             <tr key = {item.id}>
//                                 <td>{JSON.stringify(item.id)}</td>
//                                 {/* <td>{formatDate(new Date(item.firstName), 'yyyy-MM-dd hh:mm:ss')}</td> */}
//                             </tr>  
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         );
//     }

//     return (<p>データがありません。</p>)
// }

// データ登録を行うReactコンポーネント
export default function PostCreator() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState<string | null>(null);

  // ページロード時にユーザーIDを取得する
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Supabaseから認証済みのユーザー情報を取得
        const { data: { user }, error } = await supabaseGet.auth.getUser();
        if (error) {
          throw error;
        }
        // ユーザーが存在すれば、IDをstateにセット
        if (user) {
          setUserId(user.id);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error('ユーザー情報の取得に失敗しました:', error.message);
        }
      }
    };
    fetchUser();
  }, []);

  // データ登録の処理を行う関数
  const handleInsertPost = async () => {
    // ユーザーIDが取得できていなければ処理を中断
    if (!userId) {
      setMessage('ログインが必要です。');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // 登録するデータを定義
      // 'your_other_data'は、登録したい他のカラム名に置き換えてください
      // 'created_at'は、テーブルのデフォルト値で自動挿入されるため、ここでは含めていません
      const dataToInsert = {
        user_id: userId, // 取得したユーザーID
        content: 'これはテスト投稿です', // 登録する内容の例
      };

      // 指定したテーブルにデータを挿入
      const { error } = await supabaseGet
        .from('your_table_name') // データを登録するテーブル名
        .insert([dataToInsert]);

      if (error) {
        throw error;
      }

      setMessage('データが正常に登録されました！');
    } catch (error) {
      if (error instanceof Error) {
        setMessage(`登録に失敗しました: ${error.message}`);
        console.error('Error inserting data:', error);
      } else {
        setMessage('登録中に不明なエラーが発生しました。');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Supabaseデータ登録
      </h2>
      <p className="text-center text-gray-600">
        このボタンでユーザーIDと現在時刻を自動で登録します。
      </p>
      
      {/* ユーザーIDの表示（確認用） */}
      <div className="p-4 bg-gray-100 rounded-lg">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">現在のユーザーID:</span> {userId || '取得中...'}
        </p>
      </div>

      <button
        onClick={handleInsertPost}
        disabled={loading || !userId}
        className={`w-full py-3 px-6 rounded-md font-semibold text-white transition-colors duration-200 
          ${loading || !userId
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
          }`}
      >
        {loading ? '登録中...' : 'データを登録する'}
      </button>

      {message && (
        <div className={`p-4 rounded-md text-sm ${message.includes('成功') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}
    </div>
  );
}