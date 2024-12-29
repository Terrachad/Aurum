import BalanceBox from '@/components/BalanceBox';
import RightSideBar from '@/components/RightSideBar';

import HeaderBox from '@/components/ui/HeaderBox'
import React from 'react'

const Dashboard = () => {
    const loggedIn = {firstName:'Vladyslav', lastName: 'Olshevskyi', email: 'olshevkyi.work@gmail.com'};
    return (
        <section className="home">
        <div className="home-content">
          <header className="home-header">
                <HeaderBox
                type='greeting'
                title='Welcome'
                user={loggedIn?.firstName || 'Guest'}
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
        banks={[{},{}]}
        />
    </section>
    )
}

export default Dashboard