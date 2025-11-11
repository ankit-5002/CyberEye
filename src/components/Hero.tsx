import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Lock, Database } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 bg-gradient-hero overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border mb-6 shadow-sm">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Cyber Safety Campaign 2025</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Building Trust in Justice Through{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Secure, Intelligent Data
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            A Blockchain + AI powered Conviction Management System for Cybercrime and Justice Departments
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button variant="hero" size="lg" className="w-full sm:w-auto" onClick={() => window.location.href = "/dashboard"}>
              Explore Dashboard
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="dashboard" size="lg" className="w-full sm:w-auto" onClick={() => window.location.href = "/auth"}>
              Join as Investigator / Admin
            </Button>
          </div>

          {/* Visual Elements */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card border border-border hover:shadow-md transition-all duration-300">
              <div className="p-3 rounded-lg bg-primary/10">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Blockchain Secured</h3>
              <p className="text-sm text-muted-foreground text-center">Immutable records with complete traceability</p>
            </div>

            <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card border border-border hover:shadow-md transition-all duration-300">
              <div className="p-3 rounded-lg bg-primary/10">
                <Database className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">AI-Powered</h3>
              <p className="text-sm text-muted-foreground text-center">Automatic classification and anomaly detection</p>
            </div>

            <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card border border-border hover:shadow-md transition-all duration-300">
              <div className="p-3 rounded-lg bg-primary/10">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Enterprise Grade</h3>
              <p className="text-sm text-muted-foreground text-center">Multi-level authentication and encryption</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
