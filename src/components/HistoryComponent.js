import React from 'react';
import { TRANSACTIONS } from '../shared/transactions';
import BootstrapTable from 'react-bootstrap-table-next';

function History(props) {
    const products = ['one', 'two', 'three'];
    const columns = [{
        dataField: 'id',
        text: 'Transaction ID'
    }, {
        dataField: 'name',
        text: 'Client Name'
    }, {
        dataField: 'amount',
        text: 'Transfer Amount'
    }];

    return (
        <div className="container">
            <BootstrapTable keyField='id' data={ products } columns={ columns } bootstrap4={ true } />
        </div>
    )
}

export default History;