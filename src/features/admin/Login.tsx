import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Key, Trees } from 'lucide-react';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect to dashboard
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('apf_admin_logged_in') === 'true';
    if (isLoggedIn) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simple V1 authentication credentials
    setTimeout(() => {
      if (username.trim() === 'admin' && password === 'admin123') {
        sessionStorage.setItem('apf_admin_logged_in', 'true');
        navigate('/admin/dashboard');
      } else {
        setError('Invalid username or password. Use admin/admin123');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200/80 p-8 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="bg-primary text-white p-3 rounded-2xl w-14 h-14 flex items-center justify-center mx-auto shadow-md">
            <Trees className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold font-heading text-slate-900 tracking-tight">Admin Portal</h1>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1">Alokito Poribesh Foundation</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 text-xs font-semibold p-3.5 rounded-xl flex items-center space-x-2">
            <ShieldCheck className="h-4.5 w-4.5 text-red-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g. admin"
            required
            autoFocus
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          <Button 
            type="submit" 
            variant="primary" 
            className="w-full font-bold cursor-pointer pt-3 pb-3"
            isLoading={loading}
          >
            <Key className="h-4 w-4 mr-2" />
            Authenticate
          </Button>
        </form>

        <div className="text-center">
          <Link to="/" className="text-xs font-bold text-slate-400 hover:text-primary transition-colors">
            &larr; Back to Public Website
          </Link>
        </div>

      </div>
    </div>
  );
};

// Simple link import wrapper
import { Link } from 'react-router-dom';
export default Login;
