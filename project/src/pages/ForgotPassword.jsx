import { useState } from 'react';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('If an account exists with this email, you will receive password reset instructions.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-purple-800 flex items-center justify-center p-4">
      <div className="bg-white/90 p-8 rounded-2xl shadow-xl w-full max-w-md backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Reset Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            Send Reset Link
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-gray-600">{message}</p>
        )}
        <Link
          to="/"
          className="block mt-6 text-center text-primary hover:text-primary-dark transition-colors"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassword;