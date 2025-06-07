/*=======================================
休日申請の画面
=======================================*/
import React from 'react';
import LeaveRequest from '@/components/LeaveRequest'

export default function Leave() {

    const Links ={
        1:'/request/leave/annualsalary'
        ,2:'/request/leave/compensatoryleave'
    }

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <h1 className="text-2xl font-semibold mb-6">休日申請</h1>
      <LeaveRequest id ={1} text = "年次有給申請" href={Links[1]} />
      <LeaveRequest id ={2} text = "代休申請" href={Links[2]} />
    </div>
  );

}