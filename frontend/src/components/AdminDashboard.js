import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLoans = async () => {
    try {
      const res = await axios.get('http://localhost:3001/loans');
      setLoans(res.data);
    } catch (err) {
      console.error('Error fetching loans:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`http://localhost:3001/loans/${id}`, { status });
      alert(`Loan ${status}`);
      fetchLoans(); // refresh data
    } catch (err) {
      alert('Error updating status');
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      {loading ? (
        <p>Loading loan applications...</p>
      ) : (
        <table className="loan-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Tenure</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id}>
                <td>{loan.full_name}</td>
                <td>{loan.loan_amount}</td>
                <td>{loan.loan_tenure} months</td>
                <td>{loan.status}</td>
                <td>
                  {loan.status === 'approved' ? (
                    <button className="verified-btn">Approved</button>
                  ) : (
                    <>
                      <button
                        className={`approve-btn ${loan.status === 'rejected' ? 'disabled' : ''}`}
                        onClick={() => updateStatus(loan.id, 'approved')}
                        disabled={loan.status === 'approved'}
                      >
                        Approve
                      </button>
                      <button
                        className={`reject-btn ${loan.status === 'approved' ? 'disabled' : ''}`}
                        onClick={() => updateStatus(loan.id, 'rejected')}
                        disabled={loan.status === 'rejected'}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;