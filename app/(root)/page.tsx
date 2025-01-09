import BalanceBox from '@/components/BalanceBox';
import RightSideBar from '@/components/RightSideBar';

import HeaderBox from '@/components/ui/HeaderBox'
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import React from 'react'

const Dashboard = async () => {
    const loggedIn = await getLoggedInUser();
  
    if(!loggedIn) redirect('/sign-in')
    return (
        <section className="home">
        <div className="home-content">
          <header className="home-header">
                <HeaderBox
                type='greeting'
                title='Welcome'
                user={loggedIn?.name || 'Guest'}
                subtext='Manage your account and transactions'
                />
                <BalanceBox
                    accounts={[]}
                    totalBanks={1}
                    totalCurrentBalance={1337.24}
                />
            </header>
            RECENT
        </div>
        <RightSideBar 
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 420},{mask: 1234}]}
        />
    </section>
    )
}

export default Dashboard