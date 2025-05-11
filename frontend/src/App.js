import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // <-- Add this import
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import UserForm from './components/UserForm';
import AdminDashboard from './components/AdminDashboard';
import VerifiedDashboard from './components/VerifiedDashboard';
import UserDashboard from './components/UserDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider> {/* <-- Wrap your app with AuthProvider */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* Protected routes */}
          <Route element={<ProtectedRoute allowedRoles={['user']} />}>
            <Route path="/apply" element={<UserForm />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={['verified']} />}>
            <Route path="/verified" element={<VerifiedDashboard />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={['user']} />}>
            <Route path="/user" element={<UserDashboard />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
