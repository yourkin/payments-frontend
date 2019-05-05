import React, { Component } from 'react';
import { Button, Row, Col, Label, ModalHeader, ModalBody, Modal } from 'reactstrap';
import { Control, Form, Errors, actions } from 'react-redux-form';
import { fetchAccounts, transferFunds, toggleResultModal } from '../redux/ActionCreators';
import { connect } from 'react-redux';

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
    resetTransferForm: () => { dispatch(actions.reset('transferForm'))}

});

const required = (val) => val && val.length;
const isPositive = (val) => val && val > 0;

function TransferResults({results}) {
    if (!results) {
        return (
            <div className="text-danger">No data</div>
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

    handleSubmit(values) {
        this.props.transferFunds(values.sender, values.receiver, values.amount);
        this.props.resetTransferForm();
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
            );
        });

        const ErrMess = ({errMess}) => {
            if (errMess)
                return (
                    <div className="text-danger offset-2 pb-3">{errMess}</div>
                );
            else
                return null
        };

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
                            <Form model="transferForm" onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="sender" md={2}>From account:</Label>
                                    <Col md={4}>
                                        <Control.select className="form-control" model=".sender" id="sender"
                                                        defaultValue="" name="sender" validators={{required}}>
                                            <option value="" disabled>-------------------------------</option>
                                            {ownAccounts}
                                        </Control.select>
                                        <Errors className="text-danger" model=".sender" show="touched"
                                                messages={{required: 'Required'}}/>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="receiver" md={2}>To account:</Label>
                                    <Col md={4}>
                                        <Control.select className="form-control" defaultValue="" validators={{required}}
                                                        model=".receiver" id="receiver" name="receiver">
                                            <option value="" disabled>-------------------------------</option>
                                            {otherAccounts}
                                        </Control.select>
                                        <Errors className="text-danger" model=".receiver" show="touched"
                                                messages={{required: 'Required'}}/>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="amount" md={2}>Amount:</Label>
                                    <Col md={4}>
                                        <Control.text model=".amount" id="amount"
                                                      name="amount" type="number" step="any"
                                                      className="form-control"  validators={{required, isPositive}}/>
                                        <Errors className="text-danger" model=".amount"
                                                show="touched" messages={{
                                                    required: 'Required ',
                                                    isPositive: 'Amount must be a positive number '
                                                }}/>
                                    </Col>
                                </Row>
                                <ErrMess errMess={this.props.transfer.errMess} />
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