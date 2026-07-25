import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,

  LinearScale,

  PointElement,

  LineElement,

  Title,

  Tooltip,

  Legend,
);

function SalesChart({ orders }) {
  const data = {
    labels: orders.map((order) =>
      new Date(order.createdAt).toLocaleDateString(),
    ),

    datasets: [
      {
        label: "Revenue TND",

        data: orders.map((order) => order.totalPrice),

        tension: 0.3,
      },
    ],
  };

  return (
    <div className="card  p-4 mt-4">
     <h4>
  <i className="bi bi-graph-up-arrow me-2"></i>
  Sales Overview
</h4>

      <Line data={data} />
    </div>
  );
}

export default SalesChart;
