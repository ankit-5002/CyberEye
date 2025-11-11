import { Card } from "@/components/ui/card";

const Technology = () => {
  const technologies = [
    {
      name: "Next.js",
      description: "Frontend Framework",
      icon: "⚡",
    },
    {
      name: "Node.js",
      description: "Backend Runtime",
      icon: "🚀",
    },
    {
      name: "MongoDB",
      description: "Secure Database",
      icon: "🍃",
    },
    {
      name: "Hyperledger Fabric",
      description: "Blockchain Layer",
      icon: "🔗",
    },
    {
      name: "TensorFlow",
      description: "AI Model",
      icon: "🧠",
    },
    {
      name: "spaCy",
      description: "NLP Engine",
      icon: "💬",
    },
  ];

  return (
    <section id="technology" className="py-20 px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Built on Modern Technology
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powered by industry-leading frameworks and tools for maximum security and performance
          </p>
        </div>

        {/* Technology Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
          {technologies.map((tech, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:shadow-md transition-all duration-300 cursor-pointer group"
            >
              <div className="p-6 flex flex-col items-center text-center gap-3">
                <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  {tech.icon}
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {tech.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {tech.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technology;
