import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, DollarSign, Package, Star } from 'lucide-react';

const styles = {
  container: {
    padding: '24px',
    background: 'linear-gradient(to bottom right, #f0f7ff, #f3e8ff)',
    minHeight: '100vh',
  },
  headerTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    background: 'linear-gradient(to right, #2563eb, #7c3aed)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '24px'
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '24px'
  },
  card: {
    borderRadius: '12px',
    padding: '20px',
    color: 'white',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  },
  salesCard: {
    background: 'linear-gradient(to bottom right, #3b82f6, #2563eb)',
  },
  ordersCard: {
    background: 'linear-gradient(to bottom right, #8b5cf6, #6d28d9)',
  },
  customersCard: {
    background: 'linear-gradient(to bottom right, #ec4899, #db2777)',
  },
  ratingCard: {
    background: 'linear-gradient(to bottom right, #6366f1, #4f46e5)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px'
  },
  cardTitle: {
    fontSize: '0.875rem',
    fontWeight: '500',
    opacity: '0.9'
  },
  cardValue: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '4px'
  },
  cardTrend: {
    fontSize: '0.75rem',
    opacity: '0.8'
  },
  chartCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '24px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  },
  chartHeader: {
    marginBottom: '20px'
  },
  chartTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '8px'
  },
  chartDescription: {
    fontSize: '0.875rem',
    color: '#6b7280'
  },
  tableCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  tableHeader: {
    background: 'linear-gradient(to right, #f5f3ff, #fce7f3)',
    padding: '16px',
    textAlign: 'left',
    color: '#374151'
  },
  tableRow: {
    borderBottom: '1px solid #e5e7eb',
    transition: 'background-color 0.2s'
  },
  tableCell: {
    padding: '16px',
    color: '#374151'
  },
  ratingBadge: {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '9999px',
    backgroundColor: '#dcfce7',
    color: '#166534',
    fontSize: '0.875rem',
    fontWeight: '500'
  }
};

const SellerAnalytics = () => {
  const performanceData = [
    { month: 'Jan', sales: 4000, orders: 240, customers: 150 },
    { month: 'Feb', sales: 3000, orders: 198, customers: 120 },
    { month: 'Mar', sales: 5000, orders: 300, customers: 180 },
    { month: 'Apr', sales: 4500, orders: 270, customers: 160 },
    { month: 'May', sales: 6000, orders: 350, customers: 200 },
    { month: 'Jun', sales: 5500, orders: 320, customers: 190 }
  ];

  const sellers = [
    {
      id: 1,
      name: "Fashion Store",
      totalSales: 45000,
      ordersCompleted: 1678,
      customerCount: 890,
      rating: 4.8
    },
    {
      id: 2,
      name: "Electronics Hub",
      totalSales: 72000,
      ordersCompleted: 2145,
      customerCount: 1200,
      rating: 4.5
    }
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.headerTitle}>Seller Analytics</h1>

      <div style={styles.cardGrid}>
        <div style={{...styles.card, ...styles.salesCard}}>
          <div style={styles.cardHeader}>
            <span style={styles.cardTitle}>Total Sales</span>
            <DollarSign size={16} color="rgba(255,255,255,0.8)" />
          </div>
          <div style={styles.cardValue}>$117,000</div>
          <div style={styles.cardTrend}>+12% from last month</div>
        </div>

        <div style={{...styles.card, ...styles.ordersCard}}>
          <div style={styles.cardHeader}>
            <span style={styles.cardTitle}>Total Orders</span>
            <Package size={16} color="rgba(255,255,255,0.8)" />
          </div>
          <div style={styles.cardValue}>3,823</div>
          <div style={styles.cardTrend}>+8% from last month</div>
        </div>

        <div style={{...styles.card, ...styles.customersCard}}>
          <div style={styles.cardHeader}>
            <span style={styles.cardTitle}>Total Customers</span>
            <Users size={16} color="rgba(255,255,255,0.8)" />
          </div>
          <div style={styles.cardValue}>2,090</div>
          <div style={styles.cardTrend}>+15% from last month</div>
        </div>

        <div style={{...styles.card, ...styles.ratingCard}}>
          <div style={styles.cardHeader}>
            <span style={styles.cardTitle}>Avg. Rating</span>
            <Star size={16} color="rgba(255,255,255,0.8)" />
          </div>
          <div style={styles.cardValue}>4.6</div>
          <div style={styles.cardTrend}>+0.2 from last month</div>
        </div>
      </div>

      <div style={styles.chartCard}>
        <div style={styles.chartHeader}>
          <div style={styles.chartTitle}>Sales Performance</div>
          <div style={styles.chartDescription}>Monthly sales and orders overview</div>
        </div>
        <div style={{ height: '320px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis yAxisId="left" stroke="#6b7280" />
              <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="sales" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="orders" 
                stroke="#ec4899" 
                strokeWidth={3}
                dot={{ fill: '#ec4899', strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={styles.tableCard}>
        <div style={styles.chartHeader}>
          <div style={styles.chartTitle}>Seller Performance</div>
          <div style={styles.chartDescription}>Detailed view of individual seller metrics</div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Seller Name</th>
                <th style={{...styles.tableHeader, textAlign: 'right'}}>Total Sales</th>
                <th style={{...styles.tableHeader, textAlign: 'right'}}>Orders</th>
                <th style={{...styles.tableHeader, textAlign: 'right'}}>Customers</th>
                <th style={{...styles.tableHeader, textAlign: 'right'}}>Rating</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((seller) => (
                <tr key={seller.id} style={styles.tableRow}>
                  <td style={styles.tableCell}>{seller.name}</td>
                  <td style={{...styles.tableCell, textAlign: 'right'}}>${seller.totalSales.toLocaleString()}</td>
                  <td style={{...styles.tableCell, textAlign: 'right'}}>{seller.ordersCompleted.toLocaleString()}</td>
                  <td style={{...styles.tableCell, textAlign: 'right'}}>{seller.customerCount.toLocaleString()}</td>
                  <td style={{...styles.tableCell, textAlign: 'right'}}>
                    <span style={styles.ratingBadge}>{seller.rating}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SellerAnalytics;