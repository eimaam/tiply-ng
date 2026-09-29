import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrandLogo } from '../../../components/ui/BrandLogo';
import { ArrowRight } from 'lucide-react';
import { useToast } from '../../../components/ui/Toast';
import { Input, PasswordInput, Button } from '@tiply-ng/shared';

export default function LoginPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('imam@tiply.ng');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast('success', 'Welcome back, Imam!');
      navigate('/app/overview');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-stone-50/70 text-zinc-900 font-sans flex flex-col justify-between p-4 sm:p-8 selection:bg-emerald-100 selection:text-emerald-900">
      <header className="max-w-md mx-auto w-full pt-4">
        <BrandLogo size="md" />
      </header>

      <main className="max-w-sm mx-auto w-full py-8">
        <div className="bg-white rounded-2xl border border-stone-200/90 p-7 shadow-xs space-y-6">
          <div className="space-y-1 text-left">
            <h1 className="text-xl font-bold text-zinc-950">Welcome back</h1>
            <p className="text-xs text-zinc-500">Sign in to manage your tip page.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-1.5">
                Email
              </label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-zinc-600 uppercase tracking-wider">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-emerald-700 hover:text-emerald-800 font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <PasswordInput
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <div className="pt-2">
              <Button
                htmlType="submit"
                variant="default"
                fullWidth
                disabled={isLoading}
              >
                {isLoading ? (
                  <span>Signing in…</span>
                ) : (
                  <>
                    <span>Sign in</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </form>

          <div className="pt-2 border-t border-stone-100 text-center text-xs text-zinc-500">
            Don't have an account?{' '}
            <Link to="/signup" className="text-zinc-900 font-semibold hover:underline">
              Create one
            </Link>
          </div>
        </div>
      </main>

      <footer className="text-center text-xs text-zinc-400 py-4">
        © 2026 tiply.ng · One link. Get tipped.
      </footer>
    </div>
  );
}
