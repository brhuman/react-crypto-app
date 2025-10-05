import { Table } from 'antd';
import { useContext } from 'react';
import CryptoContext from '../context/crypto-context';

export default function AssetsTable(params) {
	const { assets } = useContext(CryptoContext);

	const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            showSorterTooltip: { target: 'full-header' },
            sortDirections: ['descend'],
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
            title: 'Coin Price',
            dataIndex: 'price',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            sorter: (a, b) => a.price - b.price,
        },
    ];

	

	const data = assets.map((a) => ({
        key: a.id,
        name: a.name,
        price: a.price,
        amount: a.amount,
    }));
	

	console.log('assets ' + assets)
	console.log('data: ' + data)

	const onChange = (pagination, filters, sorter, extra) => {
	  console.log('params', pagination, filters, sorter, extra);
	};

    return (
        <>
              <Table
					columns={columns}
					dataSource={data}
					onChange={onChange}
					showSorterTooltip={{ target: 'sorter-icon' }}
					style={{
						margin: '0 40px'
					}}
				/>
        </>
    );
}
