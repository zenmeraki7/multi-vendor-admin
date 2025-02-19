import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('yearly');
  
  const data = [
    { month: 'Jan', orders: 4000, cancellations: 2400 },
    { month: 'Feb', orders: 3000, cancellations: 1398 },
    { month: 'Mar', orders: 2000, cancellations: 9800 },
    { month: 'Apr', orders: 2780, cancellations: 3908 },
    { month: 'May', orders: 1890, cancellations: 4800 },
    { month: 'Jun', orders: 2390, cancellations: 3800 }
  ];

  const cardStyle = {
    background: 'white',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px'
  };

  const gradientCardStyles = [
    {
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      color: 'white'
    },
    {
      background: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
      color: 'white'
    },
    {
      background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
      color: 'white'
    },
    {
      background: 'linear-gradient(135deg, #f97316 0%, #facc15 100%)',
      color: 'white'
    }
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f3f4f6 0%, #f0f7ff 100%)',
      padding: '24px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header Section */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <div>
            <h1 style={{ 
              fontSize: '24px', 
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #6366f1, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Dashboard Overview</h1>
            <p style={{ color: '#666' }}>Welcome back, Admin</p>
          </div>
          
          <div style={{ display: 'flex', gap: '16px' }}>
            <input 
              type="text" 
              placeholder="Search..." 
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                outline: 'none'
              }}
            />
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                outline: 'none'
              }}
            >
              <option value="yearly">Yearly</option>
              <option value="monthly">Monthly</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '20px',
          marginBottom: '24px'
        }}>
          {['Total Orders', 'Cancelled Orders', 'New Sellers', 'Total Revenue'].map((title, index) => (
            <div key={title} style={{
              ...cardStyle,
              ...gradientCardStyles[index]
            }}>
              <div style={{ marginBottom: '12px' }}>{title}</div>
              <div style={{ 
                fontSize: '24px', 
                fontWeight: 'bold',
                marginBottom: '8px'
              }}>
                {index === 3 ? '$45,678' : '3,457'}
              </div>
              <div style={{ 
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center'
              }}>
                +12.5% vs last month
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
          {/* Main Chart */}
          <div style={cardStyle}>
            <h2 style={{ 
              fontSize: '18px', 
              fontWeight: 'bold',
              marginBottom: '20px'
            }}>Sales Overview</h2>
            <div style={{ height: '400px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="orders" 
                    stroke="#6366f1" 
                    strokeWidth={3}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="cancellations" 
                    stroke="#ec4899" 
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Popular Products */}
          <div style={cardStyle}>
            <h2 style={{ 
              fontSize: '18px', 
              fontWeight: 'bold',
              marginBottom: '20px'
            }}>Popular Products</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { name: 'CHANELL GABRIELLE', sales: '$5,461' },
                { name: 'Canon EOS R50', sales: '$4,875' },
                { name: 'Apple iPad Air', sales: '$3,543' },
                { name: 'Blaupunkt Speaker', sales: '$2,842' }
              ].map((product, index) => (
                <div key={index} style={{
                  padding: '12px',
                  background: 'linear-gradient(135deg, #f3f4f6 0%, #f9fafb 100%)',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontWeight: '500' }}>{product.name}</span>
                  <span style={{ color: '#6366f1', fontWeight: 'bold' }}>{product.sales}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Sellers Section */}
        <div style={cardStyle}>
          <h2 style={{ 
            fontSize: '18px', 
            fontWeight: 'bold',
            marginBottom: '20px'
          }}>Top Sellers</h2>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px'
          }}>
            {[
              { name: 'John Doe', revenue: '$12,345', color: '#6366f1' },
              { name: 'Jane Smith', revenue: '$10,890', color: '#ec4899' },
              { name: 'Mike Ross', revenue: '$9,765', color: '#3b82f6' },
              { name: 'Emma Brown', revenue: '$8,654', color: '#f97316' }
            ].map((seller, index) => (
              <div key={index} style={{
                padding: '16px',
                borderRadius: '8px',
                background: `linear-gradient(135deg, ${seller.color}20 0%, ${seller.color}10 100%)`,
                border: `1px solid ${seller.color}30`
              }}>
                <div style={{ 
                  fontWeight: '500',
                  marginBottom: '8px'
                }}>{seller.name}</div>
                <div style={{ 
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: seller.color
                }}>{seller.revenue}</div>
                <div style={{ 
                  fontSize: '14px',
                  color: '#22c55e',
                  marginTop: '4px'
                }}>+12.5% vs last month</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;