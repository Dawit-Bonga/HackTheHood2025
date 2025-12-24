import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from './ui/Button';
import Card from './ui/Card';
import { Input, Select } from './ui/Input';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [grade, setGrade] = useState('9');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password, fullName, grade);
      }
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-secondary)] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-[var(--color-text-primary)] mb-2">
            {isLogin ? 'Welcome Back' : 'Create Your Account'}
          </h2>
          <p className="text-[var(--color-text-secondary)]">
            {isLogin 
              ? 'Sign in to continue your college journey' 
              : 'Start your path to college success today'
            }
          </p>
        </div>

        <Card variant="elevated" padding="lg">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start gap-3">
              <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">{error}</span>
            </div>
          )}
          
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full mb-6 bg-white border-2 border-[var(--color-border)] text-[var(--color-text-primary)] py-3 rounded-lg font-medium hover:bg-[var(--color-bg-secondary)] hover:border-[var(--color-text-muted)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--color-border)]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-[var(--color-text-muted)]">Or continue with email</span>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <>
                <Input
                  label="Full Name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  required
                />
                
                <Select
                  label="Current Grade"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                >
                  <option value="9">9th Grade</option>
                  <option value="10">10th Grade</option>
                  <option value="11">11th Grade</option>
                  <option value="12">12th Grade</option>
                  <option value="Community college">Community College</option>
                  <option value="other">Other</option>
                </Select>
              </>
            )}
            
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
            
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isLogin ? "Enter your password" : "Create a password (min. 6 characters)"}
              helperText={!isLogin && "Use at least 6 characters for better security"}
              required
              minLength="6"
            />
            
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="loading-spinner"></span>
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </span>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </Button>
          </form>
        </Card>
        
        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
