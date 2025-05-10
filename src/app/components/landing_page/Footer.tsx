// Component: Footer
const Footer = () => {
    return (
      <footer className="bg-gray-900 border-t border-gray-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center space-x-6 mb-6">
            {/* Placeholder for social media icons if needed */}
            {/* <a href="#" className="text-gray-400 hover:text-gray-300"><Icon name="twitter" /></a> */}
          </div>
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} MENTOR AI. All rights reserved.
          </p>
          <div className="mt-4 space-x-4">
              <a href="#" className="text-xs text-gray-500 hover:text-gray-300">Privacy Policy</a>
              <span className="text-gray-600">|</span>
              <a href="#" className="text-xs text-gray-500 hover:text-gray-300">Terms of Service</a>
          </div>
        </div>
      </footer>
    );
  };

  export default Footer;