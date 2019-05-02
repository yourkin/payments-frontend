import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Transfer from './TransferComponent';
import History from './HistoryComponent';
import { fetchTransactions, setApiToken, unsetApiToken } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        transactions: state.transactions
    }
};

const mapDispatchToProps = dispatch => ({
    fetchTransactions: () => { dispatch(fetchTransactions()) }
});

class Main extends Component {

    componentDidMount() {
        this.props.fetchTransactions();
    }

    render() {

        const HistoryPage = () => {
            return (
                <History
                    transactions={this.props.transactions.transactions}
                    transactionsLoading={this.props.transactions.isLoading}
                    errMess={this.props.transactions.errMess}
                />
            );
        };

        return (
            <div>
                <Header />
                <div>
                    <Switch>
                        <Route path='/home/' component={Transfer} />
                        <Route path='/history/' component={HistoryPage} />
                        <Redirect to='/home/' />
                    </Switch>
                </div>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
