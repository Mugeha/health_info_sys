import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import '../components/Analytics.css'; // you can style as needed

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Analytics = () => {
  const [data, setData] = useState(null);
    const navigate = useNavigate();
  

  useEffect(() => {
    const fetchAnalytics = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/analytics/summary', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res.data);
    };
    fetchAnalytics();
  }, []);

  if (!data) return <p>Loading analytics...</p>;

  return (
    <div className="analytics-container">
              <button onClick={() => navigate(-1)} className="back-button">← Back</button>

      <h2>📊 Client Analytics</h2>

      <div className="chart-section">
        <h3>Total Clients: {data.totalClients}</h3>
        <h3>Enrolled Clients: {data.enrolledClients}</h3>
        <h3>Total Programs: {data.totalPrograms}</h3>
      </div>

      <div className="chart-section">
        <h4>Gender Distribution</h4>
        <PieChart width={300} height={300}>
          <Pie
            data={Object.entries(data.genderBreakdown).map(([key, value]) => ({ name: key, value }))}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {Object.keys(data.genderBreakdown).map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      <div className="chart-section">
        <h4>Age Range Breakdown</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={Object.entries(data.ageRanges).map(([range, value]) => ({ range, count: value }))}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
