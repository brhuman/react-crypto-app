import { Layout, Typography } from 'antd';
import { useContext, useState, useEffect } from 'react';
import useCrypto from '../../context/crypto-context'
import CryptoContext from '../../context/crypto-context';
import PortfolioChart from '../PortfolioChart';
import AssetsTable from '../AssetsTable';

const contentStyle = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    color: '#000',
    backgroundColor: '#fffbf3ff',
};

export function AppContent() {
	const { crypto, assets } = useContext(CryptoContext)
	
	const cryptoPriceMap = crypto.reduce((acc, c) => {
		acc[c.id] = c.price
		return acc
	}, {})
	
	return (
        <Layout.Content style={contentStyle}>
            <Typography.Title level={3} style={{ padding: '10px' }}>
                Portfolio:{' '}
                {assets
                    .map((asset) => {
                        return asset.amount * cryptoPriceMap[asset.id];
                    })
                    .reduce((acc, v) => (acc += v), 0)
                    .toFixed(2)}
                $
            </Typography.Title>
            <PortfolioChart />
            <AssetsTable />
        </Layout.Content>
    );
}

