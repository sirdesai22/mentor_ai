import { PlayCircle, ChevronRight } from "lucide-react";

// Component: Hero Section
const HeroSection = () => {
    return (
      <section className="py-20 md:py-32 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            <span className="block">Unlock Your Potential with</span>
            <span className="block text-blue-500 mt-2">AI-Powered Gamified Learning</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-300">
            MENTOR AI transforms skill acquisition into an engaging adventure. Learn by playing AI-generated games tailored to your goals, making learning effective and fun.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-lg flex items-center"
            >
              Start Your Learning Journey <PlayCircle className="ml-3 h-6 w-6" />
            </a>
            <a
              href="#how-it-works"
              className="text-blue-400 hover:text-blue-300 font-semibold px-8 py-4 rounded-lg border border-blue-500 hover:border-blue-400 transition-colors duration-300 text-lg flex items-center group"
            >
              Learn More <ChevronRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </section>
    );
  };

  export default HeroSection;