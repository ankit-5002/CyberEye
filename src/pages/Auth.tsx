import { useMemo, useState, useRef } from "react";
import { Shield, Mail, Lock, User, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactPurpose, setContactPurpose] = useState("");
  const [isSendingContact, setIsSendingContact] = useState(false);
  const navigate = useNavigate();
  const contactFormRef = useRef<HTMLFormElement | null>(null);
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Could not copy");
    }
  };

  // Demo credential store (extend as needed)
  const demoUsers = useMemo(
    () => ({
      "officer@cdms.gov.in": { password: "password123", roles: ["police", "investigator", "analyst"] },
      "investigator@cdms.gov.in": { password: "investigate!", roles: ["investigator"] },
      "analyst@cdms.gov.in": { password: "analyze123", roles: ["analyst"] },
      "ankit.rathore@cdms.gov.in": { password: "ankit@2025", roles: ["analyst", "investigator"] },
    }),
    []
  );

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const emailTrim = email.trim().toLowerCase();
    const passwordTrim = password.trim();
    if (!emailTrim || !passwordTrim || !role) {
      toast.error("Please fill in all fields");
      return;
    }
    const user = demoUsers[emailTrim as keyof typeof demoUsers];
    if (!user) {
      toast.error("Invalid credentials");
      return;
    }
    if (passwordTrim !== user.password) {
      toast.error("Invalid credentials");
      return;
    }
    if (!user.roles.includes(role)) {
      toast.error("Selected role is not permitted for this user");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      localStorage.setItem("auth", "true");
      localStorage.setItem("userEmail", emailTrim);
      localStorage.setItem("userRole", role);
      toast.success("Login successful!");
      navigate("/dashboard");
    }, 400);
  };

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden flex items-center justify-center">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/50 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Demo Credentials Note (bottom-right) */}
      <div className="absolute bottom-4 right-4 z-20">
        <div className="rounded-lg border border-destructive/40 bg-destructive/10 backdrop-blur px-4 py-3 shadow-lg ring-1 ring-destructive/30">
          <p className="text-xs font-semibold uppercase tracking-wider text-destructive mb-1">
            Demo Credentials
          </p>
          <div className="text-xs text-foreground">
            <div className="flex items-center gap-2">
              <code className="px-2 py-1 rounded bg-card/80 border border-border">
                Email: analyst@cdms.gov.in
              </code>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-7 px-2"
                onClick={() => handleCopy("analyst@cdms.gov.in")}
                title="Copy email"
                aria-label="Copy email"
              >
                <Copy className="w-3.5 h-3.5" />
              </Button>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <code className="px-2 py-1 rounded bg-card/80 border border-border">
                Password: analyze123
              </code>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-7 px-2"
                onClick={() => handleCopy("analyze123")}
                title="Copy password"
                aria-label="Copy password"
              >
                <Copy className="w-3.5 h-3.5" />
              </Button>
            </div>
            <code className="block mt-1 px-2 py-1 rounded bg-card/80 border border-border">
              Role: Crime analyst
            </code>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-md mx-auto">
          {/* Logo Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-2xl mb-4">
              <img src="/favicon.ico" alt="Logo" className="w-12 h-12" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to CDMS</h1>
            <p className="text-muted-foreground">Securing Justice through Digital Intelligence</p>
          </div>

          {/* Login Card */}
          <Card className="bg-card border-border p-8 shadow-sm">
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="officer@cdms.gov.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-background border-border focus:border-primary"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-background border-border focus:border-primary"
                    minLength={8}
                    required
                  />
                </div>
              </div>

              {/* Role Selection */}
              <div className="space-y-2">
                <Label htmlFor="role" className="text-foreground">Role</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="bg-background border-border focus:border-primary">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <SelectValue placeholder="Select your role" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="police">Police Officer</SelectItem>
                    <SelectItem value="investigator">Investigator</SelectItem>
                    <SelectItem value="analyst">Crime Analyst</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Login Button */}
              <Button type="submit" variant="hero" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Signing in..." : "Login"}
              </Button>

              {/* Footer Links */}
              <div className="text-center space-y-2">
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Forgot password?
                </a>
                <p className="text-sm text-muted-foreground">
                  Need access?{" "}
                  <button
                    type="button"
                    className="text-primary hover:underline"
                    onClick={() => setIsContactOpen(true)}
                  >
                    Contact Administrator
                  </button>
                </p>
              </div>
            </form>
          </Card>

          {/* Back to Home */}
          <div className="text-center mt-6">
            <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              ← Back to Home
            </a>
          </div>
        </div>
      </div>

      {/* Contact Administrator Dialog */}
      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent className="bg-card border-border backdrop-blur supports-[backdrop-filter]:bg-card/90">
          <DialogHeader>
            <DialogTitle className="text-foreground">Contact Administrator</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Briefly describe your purpose. We will forward this message to the admin email.
            </DialogDescription>
          </DialogHeader>
          {/* Hidden iframe to avoid page navigation after form submit */}
          <iframe name="hidden_iframe" style={{ display: "none" }} title="hidden_iframe" />
          <form
            ref={contactFormRef}
            action="https://formsubmit.co/kr.ankit5002@gmail.com"
            method="POST"
            target="hidden_iframe"
            className="space-y-4"
            onSubmit={(e) => {
              if (!contactPurpose.trim()) {
                e.preventDefault();
                toast.error("Please enter a brief purpose");
                return;
              }
              setIsSendingContact(true);
              // Optimistic UI since submission happens in hidden iframe
              setTimeout(() => {
                toast.success("Message sent to administrator");
                setIsSendingContact(false);
                setIsContactOpen(false);
                setContactPurpose("");
              }, 600);
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="purpose" className="text-foreground">Purpose</Label>
              <Textarea
                id="purpose"
                name="purpose"
                rows={4}
                placeholder="e.g., Requesting access for investigation dashboard"
                className="bg-background border-border"
                value={contactPurpose}
                onChange={(e) => setContactPurpose(e.target.value)}
                required
              />
            </div>
            {/* Additional metadata to include in the email */}
            <input type="hidden" name="_subject" value="CDMS Access/Support Request" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="fromEmail" value={email || "(no email entered)"} />
            <input type="hidden" name="role" value={role || "(no role selected)"} />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsContactOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="hero"
                disabled={isSendingContact}
              >
                {isSendingContact ? "Sending..." : "Send"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Auth;
