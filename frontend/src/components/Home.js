// components/Home.js
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Welcome to Credit App!</h1>
      <p>Your trusted partner in quick and easy loans.</p>
      <button onClick={() => navigate('/apply')} className="apply-button">
        Apply for a Loan
      </button>
    </div>
  );
}

export default Home;
