'use client'
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


function LineChart(data) {

      const options = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      };

  return (
    <div className='w-[400px]'>
      <Line data={data.data} options={options} />
    </div>
  )
}

export default LineChart;