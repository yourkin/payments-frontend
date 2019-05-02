import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import TransferFunds from './TransferFundsComponent';
import History from './HistoryComponent';

function Main() {

    return (
        <div>
            <Header />
            <div>
                <Switch>
                    <Route path='/home/' component={TransferFunds} />
                    <Route path='/history/' component={History} />
                    <Redirect to='/home/' />
                </Switch>
            </div>
            <Footer />
        </div>
    );
}

export default withRouter(Main);
