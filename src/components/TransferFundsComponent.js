import React, { Component } from 'react';
import { Button, Row, Col, Label, ModalHeader, ModalBody, Modal } from 'reactstrap';
import { Control, Form, Errors } from 'react-redux-form';
import { fetchAccounts, transferFunds, toggleResultModal } from '../redux/ActionCreators';
import { connect } from "react-redux";

const mapStateToProps = state => {
    return {
        accounts: state.accounts,
        transfer: state.transfer,
        auth: state.auth,
        modals: state.modals
    }
};

const mapDispatchToProps = dispatch => ({
    fetchAccounts: () => { dispatch(fetchAccounts()) },
    transferFunds: (sender, receiver, amount) => { dispatch(transferFunds(sender, receiver, amount)) },
    toggleResultModal: () => { dispatch(toggleResultModal()) },

});

const required = (val) => val && val.length;

function TransferResults({results}) {
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

    componentDidMount() {
        this.props.fetchAccounts();
    }

    render () {

        const ownAccounts = this.props.accounts.accounts.filter((account) => account.client === 'andrew').map((account) => {
            return (
                <option key={account.uuid} value={account.uuid}>{account.currency} (available: {account.balance})</option>
            );
        });

        const otherAccounts = this.props.accounts.accounts.map((account) => {
            return (
                <option key={account.uuid} value={account.uuid}>{account.client} ({account.currency})</option>
            )
        });

        return (
            <>
                <Modal isOpen={this.props.modals.isResultOpen} toggle={this.props.toggleResultModal}>
                    <ModalHeader toggle={this.props.toggleResultModal}>Transaction Details</ModalHeader>
                    <ModalBody>
                        <TransferResults results={this.props.transfer.result} />
                        <Button onClick={this.props.toggleResultModal} color="info">OK</Button>
                    </ModalBody>
                </Modal>

                <div className="container mb-5 mt-2">
                    <div className="row">
                        <div className="col-12 mb-4">
                            <h4>Transfer Funds</h4>
                        </div>
                        <div className="col-12 col-md-9">
                            <Form model="transferForm" onSubmit={(values) => this.props.transferFunds(values.sender, values.receiver, values.amount)}>
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
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransferFunds);