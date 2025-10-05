import {
    Typography,
    Flex
} from 'antd';
import { useState, useContext } from 'react';

export default function CoinInfo({coin}) {
    return (
        <>
            <Flex align="center">
                <img
                    src={coin.icon}
                    alt={coin.name}
                    style={{
                        margin: '0 10px 0 0',
                        maxWidth: '40px',
                    }}
                />
                <Typography.Title level={2} style={{ margin: '0' }}>
                    ({coin.symbol}) {coin.name}
                </Typography.Title>
            </Flex>
        </>
    );
}
