import {
    Select,
    Space,
    Form,
    Divider,
    Button,
    InputNumber,
    DatePicker,
	Result
} from 'antd';
import { useState, useContext, useRef } from 'react';
import CryptoContext from '../context/crypto-context';
import CoinInfo from './CoinInfo';

export default function AddAssetsForm({ openDrawer, setOpenDrawer }) {
    const [form] = Form.useForm();
    const [coin, setCoin] = useState(null);
    const [select, setSelect] = useState(false);
    const { crypto, addAsset } = useContext(CryptoContext);
    const [formFinished, setFormFinished] = useState(false);
	const assetRef = useRef()
    const validateMessages = {
        required: '${label} is required!',
        types: {
            number: '${label} is not valid',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    const onFinish = (values) => {
		const newAsset = {
			id: coin.id,
			amount: values.amount,
			price: values.price,
			date: values.date ?.$d ?? new Date(),
		}
		assetRef.current = newAsset
		console.log(values);
		console.log(newAsset);
		console.log(assetRef);
        setFormFinished(true);
		addAsset(newAsset);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    function handleSelect(value) {
        setCoin(crypto.find((c) => c.id === value));
    }

    if (!coin) {
        return (
            <Select
                style={{ width: '100%' }}
                onSelect={handleSelect}
                onClick={() => {
                    setSelect((prev) => !prev);
                }}
                placeholder="Select coin"
                options={crypto.map((coin) => ({
                    label: coin.name,
                    value: coin.id,
                    emoji: coin.icon,
                }))}
                optionRender={(option) => (
                    <Space>
                        <img
                            src={option.data.emoji}
                            style={{ maxWidth: '20px' }}
                            alt={option.data.label}
                        />
                        {option.data.label}
                    </Space>
                )}
            />
        );
    }

    if (formFinished) {
        return (
            <Result
                status="success"
                title="New Asset Added"
                subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
                extra={[
                    <Button
                        type="primary"
                        key="console"
                        onClick={() => {
                            setOpenDrawer(false);
                        }}
                    >
                        Close
                    </Button>,
                ]}
            />
        );
    }

    function handleAmount(value) {
        const price = form.getFieldValue('price');
        form.setFieldsValue({
            total: +(value * price).toFixed(2),
        });
    }
    function handlePriceChange(value) {
        const amount = form.getFieldValue('amount');
        form.setFieldsValue({
            total: +(value * amount).toFixed(2),
        });
    }
    if (!formFinished) {
        return (
            <>
				<CoinInfo coin={coin}/>
               
                <Divider />
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 10 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{
                        price: coin.price.toFixed(2),
                        // total: amount,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    validateMessages={validateMessages}
                >
                    <Form.Item
                        label="Amount"
                        name="amount"
                        rules={[
                            {
                                required: true,
                                type: 'number',
                                min: 0,
                            },
                        ]}
                    >
                        <InputNumber
                            onChange={handleAmount}
                            placeholder="Enter coin amonut"
                            style={{ width: '100%' }}
                        />
                    </Form.Item>

                    <Form.Item label="Price" name="price">
                        <InputNumber
                            style={{ width: '100%' }}
                            onChange={handlePriceChange}
                        />
                    </Form.Item>

                    <Form.Item label="Total" name="total">
                        <InputNumber style={{ width: '100%' }} disabled />
                    </Form.Item>

                    <Form.Item labelWrap label="Date and Time 123" name="date">
                        <DatePicker showTime style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit">
                            Add Assets
                        </Button>
                    </Form.Item>
                </Form>
            </>
        );
    }
}
