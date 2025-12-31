import { ShieldCheck, Github, Chrome } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { LoginForm } from '@/features/login/components/LoginForm';

export const LoginPage = () => (
    <div className="flex flex-1 overflow-hidden">
        
      <div className="relative hidden overflow-hidden border-r border-white/5 bg-slate-950 lg:flex lg:w-1/2">
        <div className="relative z-10 flex w-full flex-col justify-between p-16">
          <div className="flex items-center gap-3">
            <div className="group rounded-xl bg-blue-600 p-2.5 shadow-lg shadow-blue-600/20 transition-transform duration-300 hover:scale-110">
              <ShieldCheck className="h-7 w-7 text-white" />
            </div>
            <span className="bg-linear-to-r from-white to-white/70 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
              Nusantara EMS
            </span>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-6xl leading-[1.1] font-extrabold tracking-tighter">
                Empower your <br />
                <span className="relative mt-2 inline-block text-blue-500">
                  workforce.
                  <div className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-blue-500/30 blur-sm" />
                </span>
              </h1>
              <p className="max-w-md text-xl leading-relaxed text-slate-400">
                The intelligent platform for modern enterprises to manage
                talent, growth, and organizational health.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 text-sm font-medium text-slate-400">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-slate-950 bg-slate-800 text-[11px] font-bold ring-1 ring-white/10"
                    >
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`}
                        alt="avatar"
                      />
                    </div>
                  ))}
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-950 bg-blue-600 text-[10px] font-bold ring-1 ring-white/10">
                    +20k
                  </div>
                </div>
                <span>Trusted by 20,000+ employees nationwide</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-[11px] font-medium tracking-widest text-slate-500 uppercase">
            <span>PT Nusantara Digital</span>
            <div className="h-1 w-1 rounded-full bg-slate-700" />
            <span>Privacy Policy</span>
            <div className="h-1 w-1 rounded-full bg-slate-700" />
            <span>Security standards</span>
          </div>
        </div>
      </div>

      <div className="relative flex w-full items-center justify-center p-6 sm:p-12 lg:w-1/2">
        {/* Mobile Background Elements */}
        <div className="absolute inset-0 -z-10 bg-slate-950 lg:hidden" />
        <div className="absolute top-[-10%] right-[-10%] h-[50%] w-[50%] rounded-full bg-blue-600/10 blur-[80px] lg:hidden" />

        <div className="w-full max-w-[420px] space-y-10">
          <div className="space-y-3">
            <div className="mb-10 flex items-center gap-2 lg:hidden">
              <div className="rounded-lg bg-blue-600 p-2">
                <ShieldCheck className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Nusantara EMS
              </span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-white">
              Welcome back
            </h2>
            <p className="text-lg text-slate-400">
              Sign in to manage your workspace.
            </p>
          </div>

          <Card className="overflow-hidden border-white/5 bg-slate-900/40 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            <div className="h-1.5 w-full bg-linear-to-r from-blue-600 via-indigo-500 to-blue-400" />
            <CardContent className="space-y-6 pt-8">
              <LoginForm />

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/5"></div>
                </div>
                <div className="relative flex justify-center text-[10px] font-bold tracking-widest uppercase">
                  <span className="bg-slate-900/40 px-3 text-slate-600 backdrop-blur-xl">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-11 rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
                >
                  <Chrome className="mr-2 h-4 w-4" /> Google
                </Button>
                <Button
                  variant="outline"
                  className="h-11 rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
                >
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-center pt-2 pb-8">
              <p className="text-sm font-medium text-slate-500">
                New to Nusantara?{' '}
                <button className="ml-1 font-bold text-blue-500 transition-colors hover:text-blue-400">
                  Create account
                </button>
              </p>
            </CardFooter>
          </Card>

          <div className="pt-8 text-center">
            <p className="text-[10px] font-bold tracking-[0.2em] text-slate-600 uppercase">
              Secure 256-bit SSL Encrypted Connection
            </p>
          </div>
        </div>
      </div>
    </div>
  );
