import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import TransferFunds from './TransferFundsComponent';
import History from './HistoryComponent';
import Accounts from './AccountsComponent';

class Main extends Component {

    render () {
        return (
            <div>
                <Header />
                <div>
                    <Switch>
                        <Route path='/accounts/' component={Accounts} />
                        <Route path='/transfer/' component={TransferFunds} />
                        <Route path='/history/' component={History} />
                        <Redirect to='/accounts/' />
                    </Switch>
                </div>
                <Footer />
            </div>
        );
    }
}

export default withRouter(Main);
