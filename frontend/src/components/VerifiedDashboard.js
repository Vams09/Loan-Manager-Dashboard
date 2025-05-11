import React, { useEffect, useState } from 'react';
import './VerifiedDashboard.css';

const VerifiedDashboard = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchLoans = async () => {
    try {
      const res = await fetch('http://localhost:3001/loans');
      const data = await res.json();
      setLoans(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to load loan data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`http://localhost:3001/loans/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (!res.ok) throw new Error('Error updating status');

      await fetchLoans(); // refresh data
    } catch (err) {
      alert('Error updating status');
    }
  };

  return (
    <div className="verified-dashboard-container">
      <h2>Verifier Dashboard</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <table className="verified-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Tenure</th>
              <th>Status</th>
              <th>Reason</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id}>
                <td>{loan.id}</td>
                <td>{loan.full_name}</td>
                <td>{loan.loan_amount}</td>
                <td>{loan.loan_tenure} months</td>
                <td>
                  <span className={`status ${loan.status}`}>
                    {loan.status}
                  </span>
                </td>
                <td>{loan.reason}</td>
                <td>
                  {loan.status === 'pending' ? (
                    <>
                      <button
                        className="verify-btn"
                        onClick={() => updateStatus(loan.id, 'verified')}
                      >
                        Verify
                      </button>
                      <button
                        className="reject-btn"
                        onClick={() => updateStatus(loan.id, 'rejected')}
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <em>No actions</em>
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

export default VerifiedDashboard;