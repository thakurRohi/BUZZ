import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-purple-800 flex items-center justify-center p-4">
      <div className="bg-white/90 p-8 rounded-2xl shadow-xl w-full max-w-md backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Welcome Back</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            Login
          </button>
        </form>
        <div className="mt-6 space-y-2">
          <Link
            to="/forgot-password"
            className="block text-center text-primary hover:text-primary-dark transition-colors"
          >
            Forgot Password?
          </Link>
          <Link
            to="/signup"
            className="block text-center text-primary hover:text-primary-dark transition-colors"
          >
            Don't have an account? Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;