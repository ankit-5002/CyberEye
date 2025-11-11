import { Card, CardContent } from "@/components/ui/card";
import { Lock, Brain, BarChart3, ShieldCheck } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Lock,
      title: "Blockchain Integrity",
      description: "Immutable conviction records with complete audit trails. Every update is timestamped and traceable on Hyperledger Fabric.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Brain,
      title: "AI Intelligence",
      description: "Automatic case classification using NLP and machine learning. Detect anomalies, duplicates, and altered entries in real-time.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Real-time visualization of conviction trends, regional statistics, and key performance indicators for data-driven decisions.",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: ShieldCheck,
      title: "Secure Access Control",
      description: "Multi-level role-based authentication with AES-256 encryption. Complete audit logs for every access and modification.",
      gradient: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Key Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Enterprise-grade security meets intelligent automation for modern justice systems
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group bg-card border-border hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <CardContent className="p-8">
                <div className="flex flex-col gap-4">
                  {/* Icon */}
                  <div className="p-4 rounded-xl bg-primary/10 w-fit">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
