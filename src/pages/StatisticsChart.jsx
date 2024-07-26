/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StatisticsChart = ({ customerData, paymentData, offerData }) => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Customers',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: customerData,
      },
      {
        label: 'Payments',
        backgroundColor: 'rgba(255,99,132,0.6)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 2,
        data: paymentData,
      },
      {
        label: 'Offers',
        backgroundColor: 'rgba(153,102,255,0.6)',
        borderColor: 'rgba(153,102,255,1)',
        borderWidth: 2,
        data: offerData,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Statistics Chart',
      },
    },
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default StatisticsChart;
