import { Label } from '@/components/ui/label';
import { useLogin } from '../hooks/useLogin';
import { Loader2, Lock, LogIn, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const LoginForm = () => {
  const { mutate, isPending, error } = useLogin();

  const errorMessage = error?.response?.data?.message;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    if (
      !email ||
      !password ||
      typeof email !== 'string' ||
      typeof password !== 'string'
    ) {
      return;
    }

    mutate({
      loginIdentifier: email,
      password,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-white">
      {errorMessage && (
        <div className="animate-in fade-in slide-in-from-top-2 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm font-medium text-red-400">
          <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
          {errorMessage}
        </div>
      )}
      <div className="space-y-2.5">
        <Label htmlFor="email" className="ml-1 font-medium text-slate-300">
          Email Address
        </Label>
        <div className="group relative">
          <Mail className="absolute top-3.5 left-3.5 h-[18px] w-[18px] text-slate-500 transition-colors group-focus-within:text-blue-500" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="admin@nusantara.digital"
            className="h-12 rounded-xl border-white/10 bg-slate-950/40 pl-11 transition-all placeholder:text-slate-700 focus:border-blue-500/50 focus:ring-blue-500/20"
            required
          />
        </div>
      </div>
      <div className="space-y-2.5">
        <div className="ml-1 flex items-center justify-between">
          <Label htmlFor="password" className="font-medium text-slate-300">
            Password
          </Label>
          <button
            type="button"
            className="text-xs font-semibold text-blue-500 transition-colors hover:text-blue-400"
          >
            Forgot password?
          </button>
        </div>
        <div className="group relative">
          <Lock className="absolute top-3.5 left-3.5 h-[18px] w-[18px] text-slate-500 transition-colors group-focus-within:text-blue-500" />
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="••••••••"
            className="h-12 rounded-xl border-white/10 bg-slate-950/40 pl-11 transition-all placeholder:text-slate-700 focus:border-blue-500/50 focus:ring-blue-500/20"
            required
          />
        </div>
      </div>
      <Button
        type="submit"
        className="mt-2 h-12 w-full rounded-xl border-none bg-blue-600 font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500 active:scale-[0.98]"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Authenticating...
          </>
        ) : (
          <>
            Sign in to Dashboard
            <LogIn className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
};
