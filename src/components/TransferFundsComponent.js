import React, { Component } from 'react';
import { Button, Row, Col, Label } from 'reactstrap';
import { Control, Form, Errors } from 'react-redux-form';
import { USER } from '../shared/user';
import { Loading } from './LoadingComponent';
import { fetchAccounts } from '../redux/ActionCreators';
import { connect } from "react-redux";

const mapStateToProps = state => {
    return {
        accounts: state.accounts
    }
};

const mapDispatchToProps = dispatch => ({
    fetchAccounts: () => { dispatch(fetchAccounts()) }
});

const required = (val) => val && val.length;

class TransferFunds extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.props.fetchAccounts();
    }


    handleSubmit(values) {
        alert('Current State is: ' + JSON.stringify(values));
    }

    render () {
        const ownAccounts = USER.accounts.map((account) => {
            return (
                <option key={account.uuid} value={account.uuid}>{account.currency} (available: {account.balance})</option>
            )
        });

        const otherAccounts = this.props.accounts.accounts.map((account) => {
            return (
                <option key={account.uuid} value={account.uuid}>{account.client} ({account.currency})</option>
            )
        });

        return (
            <div className="container mb-5 mt-2">

                <div className="row">
                    <div className="col-12 mb-4">
                        <h4>Transfer Funds</h4>
                    </div>
                    <div className="col-12 col-md-9">
                        <Form model="transfer" onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="account" md={2}>From account:</Label>
                                <Col md={4}>
                                    <Control.select className="form-control" model=".account" id="account"
                                                    defaultValue="" name="account">
                                        <option value="" disabled>-------------------------------</option>
                                        {ownAccounts}
                                    </Control.select>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="receiver" md={2}>To account:</Label>
                                <Col md={4}>
                                    <Control.select className="form-control" defaultValue=""
                                                    model=".receiver" id="receiver" name="receiver">
                                        <option value="" disabled>-------------------------------</option>
                                        {otherAccounts}
                                    </Control.select>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="amount" md={2}>Amount:</Label>
                                <Col md={4}>
                                    <Control.text model=".amount" id="lastname"
                                                  name="amount" type="number"
                                                  className="form-control"  validators={{required}}/>
                                    <Errors className="text-danger" model=".amount"
                                            show="touched" messages={{required: 'Required'}}/>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Col md={{size:12, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Send
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransferFunds);