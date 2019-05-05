import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { Loading } from './LoadingComponent';
import { ErrorDisplay } from './ErrorDisplayComponent';
import { fetchTransactions } from '../redux/ActionCreators';
import { connect } from "react-redux";

const mapStateToProps = state => {
    return {
        transactions: state.transactions
    }
};

const mapDispatchToProps = dispatch => ({
    fetchTransactions: () => { dispatch(fetchTransactions()) }
});

function RenderHistory({data, isLoading, errMess}) {

    const dateFormatter = (date) => {
        return date;
    };

    const columns = [{
        dataField: 'transaction_date',
        text: 'Date',
        sort: true,
        formatter: dateFormatter()
    }, {
        dataField: 'sender_username',
        text: 'Sender',
        sort: true,
        filter: textFilter()
    }, {
        dataField: 'sender_currency',
        text: 'Sender Currency',
        sort: true,
        filter: textFilter()
    }, {
        dataField: 'sent_amount',
        text: 'Sent Amount',
        sort: true,
        filter: textFilter()
    }, {
        dataField: 'receiver_username',
        text: 'Receiver',
        sort: true,
        filter: textFilter()
    }, {
        dataField: 'commission',
        text: 'Commission',
        sort: true,
        filter: textFilter()
    }, {
        dataField: 'receiver_currency',
        text: 'Receiver Currency',
        sort: true,
        filter: textFilter()
    }, {
        dataField: 'conversion_rate',
        text: 'Conversion Rate',
        sort: true,
        filter: textFilter()
    }, {
        dataField: 'received_amount',
        text: 'Received Amount',
        sort: true,
        filter: textFilter()
    }];

    if (isLoading) {
        return (
            <Loading />
        );
    }
    else if (errMess) {
        return (
            <ErrorDisplay errMess={errMess} />
        )
    }
    else
        return (
            <div className="ml-md-5 mr-md-5">
                <BootstrapTable keyField='id' data={ data } columns={ columns } bootstrap4 filter={ filterFactory() } />
            </div>
        )
}

class History extends Component {

    componentDidMount() {
        this.props.fetchTransactions();
    }

    render () {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <RenderHistory
                            data={this.props.transactions.transactions}
                            isLoading={this.props.transactions.isLoading}
                            errMess={this.props.transactions.errMess}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(History);