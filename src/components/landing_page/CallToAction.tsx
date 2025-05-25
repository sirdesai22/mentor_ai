import { Sparkles, ArrowRight } from "lucide-react";

// Component: Call To Action Section
const CallToActionSection = () => {
    return (
      <section id="early-access" className="py-16 sm:py-24 bg-gradient-to-b from-gray-900 to-blue-900/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Sparkles className="h-16 w-16 text-blue-500 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Ready to Transform How You Learn?</h2>
          <p className="mt-6 text-lg sm:text-xl text-gray-300">
            Join our beta program and be among the first to experience the future of education with MENTOR AI. Help us shape the platform and get exclusive early access benefits.
          </p>
          <div className="mt-10">
            <a
              href="/register" // Replace with your actual sign-up link or form
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-10 py-4 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-lg inline-flex items-center"
            >
              Start Your Learning Journey <ArrowRight className="ml-3 h-6 w-6" />
            </a>
          </div>
          <p className="mt-6 text-sm text-gray-400">Limited spots available. Don't miss out!</p>
        </div>
      </section>
    );
  };

  export default CallToActionSection;