/*=======================================
休日申請の画面
=======================================*/
import React from 'react';
import AnnualSalary from '@/components/correctionForm/AnnualSalary';
import CompensatoryLeave from '@/components/correctionForm/CompensatoryLeave';
// import LeaveRequest from '@/components/LeaveRequest'

export default function Leave() {

    // const Links ={
    //     1:'/request/leave/annualsalary'
    //     ,2:'/request/leave/compensatoryleave'
    // }

    return (
        <div>
            <div className="container mx-auto px-4 py-6 md:py-8">
                <h1 className="text-2xl font-semibold mb-6">休日申請</h1>
            </div>

            <div>
                <AnnualSalary></AnnualSalary>
            </div>

            <div>
                <CompensatoryLeave></CompensatoryLeave>
            </div>

        </div>
    );

}