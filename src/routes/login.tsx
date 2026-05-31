import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { signIn } from "@/lib/auth";
import { toast } from "sonner";
import { Mail, Lock, Eye, EyeOff, ShieldAlert, ArrowRight, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Authorize Agent · Momentum OS" },
      { name: "description", content: "Authenticate and sync your consistency streak." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Credentials missing", {
        description: "Please specify both agent email and password key.",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await signIn(email, password);
      if (error) {
        toast.error("Authorization Failed", {
          description: error.message,
        });
      } else if (data?.user) {
        toast.success("Agent Authorized", {
          description: "Syncing consistency data...",
        });
        navigate({ to: "/dashboard" });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      toast.error("System connection fault", {
        description: message,
      });
    } finally {
      setLoading(false);
    }
  };

  // const handleDemoBypass = () => {
  //   toast.success("Demo Mode Activated", {
  //     description: "Access granted with temporary clearance.",
  //   });
  //   navigate({ to: "/dashboard" });
  // };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 animate-fade-in-up">
        {/* Techy HUD Branding Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-momentum/10 border border-momentum/20 text-hud text-[10px] text-momentum tracking-widest mb-6">
            <Terminal className="size-3" />
            AUTH_SYS · SECURE_PORTAL
          </div>
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-foreground">
            Authorize Agent
          </h2>
          <p className="mt-2 text-sm text-foreground/60 max-w-xs mx-auto">
            Establish secure connection to sync streaks and focus grids.
          </p>
        </div>

        {/* Auth Panel */}
        <div className="glass-panel rounded-3xl p-8 relative overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] border border-glass-border">
          {/* Subtle tech grid indicator line */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-momentum/50 to-transparent" />

          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-hud text-[10px] tracking-wider text-foreground/60"
              >
                Agent Email
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-foreground/45">
                  <Mail className="size-4" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="agent@momentum.os"
                  className="pl-10 h-11 bg-white/5 border-glass-border focus-visible:ring-momentum/50 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label
                  htmlFor="password"
                  className="text-hud text-[10px] tracking-wider text-foreground/60"
                >
                  Password Key
                </Label>
                <a
                  href="#"
                  className="text-hud text-[9px] text-momentum hover:text-momentum/80 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.info("Password Recovery", {
                      description: "Supabase password reset workflow is not initialized.",
                    });
                  }}
                >
                  Forgot Key?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-foreground/45">
                  <Lock className="size-4" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="pl-10 pr-10 h-11 bg-white/5 border-glass-border focus-visible:ring-momentum/50 rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-foreground/45 hover:text-foreground/80"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-xl bg-momentum text-background font-bold tracking-wider hover:bg-momentum/95 cursor-pointer uppercase transition-all duration-300 hover:shadow-[0_0_20px_-3px_oklch(0.78_0.15_200_/_0.6)]"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="size-4 rounded-full border-2 border-background border-t-transparent animate-spin" />
                    Synchronizing...
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    Establish Link <ArrowRight className="size-4" />
                  </span>
                )}
              </Button>
            </div>
          </form>

          {/* Dev Bypass Section */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-glass-border" />
            </div>
            <div className="relative flex justify-center text-hud text-[9px]">
              <span className="bg-[#14151a] px-3 text-foreground/40">OR</span>
            </div>
          </div>

          {/* <Button
            type="button"
            variant="outline"
            onClick={handleDemoBypass}
            className="w-full h-10 border-glass-border hover:bg-white/5 rounded-xl text-hud text-[10px] tracking-wider font-semibold text-foreground/70"
          >
            Bypass & Demo Terminal
          </Button> */}
        </div>

        {/* Footer Navigation */}
        <p className="text-center text-sm text-foreground/50">
          New operative?{" "}
          <Link
            to="/signup"
            className="font-medium text-momentum hover:text-momentum/80 hover:underline transition-all"
          >
            Register Recruit
          </Link>
        </p>
      </div>
    </div>
  );
}
