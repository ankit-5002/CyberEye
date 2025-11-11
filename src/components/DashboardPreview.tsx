import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrendingUp, Users, FileText, Activity } from "lucide-react";

const DashboardPreview = () => {
  const stats = [
    { label: "Total Cases", value: "1,247", icon: FileText, trend: "+12.5%" },
    { label: "Active Users", value: "89", icon: Users, trend: "+5.2%" },
    { label: "Resolutions", value: "892", icon: TrendingUp, trend: "+18.3%" },
    { label: "System Health", value: "99.9%", icon: Activity, trend: "Optimal" },
  ];

  return (
    <section id="dashboard" className="py-20 px-4 bg-secondary">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Dashboard Preview
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track conviction trends, visualize data securely, and collaborate across departments
          </p>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card border-border p-6 hover:shadow-md transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-accent">{stat.trend}</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Dashboard Preview Image */}
        <div className="relative rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300">
          <div className="bg-card p-8">
            <div className="bg-background rounded-lg p-8 min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <Activity className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  Interactive Analytics Dashboard
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Real-time case tracking, trend analysis, and secure data visualization for informed decision-making
                </p>
                <Button variant="hero" size="lg">
                  Try Live Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
