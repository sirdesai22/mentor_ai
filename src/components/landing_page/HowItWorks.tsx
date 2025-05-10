import { Target, Puzzle, Award } from "lucide-react";

// Component: How It Works Section
const HowItWorksSection = () => {
    const steps = [
      {
        icon: <Target className="h-12 w-12 text-blue-500 mb-4" />,
        title: '1. Choose Your Skill',
        description: 'Select from a vast library of topics. Whether it’s coding, a new language, or a creative skill, MENTOR AI has you covered.',
      },
      {
        icon: <Puzzle className="h-12 w-12 text-blue-500 mb-4" />,
        title: '2. AI Crafts Your Game',
        description: 'Our intelligent AI analyzes your chosen skill and generates a unique, interactive game designed to make learning intuitive and enjoyable.',
      },
      {
        icon: <Award className="h-12 w-12 text-blue-500 mb-4" />,
        title: '3. Level Up & Master',
        description: 'Progress through engaging levels, complete tasks, and earn rewards. Watch your skills grow as you conquer challenges.',
      },
    ];
  
    return (
      <section id="how-it-works" className="py-16 sm:py-24 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">How MENTOR AI Works</h2>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              A simple, three-step process to transform your learning experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="bg-gray-700/50 p-8 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-shadow duration-300 flex flex-col items-center text-center">
                {step.icon}
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  export default HowItWorksSection;