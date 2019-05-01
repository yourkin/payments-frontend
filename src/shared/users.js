export const USERS = [
    {
        "id": 1,
        "username": "andrew",
        "accounts": [
            {
                "uuid": "e9ad8d97-96f8-4e17-aa9a-093bee5817bb",
                "currency": "USD",
                "balance": "79.00"
            },
            {
                "uuid": "50e54c86-c990-4b46-82d3-5c801760cb39",
                "currency": "EUR",
                "balance": "8.00"
            }
        ],
        "transactions": [
            {
                "id": 2,
                "sent_amount": "10.00",
                "sender_account": "e9ad8d97-96f8-4e17-aa9a-093bee5817bb",
                "receiver_account": "50e54c86-c990-4b46-82d3-5c801760cb39"
            },
            {
                "id": 3,
                "sent_amount": "10.00",
                "sender_account": "50e54c86-c990-4b46-82d3-5c801760cb39",
                "receiver_account": "e9ad8d97-96f8-4e17-aa9a-093bee5817bb"
            },
            {
                "id": 4,
                "sent_amount": "5.00",
                "sender_account": "e9ad8d97-96f8-4e17-aa9a-093bee5817bb",
                "receiver_account": "8c3da2dd-ab11-47dc-93d3-17d1918f7d65"
            },
            {
                "id": 5,
                "sent_amount": "5.00",
                "sender_account": "e9ad8d97-96f8-4e17-aa9a-093bee5817bb",
                "receiver_account": "8c3da2dd-ab11-47dc-93d3-17d1918f7d65"
            }
        ]
    },
    {
        "id": 2,
        "username": "somebody",
        "accounts": [],
        "transactions": [
            {
                "id": 1,
                "sent_amount": "10.00",
                "sender_account": "e9ad8d97-96f8-4e17-aa9a-093bee5817bb",
                "receiver_account": "50e54c86-c990-4b46-82d3-5c801760cb39"
            }
        ]
    },
    {
        "id": 3,
        "username": "user3",
        "accounts": [
            {
                "uuid": "f6faff49-07f5-4044-85c5-91f385b9e6ad",
                "currency": "USD",
                "balance": "100.00"
            },
            {
                "uuid": "8c3da2dd-ab11-47dc-93d3-17d1918f7d65",
                "currency": "EUR",
                "balance": "8.50"
            },
            {
                "uuid": "688cc2aa-9d46-4347-a887-47c1c55b4eb3",
                "currency": "CNY",
                "balance": "0.00"
            }
        ],
        "transactions": [
            {
                "id": 5,
                "sent_amount": "5.00",
                "sender_account": "e9ad8d97-96f8-4e17-aa9a-093bee5817bb",
                "receiver_account": "8c3da2dd-ab11-47dc-93d3-17d1918f7d65"
            }
        ]
    }
];
