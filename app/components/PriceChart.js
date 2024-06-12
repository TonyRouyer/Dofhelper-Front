import React from 'react';
import { Line } from 'react-chartjs-2';

const PriceChart = ({ priceHistory }) => {
  const data = {
    labels: priceHistory.map(entry => entry.date),
    datasets: [
      {
        label: 'Prix (en Kamas)',
        data: priceHistory.map(entry => entry.price),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return <Line data={data} />;
};

export default PriceChart;
