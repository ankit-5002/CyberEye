import { Card } from "@/components/ui/card";
import { Building2, GraduationCap, Shield } from "lucide-react";

const Mission = () => {
  return (
    <section className="py-20 px-4 bg-secondary">
      <div className="container mx-auto max-w-5xl">
        <Card className="bg-card border-border p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Mission
            </h2>
            <div className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed space-y-4">
              <p>
                We are a passionate student team participating in the <span className="text-primary font-semibold">Cyber Safety Campaign 2025 Hackathon</span> organized by IIT Bhubaneswar and supported by the Odisha Police, CID, and Crime Branch.
              </p>
              <p>
                Our mission is to design a secure, intelligent, and transparent Conviction Data Management System (CDMS) that enhances how digital conviction records are managed and analyzed.
              </p>
            </div>
          </div>

          {/* Partner Logos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-background border border-border">
              <div className="p-4 rounded-full bg-primary/10">
                <GraduationCap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">IIT Bhubaneswar</h3>
              <p className="text-sm text-muted-foreground text-center">Academic Excellence</p>
            </div>

            <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-background border border-border">
              <div className="p-4 rounded-full bg-primary/10">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Odisha Police</h3>
              <p className="text-sm text-muted-foreground text-center">Law Enforcement</p>
            </div>

            <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-background border border-border">
              <div className="p-4 rounded-full bg-primary/10">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Team ElevateX</h3>
              <p className="text-sm text-muted-foreground text-center">Passionate Learners</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Mission;
