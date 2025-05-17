// pages/index.js
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { PostgrestError } from '@supabase/supabase-js'; // 型定義
import { formatDate } from 'date-fns';

export default function DBTests() {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PostgrestError | null>(null);

  useEffect(() => {
    // console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    // console.log('Supabase Anon Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

    async function fetchData() {
      try {
        const { data: results, error: dbError } = await supabase
          .from('Pb_Test') // ← ここにあなたのテーブル名を記述
          .select('*'); // 全てのカラムを選択
          console.log('Test スキーマのデータ:', data, 'エラー:', error);
                 
        if (dbError) {
          setError(dbError);
          console.log('エラー出てる:'); // ← 追加
        } else {
          setData(results);
          console.log('取得したデータ:', results); // ← 追加
        }

      } catch (error) {
        console.error('データの取得中にエラーが発生しました:', error);
        setError(error as PostgrestError); // error オブジェクトを PostgrestError 型としてキャスト
      } 
      finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <p>データを読み込み中です...</p>;
  }

  if (error) {
    return <p>データの読み込みに失敗しました: {error.message}</p>;
  }

  if (data) {
    return (
      <div>       
        <table>
        <caption>Supabaseのデータ</caption>
        <thead>
            <tr>
                <th>ID</th>
                <th>createDate</th>
            </tr>
        </thead>
        <tbody>
            {data.map(item => (
                <tr key = {item.id}>
                    <td>{JSON.stringify(item.id)}</td>
                    <td>{formatDate(new Date(item.created_at), 'yyyy-MM-dd hh:mm:ss')}</td>
                </tr>  
            ))}
        </tbody>
        </table>
      </div>
    );
  }

  return (<p>データがありません。</p>)
}