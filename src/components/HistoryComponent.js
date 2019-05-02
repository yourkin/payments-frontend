import React from 'react';
import { TRANSACTIONS } from '../shared/transactions';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, dateFilter } from 'react-bootstrap-table2-filter';

//     "conversion_rate": 0.9,
//     "received_amount": "9.00",

function History(props) {
    const dateFormatter = (date) => {
        return date;
    };
    const data = TRANSACTIONS;
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

    return (
        <div className="ml-md-5 mr-md-5">
            <BootstrapTable keyField='id' data={ data } columns={ columns } bootstrap4 filter={ filterFactory() } />
        </div>
    )
}

export default History;