import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

const TransactionPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const transactions = [
    {
      id: 'ORD-2025-001',
      date: 'Feb 12, 2025',
      vendor: 'Vendor A',
      items: 'iPhone 15 Pro',
      amount: 999.00,
      status: 'completed'
    },
    {
      id: 'ORD-2025-002',
      date: 'Feb 11, 2025',
      vendor: 'Vendor B',
      items: 'MacBook Air M3',
      amount: 1299.00,
      status: 'pending'
    },
    {
      id: 'ORD-2025-003',
      date: 'Feb 10, 2025',
      vendor: 'Vendor C',
      items: 'AirPods Pro',
      amount: 249.00,
      status: 'cancelled'
    }
  ];

  const StatusBadge = ({ status }) => {
    const styles = {
      completed: { backgroundColor: '#dcfce7', color: '#166534' },
      pending: { backgroundColor: '#fef9c3', color: '#854d0e' },
      cancelled: { backgroundColor: '#fee2e2', color: '#991b1b' }
    };

    return (
      <span style={{
        ...styles[status],
        padding: '4px 12px',
        borderRadius: '9999px',
        fontSize: '14px',
        fontWeight: 500,
        display: 'inline-block'
      }}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      padding: '32px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        padding: '24px'
      }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: 600,
          marginBottom: '24px',
          color: '#111827'
        }}>Transaction History</h1>

        {/* Filters */}
        <div style={{
          marginBottom: '24px',
          padding: '16px',
          backgroundColor: '#f9fafb',
          borderRadius: '8px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <select style={{
            padding: '8px 12px',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            backgroundColor: 'white'
          }}>
            <option>All Vendors</option>
            <option>Vendor A</option>
            <option>Vendor B</option>
            <option>Vendor C</option>
          </select>
          
          <select style={{
            padding: '8px 12px',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            backgroundColor: 'white'
          }}>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>This Year</option>
          </select>
          
          <div style={{
            position: 'relative',
            flexGrow: 1
          }}>
            <Search style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9ca3af'
            }} />
            <input
              type="text"
              placeholder="Search transactions..."
              style={{
                width: '100%',
                padding: '8px 12px 8px 40px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px'
              }}
            />
          </div>
        </div>

        {/* Transaction Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse'
          }}>
            <thead>
              <tr style={{
                borderBottom: '1px solid #e5e7eb',
                backgroundColor: '#f9fafb'
              }}>
                <th style={{ padding: '12px 24px', textAlign: 'left' }}>Date</th>
                <th style={{ padding: '12px 24px', textAlign: 'left' }}>Order ID</th>
                <th style={{ padding: '12px 24px', textAlign: 'left' }}>Vendor</th>
                <th style={{ padding: '12px 24px', textAlign: 'left' }}>Items</th>
                <th style={{ padding: '12px 24px', textAlign: 'right' }}>Amount</th>
                <th style={{ padding: '12px 24px', textAlign: 'center' }}>Status</th>
                <th style={{ padding: '12px 24px', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr 
                  key={transaction.id}
                  style={{
                    borderBottom: '1px solid #e5e7eb',
                    ':hover': { backgroundColor: '#f9fafb' }
                  }}
                >
                  <td style={{ padding: '16px 24px' }}>{transaction.date}</td>
                  <td style={{ padding: '16px 24px' }}>{transaction.id}</td>
                  <td style={{ padding: '16px 24px' }}>{transaction.vendor}</td>
                  <td style={{ padding: '16px 24px' }}>{transaction.items}</td>
                  <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                    ${transaction.amount.toFixed(2)}
                  </td>
                  <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                    <StatusBadge status={transaction.status} />
                  </td>
                  <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                    <button style={{
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      border: 'none',
                      cursor: 'pointer',
                      ':hover': { backgroundColor: '#2563eb' }
                    }}>
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{
          marginTop: '24px',
          display: 'flex',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <button 
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            style={{
              padding: '8px',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              backgroundColor: 'white',
              cursor: 'pointer'
            }}
          >
            <ChevronLeft />
          </button>
          
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              style={{
                padding: '8px 16px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                backgroundColor: currentPage === page ? '#3b82f6' : 'white',
                color: currentPage === page ? 'white' : 'black',
                cursor: 'pointer'
              }}
            >
              {page}
            </button>
          ))}
          
          <button 
            onClick={() => setCurrentPage(Math.min(3, currentPage + 1))}
            style={{
              padding: '8px',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              backgroundColor: 'white',
              cursor: 'pointer'
            }}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;