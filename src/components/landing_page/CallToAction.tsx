import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

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
            <Link
              href="/sign-up"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          <p className="mt-6 text-sm text-gray-400">Limited spots available. Don't miss out!</p>
        </div>
      </section>
    );
  };

  export default CallToActionSection;