import React from 'react';
import { TRANSACTIONS } from '../shared/transactions';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

function History(props) {
    const data = TRANSACTIONS;
    const columns = [{
        dataField: 'id',
        text: 'Transaction ID',
        sort: true
    }, {
        dataField: 'sender_account',
        text: 'Sender',
        sort: true,
        filter: textFilter()
    }, {
        dataField: 'receiver_account',
        text: 'Receiver',
        sort: true,
        filter: textFilter()
    }, {
        dataField: 'sent_amount',
        text: 'Transfer Amount',
        sort: true
    }];

    return (
        <div className="container">
            <BootstrapTable keyField='id' data={ data } columns={ columns } bootstrap4 filter={ filterFactory() } />
        </div>
    )
}

export default History;