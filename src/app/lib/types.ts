// セレクトしたTBのデータの型定義
export interface User {
    id: bigint
    firstName: string
    email: string
    password: string
    createdDate: Date
    affiliationFlg: number
    lastName: string
    companyCode: string
    joiningDate: Date
    retirementDate: Date | null
  }

// パスワードを除外したユーザー情報の型
export interface UserWithoutPassword {
    id: bigint
    firstName: string
    email: string
    createdDate: Date
    affiliationFlg: number
    lastName: string
    companyCode: string
    joiningDate: Date
    retirementDate: Date | null
  }

  export interface AttendanceRecord {
    id: bigint
    userId: string
    clockIn: Date
    clockOut: Date
    modifyDate: Date
  }
  
  export interface ApiResponse<T> {
    data: T | null
    error: string | null
  }