import React, { Component } from 'react';
import { TRANSACTIONS } from '../shared/transactions';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
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
            <BootstrapTable keyField='id' data={ products } columns={ columns } />
        </div>
    )
}

export default History;