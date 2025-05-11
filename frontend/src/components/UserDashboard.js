import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserDashboard.css';
import { useAuth } from '../context/AuthContext';  // <-- Change here

const UserDashboard = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();  // <-- Change here

  const fetchLoans = async () => {
    try {
      const res = await axios.get('http://localhost:3001/loans');
      const userLoans = res.data.filter(
        (loan) => loan.full_name === user.name // match current user
      );
      setLoans(userLoans);
    } catch (err) {
      console.error('Error fetching loans:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchLoans();
    }
  });  // <-- Update to include user as a dependency

  return (
    <div className="user-dashboard">
      <h2>Your Loan Dashboard</h2>
      {loading ? (
        <p>Loading your loan data...</p>
      ) : (
        <table className="loan-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Tenure</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id}>
                <td>{loan.full_name}</td>
                <td>{loan.loan_amount}</td>
                <td>{loan.loan_tenure} months</td>
                <td>{loan.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserDashboard;