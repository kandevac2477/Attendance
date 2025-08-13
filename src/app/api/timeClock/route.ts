import { supabase } from '../../lib/supabaseClient'
// import { AttendanceRecord } from '@/lib/types'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()
    
    // Supabaseにデータを挿入
    const { data, error } = await supabase
      .from('AttendanceRecord') // テーブル名を適宜変更してください
      .insert([
        {
          userId: '1',
          clockIn: new Date().toISOString()
        //   clockOut
        //   created_at: new Date().toISOString()
        }
      ])
      .select()
    
    if (error) {
      console.error('Supabase エラー:', error)
      return Response.json(
        { 
          success: false, 
          message: 'データの登録に失敗しました',
          error: error.message 
        },
        { status: 500 }
      )
    }

    console.log('Supabaseにデータを登録しました:', data)
    
    return Response.json({ 
      success: true, 
      message: 'データが正常に登録されました',
      data: data[0]
    })
  } catch (error) {
    console.error('API エラー:', error)
    return Response.json(
      { 
        success: false, 
        message: 'サーバーエラーが発生しました' 
      },
      { status: 500 }
    )
  }
}

// データ取得用のGETメソッド
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('AttendanceRecord')
      .select('*')
    //   .order('created_at', { ascending: false })
    //   .limit(10)
    
    if (error) {
      console.error('Supabase 取得エラー:', error)
      return Response.json(
        { 
          success: false, 
          message: 'データの取得に失敗しました',
          error: error.message 
        },
        { status: 500 }
      )
    }
    
    return Response.json({ 
      success: true, 
      data: data || []
    })
  } catch (error) {
    console.error('API エラー:', error)
    return Response.json(
      { 
        success: false, 
        message: 'サーバーエラーが発生しました' 
      },
      { status: 500 }
    )
  }
}