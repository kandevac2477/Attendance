// pages/index.js
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { PostgrestError } from '@supabase/supabase-js'; // 型定義

export default function DBTests() {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PostgrestError | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: results, error: dbError } = await supabase
          .from('Pb_Test') // ← ここにあなたのテーブル名を記述
          .select('*'); // 全てのカラムを選択

        if (dbError) {
          setError(dbError);
        } else {
          setData(results);
          console.log('取得したデータ:', results); // ← 追加
        }
      } catch (error) {
        console.error('データの取得中にエラーが発生しました:', error);
        setError(error as PostgrestError); // error オブジェクトを PostgrestError 型としてキャスト
      } finally {
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
        <h1>Supabaseのデータ</h1>
        <ul>
          {data.map(item => (
            <li key={item.id}>{JSON.stringify(item)}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (<p>データがありません。</p>)
}