import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { BrandLogo } from '../../../components/ui/BrandLogo';
import { ArrowRight } from 'lucide-react';
import { useToast } from '../../../components/ui/Toast';
import { useApp } from '../../../contexts/AppContext';
import { Input, PasswordInput, Button } from '@tiply-ng/shared';

export default function SignupPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialUsername = searchParams.get('username') || '';
  const { toast } = useToast();
  const { updateCreator } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(initialUsername);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      toast('warning', 'Please enter your desired username');
      return;
    }
    setIsLoading(true);
    const cleanUsername = username.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '');

    setTimeout(() => {
      setIsLoading(false);
      updateCreator({
        username: cleanUsername,
        email: email || `${cleanUsername}@example.com`,
      });
      toast('success', `Reserved tiply.ng/${cleanUsername}!`);
      navigate('/onboarding');
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
            <h1 className="text-xl font-bold text-zinc-950">Get your tip link</h1>
            <p className="text-xs text-zinc-500">
              Create your tiply.ng page in a few minutes.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-1.5">
                Username
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400 font-mono z-10 select-none">
                  tiply.ng/
                </span>
                <Input
                  required
                  placeholder="yourname"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))
                  }
                  className="pl-20! font-mono font-semibold"
                />
              </div>
            </div>

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
              <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-1.5">
                Password
              </label>
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
                  <span>Creating your link…</span>
                ) : (
                  <>
                    <span>Create my tip link</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>

            <p className="text-[11px] text-zinc-400 text-center leading-relaxed">
              By continuing, you agree to tiply.ng's{' '}
              <a href="#terms" className="underline hover:text-zinc-600">
                Terms
              </a>{' '}
              and{' '}
              <a href="#privacy" className="underline hover:text-zinc-600">
                Privacy Policy
              </a>
              .
            </p>
          </form>

          <div className="pt-2 border-t border-stone-100 text-center text-xs text-zinc-500">
            Already have an account?{' '}
            <Link to="/login" className="text-zinc-900 font-semibold hover:underline">
              Sign in
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
