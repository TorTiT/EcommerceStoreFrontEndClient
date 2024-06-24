import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSoldProducts,
  fetchProductsInStock,
} from "../redux/slices/statisticsSlice";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const StatisticsPage = () => {
  const dispatch = useDispatch();
  const { soldProducts, productsInStock, status, error } = useSelector(
    (state) => state.statistics,
  );

  useEffect(() => {
    dispatch(fetchSoldProducts());
    dispatch(fetchProductsInStock());
  }, [dispatch]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  const renderCustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded border border-gray-200 bg-white p-2">
          <p className="text-sm font-semibold">{data.productName}</p>
          <p className="text-sm">Total Sold: {data.totalSold}</p>
          <p className="text-sm">
            Percentage:{" "}
            {(
              (data.totalSold /
                soldProducts.reduce((acc, item) => acc + item.totalSold, 0)) *
              100
            ).toFixed(2)}
            %
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="container mx-auto p-4">
        <h1 className="mb-6 text-3xl font-bold text-blue-600">Statistics</h1>
        <div className="mb-6 rounded-lg bg-gray-200 p-6">
          <h2 className="mb-4 text-2xl font-semibold">Sold Products</h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                dataKey="totalSold"
                data={soldProducts}
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                label={(entry) => `${entry.productName} (${entry.totalSold})`}
              >
                {soldProducts.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || "#82ca9d"} />
                ))}
              </Pie>
              <Tooltip content={renderCustomTooltip} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-lg bg-gray-200 p-6">
          <h2 className="mb-4 text-2xl font-semibold">Products In Stock</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={productsInStock}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="stock" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
