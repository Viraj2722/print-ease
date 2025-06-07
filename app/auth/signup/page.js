'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthLayout from '../../components/AuthLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, role: 'user' }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/auth/signin?message=Registration successful');
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create Account">
  <div className="flex justify-center items-center">
    <div className="w-full max-w-2xl bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg p-10 border border-[#C1C8E4]">
      <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-[#8B60D0] tracking-wide font-heading">
          Join PrintHub Today
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-md text-sm text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
          />
          <Input
            label="Phone Number"
            type="tel"
            placeholder="+91 9876543210"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            required
          />
        </div>

        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          required
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          required
        />

        <Button type="submit" disabled={loading}>
          {loading ? 'Creating account...' : 'Create Account'}
        </Button>

        <p className="text-sm text-center text-gray-600">
          Already a member?{' '}
          <Link
            href="/auth/signin"
            className="text-[#5680E9] hover:text-[#5AB9EA] font-medium"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  </div>
</AuthLayout>

  );
}
