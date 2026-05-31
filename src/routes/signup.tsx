import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { signUp } from "@/lib/auth";
import { toast } from "sonner";
import { Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Register Recruit · Momentum OS" },
      { name: "description", content: "Create an agent profile to begin consistency logging." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      toast.error("Credentials missing", {
        description: "Please populate all database fields.",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Validation error", {
        description: "Password Key and verification check do not match.",
      });
      return;
    }

    if (password.length < 6) {
      toast.error("Insecure Key", {
        description: "Secret key must be at least 6 characters.",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await signUp(email, password);
      if (error) {
        toast.error("Registration Failed", {
          description: error.message,
        });
      } else {
        toast.success("Recruit Profile Initialized", {
          description: "Verification email sent. Confirm your email and then log in.",
        });

        // Wait briefly and navigate to login so they can verify and login
        setTimeout(() => {
          navigate({ to: "/login" });
        }, 1500);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      toast.error("System connection fault", {
        description: message || "An unexpected error occurred during database write.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 animate-fade-in-up">
        {/* Techy HUD Branding Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-momentum/10 border border-momentum/20 text-hud text-[10px] text-momentum tracking-widest mb-6">
            <UserPlus className="size-3" />
            REG_SYS · RECRUIT_PORTAL
          </div>
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-foreground">
            Create Profile
          </h2>
          <p className="mt-2 text-sm text-foreground/60 max-w-xs mx-auto">
            Initialize agent record to start your consistency metrics database.
          </p>
        </div>

        {/* Auth Panel */}
        <div className="glass-panel rounded-3xl p-8 relative overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] border border-glass-border">
          {/* Subtle tech grid indicator line */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-momentum/50 to-transparent" />

          <form className="space-y-5" onSubmit={handleSignup}>
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
              <Label
                htmlFor="password"
                className="text-hud text-[10px] tracking-wider text-foreground/60"
              >
                Create Password Key
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-foreground/45">
                  <Lock className="size-4" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
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

            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="text-hud text-[10px] tracking-wider text-foreground/60"
              >
                Verify Password Key
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-foreground/45">
                  <Lock className="size-4" />
                </div>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="pl-10 h-11 bg-white/5 border-glass-border focus-visible:ring-momentum/50 rounded-xl"
                />
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
                    Initializing agent...
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    Register Recruit <ArrowRight className="size-4" />
                  </span>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Footer Navigation */}
        <p className="text-center text-sm text-foreground/50">
          Already registered?{" "}
          <Link
            to="/login"
            className="font-medium text-momentum hover:text-momentum/80 hover:underline transition-all"
          >
            Authorize Session
          </Link>
        </p>
      </div>
    </div>
  );
}
