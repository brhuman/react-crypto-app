import { Select, Space, Button, Layout, Modal, Drawer } from 'antd';
import { useContext, useState, useEffect } from 'react';
import CryptoContext from '../../context/crypto-context';
import CoinInfoModal from '../CoinInfoModal';
import AddAssetsForm from '../AddAssetsForm';


const headerStyle = {
    textAlign: 'center',
    color: '#000',
    lineHeight: '64px',
    backgroundColor: '#f1ffb7ff',
	display: 'flex',
	justifyContent: 'flex-start',
	alignItems: 'center'
};

const buttonSelectStyle = {
	padding: '4px 15px',
	borderRadius: '2px',
	fontWeight: '600',
	fontSize: '16px',
	marginLeft: '10px'
}


export function AppHeader() {
	const [select, setSelect] = useState(false)
	const [coin, setCoin] = useState(false)
	const [modal, setModal] = useState(false)
	const [openDrawer, setOpenDrawer] = useState(false);
	const { crypto } = useContext(CryptoContext)
	

	useEffect(() => {
		const keypress = event => {
			if(event.key === '/') {
				setSelect((prev) => !prev);
			}
		}
		document.addEventListener('keypress', keypress)
		return () => document.removeEventListener('keypress', keypress)
	})

	function handleSelect(value) {
		setCoin(crypto.find(c => c.id === value));
		setModal(true)
	}
	
	

	
    return (
        <Layout.Header style={headerStyle}>
            <Select
                open={select}
                style={{ width: '250px' }}
                onSelect={handleSelect}
                onClick={() => {
                    setSelect((prev) => !prev);
                }}
                value="press / to open"
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
            <Button
                type="primary"
                onClick={() => setOpenDrawer(true)}
                shape="circle"
                style={buttonSelectStyle}
            >
                Add Asset
            </Button>

            <Drawer
                title="Basic Drawer"
                closable={{ 'aria-label': 'Close Button' }}
                onClose={() => setOpenDrawer(false)}
                open={openDrawer}
                destroyOnHidden
                width={600}
            >
                <AddAssetsForm setOpenDrawer={setOpenDrawer}/>
            </Drawer>

            <Modal
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={modal}
                onCancel={() => setModal(false)}
                footer={null}
            >
                <CoinInfoModal coin={coin} />
            </Modal>
        </Layout.Header>
    );
}
