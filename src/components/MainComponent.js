import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter, Link } from 'react-router-dom';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import TransferFunds from './TransferFundsComponent';
import History from './HistoryComponent';
import Accounts from './AccountsComponent';
import { connect } from 'react-redux';
import { toggleLoginModal, toggleRegisterModal } from "../redux/ActionCreators";

const mapStateToProps = state => {
    return {
        auth: state.auth,
        modals: state.modals
    }
};

const mapDispatchToProps = dispatch => ({
    toggleLoginModal: () => { dispatch(toggleLoginModal()) },
    toggleRegisterModal: () => { dispatch(toggleRegisterModal()) }
});

class Main extends Component {

    render () {

        const NoAuth = () => {
            return (
                <div className="card mb-5 mt-2">
                    <div className="card-body my-5 pb-3">
                        Please <Link to="#" onClick={this.props.toggleLoginModal}>login</Link> or <Link
                        to="#" onClick={this.props.toggleRegisterModal}>register</Link> to use our service
                    </div>
                </div>
            )
        };

        const RenderRoutes = () => {

            if (this.props.auth.isLoggedIn)
                return (
                    <div>
                        <Switch>
                            <Route path='/accounts/' component={Accounts} />
                            <Route path='/transfer/' component={TransferFunds} />
                            <Route path='/history/' component={History} />
                            <Redirect to='/accounts/' />
                        </Switch>
                    </div>
                );
            else
                return (
                    <div className="container my-5">
                        <div className="row justify-content-center">
                            <div className="col-8 text-center">
                                <NoAuth />
                            </div>
                        </div>
                    </div>
                );
        };

        return (
            <div>
                <Header />
                <RenderRoutes />
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
