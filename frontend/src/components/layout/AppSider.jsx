import {
    Layout,
    Card,
    Statistic,
    Divider,
    Typography,
    List,
	Tag
} from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useContext } from 'react'
import { capitalazeFirstLetter } from '../../utils.js';
import CryptoContext from '../../context/crypto-context'


const { Title } = Typography;
const siderStyle = {
	padding: '1rem',
    textAlign: 'center',
    color: '#000',
    backgroundColor: '#43433bff',
}
const statisticStyle = {
	margin: '0 0 0px 0',
	textAlign: 'left'
}

export function AppSider() {
	const {assets} = useContext(CryptoContext);
	
	return (
        <>
            <Layout.Sider width="25%" style={siderStyle}>
                <Title level={2} style={{ color: '#fff' }}>
                    Sidebar
                </Title>

                {assets.map((asset) => (
                    <Card key={asset.id} style={{ marginBottom: '20px' }}>
                        <Statistic
                            style={statisticStyle}
                            title={capitalazeFirstLetter(asset.id)}
                            value={asset.totalAmount}
                            precision={2}
                            valueStyle={{
                                color: asset.grow ? '#3f8600' : 'red',
                            }}
                            prefix={
                                asset.grow ? (
                                    <ArrowUpOutlined />
                                ) : (
                                    <ArrowDownOutlined />
                                )
                            }
                            suffix="$"
                        />
                        <List
                            size="small"
                            dataSource={[
                                {
                                    title: 'Total Profit',
                                    value: asset.totalProfit,
                                    itemStyles: asset.grow ? 'green' : 'red',
                                    withTag: true,
                                },
                                {
                                    title: 'Asset Amount ',
                                    value: asset.amount,
                                    isPlain: true,
                                },
                            ]}
                            renderItem={(item) => (
                                <List.Item style={{padding: '10px 0px'}}>
                                    <span>
                                        {item.title}
                                        {item.withTag && (
                                            <Tag
                                                color={
                                                    asset.grow ? 'green' : 'red'
                                                }
                                                style={{ marginLeft: '10px' }}
                                            >
                                                {asset.growPercent}%
                                            </Tag>
                                        )}
                                    </span>
									<span style={{fontWeight: 700}}>
                                        {item.isPlain && (
                                            <span>{item.value}</span>
                                        )}
									</span>
                                    {!item.isPlain && (
                                        <span
                                            style={{ color: item.itemStyles }}
                                        >
                                            {item.value.toFixed(2)}$
                                        </span>
                                    )}
                                </List.Item>
                            )}
                        />
                        <Divider
                            variant="dashed"
                            style={{
                                borderColor: '#7cb305',
                                color: asset.grow ? '#3f8600' : 'red',
								margin: '10px 0 0 0'
                            }}
                            dashed
                        >
                            {asset.grow ? 'Up' : 'Down'}
                        </Divider>
                    </Card>
                ))}
            </Layout.Sider>
        </>
    );
}