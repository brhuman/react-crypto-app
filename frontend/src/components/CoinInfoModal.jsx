import { Flex, Divider, Typography, Tag } from 'antd'
import CoinInfo from './CoinInfo';

export default function CoinInfoModal({coin}) {
	return (
        <>
            <CoinInfo coin={coin}/>
            <Divider />
            <Typography.Paragraph strong>
                <Typography.Text>1 hour price change: </Typography.Text>
                <Tag color={coin.priceChange1h > 0 ? 'green' : 'red'}>
                    {coin.priceChange1h}%
                </Tag>
            </Typography.Paragraph>
            <Typography.Paragraph strong>
                <Typography.Text>1 day price change: </Typography.Text>
                <Tag color={coin.priceChange1d > 0 ? 'green' : 'red'}>
                    {coin.priceChange1d}%
                </Tag>
            </Typography.Paragraph>
            <Typography.Paragraph strong>
                <Typography.Text>1 week price change: </Typography.Text>
                <Tag color={coin.priceChange1w > 0 ? 'green' : 'red'}>
                    {coin.priceChange1w}%
                </Tag>
            </Typography.Paragraph>
            <Typography.Paragraph strong>
                <Typography.Text>Price: </Typography.Text>
                {coin.price.toFixed(2)}$
            </Typography.Paragraph>
            <Typography.Paragraph strong>
                <Typography.Text>Price BTC: </Typography.Text>
                {coin.priceBtc}
            </Typography.Paragraph>
            <Typography.Paragraph strong>
                <Typography.Text>Market Capital: </Typography.Text>
                {coin.marketCap}$
            </Typography.Paragraph>
            {coin.contractAddress && (
				<Typography.Paragraph strong>
					<Typography.Text>Contact Adress: </Typography.Text>
					{coin.contractAddress}
				</Typography.Paragraph>)
			}
        </>
    );
}