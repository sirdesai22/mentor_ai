import { Puzzle } from "lucide-react";

// Component: Showcase Section (Simple Placeholder)
const ShowcaseSection = () => {
    return (
      <section className="py-16 sm:py-24 bg-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">Experience Learning Like Never Before</h2>
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            Imagine stepping into a world where learning is an adventure. MENTOR AI brings this vision to life.
          </p>
          {/* Placeholder for a visual representation of the game interface */}
          <div className="bg-gray-700 rounded-xl shadow-2xl p-8 aspect-video max-w-3xl mx-auto flex items-center justify-center">
            <div className="text-center">
              <Puzzle className="h-24 w-24 text-blue-500 mx-auto opacity-50" />
              <p className="mt-4 text-xl text-gray-500 font-semibold">Interactive Game Interface Preview</p>
              <p className="text-sm text-gray-600">(Coming Soon)</p>
            </div>
          </div>
        </div>
      </section>
    );
  };

  export default ShowcaseSection;