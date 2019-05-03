import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { connect } from "react-redux";
import { fetchUserData } from '../redux/ActionCreators';
import {Loading} from "./LoadingComponent";

const mapStateToProps = state => {
    return {
        userData: state.userData
    }
};

const mapDispatchToProps = dispatch => ({
    fetchUserData: () => { dispatch(fetchUserData()) }
});

function RenderTable({data, isLoading, errMess}) {

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

        const row = data.accounts.map((account, index) => {
            return (
                <tr>
                    <th scope="row">{index+1}</th>
                    <td>{account.uuid}</td>
                    <td>{account.currency}</td>
                    <td>{account.balance}</td>
                </tr>
            );
        });

        return (
            <Table>
                <thead>
                <tr>
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

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //
    //     }
    // }

    componentDidMount() {
        this.props.fetchUserData();
    }

    render() {
        return (
            <div className="container">
                <RenderTable
                    data={this.props.userData.userData}
                    isLoading={this.props.userData.isLoading}
                    errMess={this.props.userData.errMess}
                />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);