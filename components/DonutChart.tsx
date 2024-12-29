'use client'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);



const DonutChart = ({accounts} : DoughnutChartProps) => {
    const data = {
        datasets: [{
            label: 'Banks',
            data: [1250, 2000, 420],
            backgroundColor: ['#0747b7', '#2265d8', '#2f91fa']
        }],
    
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Intesa SanPaolo',
            'UNICREDIT',
            'UBI'
        ]
    };
  return (
    
    <Doughnut data={data} 
    options={{
        cutout: '60%',
        plugins: {
            legend: {
                display: false
            }
        }
    }}
    />
  )
}

export default DonutChart