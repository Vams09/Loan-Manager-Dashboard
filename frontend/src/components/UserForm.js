import { useState } from 'react';
import axios from 'axios';
import './UserForm.css';

function UserForm() {
  const [formData, setFormData] = useState({
    full_name: '',
    loan_tenure: '',
    loan_amount: '',
    reason: '',
    employment_status: '',
    employment_address1: '',
    employment_address2: '',
  });

  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/loans', formData);
      alert('Application submitted successfully!');
    } catch (error) {
  console.error(error); // log full error to browser console
  alert('Failed to submit loan application: ' + (error.response?.data?.error || error.message || 'Unknown error'));
}
  };

  return (
    <div className="form-container">
      <h2>APPLY FOR A LOAN</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-pairs">
            <label htmlFor="fullName">Full name as appears on bank account</label>
            <input
              name="full_name"
              id="fullName"
              placeholder="Full name as appears on bank account"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-pairs">
            <label htmlFor="loan_amount">How much do you need?</label>
            <input
              name="loan_amount"
              id="loanAmount"
              placeholder="How much do you need?"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-pairs">
            <label htmlFor="loan_tenure">Loan tenure (in months)</label>
            <input
              name="loan_tenure"
              id="loanTenure"
              placeholder="Loan tenure (in months)"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-pairs">
            <label htmlFor="employment_status">Employment status</label>
            <input
              name="employment_status"
              id="employmentStatus"
              placeholder="Employment status"
              onChange={handleChange}
              required
            />
          </div>
          <label htmlFor="reason">Reason for loan</label>
          <textarea
            name="reason"
            id="reason"
            placeholder="Reason for loan"
            onChange={handleChange}
            required
          />
          <div className="form-pairs">
            <label htmlFor="employment_address1">Employment address 1</label>
            <input
              name="employment_address1"
              id="employmentAddress1"
              placeholder="Employment address"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-pairs">
            <label htmlFor="employment_address2">Employment address 2</label>
            <input
              name="employment_address2"
              id="employmentAddress2"
              placeholder="Employment address"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="checkboxes">
          <input
            className="chk"
            id="checkbox1"
            type="checkbox"
            checked={checkbox1}
            onChange={() => setCheckbox1(!checkbox1)}
          />
          <label className="checkbox-label" htmlFor="checkbox1">
            I have read the important information and accept the terms.
          </label>
          <input
            className="chk"
            id="checkbox2"
            type="checkbox"
            checked={checkbox2}
            onChange={() => setCheckbox2(!checkbox2)}
          />
          <label htmlFor="checkbox2">
            I consent to sharing credit information with reporting agencies.
          </label>
        </div>
        <div className="button-adjust">
          <button type="submit" disabled={!(checkbox1 && checkbox2)}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;