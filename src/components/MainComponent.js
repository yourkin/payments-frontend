import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Transfer from './TransferComponent';
import History from './HistoryComponent';
import { fetchTransactions} from '../redux/ActionCreators';

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

        return (
            <div>
                <Header />
                <div>
                    <Switch>
                        <Route path='/home/' component={Transfer} />
                        <Route path='/history/' component={History} />
                    </Switch>
                </div>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
