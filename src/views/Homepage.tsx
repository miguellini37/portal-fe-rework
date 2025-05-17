export const Homepage = () => {
  return (
    <div className="Homepage">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="text-5xl font-bold text-white mb-4 hero-text">
            Launch Your Career with Portal
          </h1>
          <p className="text-xl text-gray-300 mb-6 hero-text">
            Connecting NCAA student-athletes with top employers and NIL opportunities.
          </p>
          <div className="space-x-4">
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
              onClick={() => {}}
            >
              Join Now (Athletes)
            </button>
            <button className="bg-gray-700 text-white px-6 py-3 rounded hover:bg-gray-600">
              Hire Talent (Employers)
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Why Portal?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <p className="text-2xl font-bold text-blue-400">550,000+</p>
            <p className="text-gray-400">NCAA Athletes</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <p className="text-2xl font-bold text-blue-400">12+</p>
            <p className="text-gray-400">Top Companies</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <p className="text-2xl font-bold text-blue-400">Free</p>
            <p className="text-gray-400">For Athletes</p>
          </div>
        </div>
      </div>
    </div>
  );
};
