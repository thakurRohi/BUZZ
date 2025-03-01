import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-purple-800 flex items-center justify-center p-4">
      <div className="bg-white/90 p-8 rounded-2xl shadow-xl w-full max-w-md backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Create Account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            Sign Up
          </button>
        </form>
        <Link
          to="/"
          className="block mt-6 text-center text-primary hover:text-primary-dark transition-colors"
        >
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
}

export default SignUp;