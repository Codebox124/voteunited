import { Shield, Users, Zap, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";

const values = [
  {
    icon: Shield,
    title: "Integrity",
    description: "We provide unbiased and factual information.",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    icon: Users,
    title: "Unity",
    description: "We bring people together across backgrounds and beliefs.",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
  },
  {
    icon: Zap,
    title: "Empowerment",
    description: "We help individuals take meaningful action.",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/30",
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "We believe in open, accountable governance.",
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-100 dark:bg-green-900/30",
  },
];

const Values = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-mont font-bold text-primary dark:text-white mb-8">
        Our Core Values
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {values.map((value, index) => {
          const Icon = value.icon;
          return (
            <Card
              key={index}
              className="p-6 rounded-none hover:shadow-sm shadow-none transition-shadow duration-300 group"
            >
              <div
                className={`${value.bgColor} ${value.color} w-12 h-12 rounded-none flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-mont font-bold text-foreground mb-2">
                {value.title}
              </h3>
              <p className="text-sm text-muted-foreground fontroboto">
                {value.description}
              </p>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Values;
