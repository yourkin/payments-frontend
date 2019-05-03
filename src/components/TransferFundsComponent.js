import React, { Component } from 'react';
import {Button, Row, Col, Label, ModalHeader, ModalBody, FormGroup, Input, Modal} from 'reactstrap';
import { Control, Form, Errors } from 'react-redux-form';
import { USER } from '../shared/user';
import { Loading } from './LoadingComponent';
import { fetchAccounts } from '../redux/ActionCreators';
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { API_TOKEN } from "../shared/localStorage";

const mapStateToProps = state => {
    return {
        accounts: state.accounts
    }
};

const mapDispatchToProps = dispatch => ({
    fetchAccounts: () => { dispatch(fetchAccounts()) }
});

const required = (val) => val && val.length;

function TransferResults({results}){
    if (!results) {
        return (
            <div>No data</div>
        )
    } else {
        return (
            <div>
                <div>Date: {results.transaction_date}</div>
                <div>Sent amount: {results.sent_amount}</div>
                <div>Sender: {results.sender_username}</div>
                <div>Receiver: {results.receiver_username}</div>
                <div>From account: {results.sender_account}</div>
                <div>To account: {results.receiver_account}</div>
                <div>Sender currency: {results.sender_currency}</div>
                <div>Receiver currency: {results.receiver_currency}</div>
                <div>Commission: {results.commission}</div>
                <div>Conversion rate: {results.conversion_rate}</div>
                <div>Received amount: {results.received_amount}</div>
            </div>
        )
    }
}

class TransferFunds extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isResultModalOpen: false,
            transferRes: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleResultModal = this.toggleResultModal.bind(this);
    }

    toggleResultModal() {
        this.setState({
            isResultModalOpen: !this.state.isResultModalOpen
        });
    }

    componentWillMount() {
        this.props.fetchAccounts();
    }

    handleSubmit(values) {
        const token = localStorage.getItem(API_TOKEN);
        const body = JSON.stringify({
            'sender_account': values.sender,
            'receiver_account': values.receiver,
            'sent_amount': values.amount
        });
        fetch(baseUrl + 'transactions/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + token
            },
            body: body
        })
            .then(res => res.json())
            .then(json => {
                this.setState({transferRes: json});
                this.toggleResultModal();
            });
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
            <>
                <Modal isOpen={this.state.isResultModalOpen} toggle={this.toggleResultModal}>
                    <ModalHeader toggle={this.toggleResultModal}>Transaction Details</ModalHeader>
                    <ModalBody>
                        <TransferResults results={this.state.transferRes} />
                        <Button onClick={this.toggleResultModal} color="info">OK</Button>
                    </ModalBody>
                </Modal>

                <div className="container mb-5 mt-2">
                    <div className="row">
                        <div className="col-12 mb-4">
                            <h4>Transfer Funds</h4>
                        </div>
                        <div className="col-12 col-md-9">
                            <Form model="transfer" onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="sender" md={2}>From account:</Label>
                                    <Col md={4}>
                                        <Control.select className="form-control" model=".sender" id="sender"
                                                        defaultValue="" name="sender">
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
                                        <Control.text model=".amount" id="amount"
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
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransferFunds);