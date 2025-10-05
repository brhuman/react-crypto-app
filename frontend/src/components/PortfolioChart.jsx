import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { useContext } from 'react'
import CryptoContext from '../context/crypto-context'

ChartJS.register(ArcElement, Tooltip, Legend);



export default function PortfolioChart(params) {
	
	const { crypto, assets } = useContext(CryptoContext);
	// const ids = assets.map((asset) => {
	// 	return (
	// 		ids.push(asset.id)
	// 	)
	// })
	
	const data = {
        labels: assets.map((a) => { return a.name }),
        datasets: [
            {
                label: '$',
                data: assets.map((a) => { return a.totalAmount}),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                ],
            },
        ],
    };

	
    return (
        <div style={{
			display: 'flex',
			justifyContent: 'center',
			maxWidth: '400px',
			margin: '0 auto'
		}}>
            <Pie data={data} />;
        </div>
    );
}
