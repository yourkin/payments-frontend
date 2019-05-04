import React, { Component }  from 'react';
import { Table } from 'reactstrap';
import { Loading } from "./LoadingComponent";
import { connect } from "react-redux";
import { fetchUserData } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        userData: state.userData,
        auth: state.auth
    }
};

const mapDispatchToProps = dispatch => ({
    fetchUserData: () => { dispatch(fetchUserData()) }
});

function RenderTable({userData, isLoading, errMess}) {

    if (isLoading) {
        return (
            <Loading />
        );
    }
    else if (errMess) {
        return (
            <h4>{errMess}</h4>
        )

    } else {
        const row = userData.accounts.map((account, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>{account.uuid}</td>
                    <td>{account.currency}</td>
                    <td>{account.balance}</td>
                </tr>
            );
        });

        return (
            <Table className="my-5">
                <thead>
                <tr className="my-5">
                    <th>#</th>
                    <th>Account</th>
                    <th>Currency</th>
                    <th>Balance</th>
                </tr>
                </thead>
                <tbody>
                {row}
                </tbody>
            </Table>
        )
    }
}

class Accounts extends Component {

    componentDidMount() {
        this.props.fetchUserData(this.props.auth.uuid);
    }

    render () {
        return (
            <div className="container">
                <RenderTable
                    userData={this.props.userData.userData}
                    isLoading={this.props.userData.isLoading}
                    errMess={this.props.userData.errMess}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
