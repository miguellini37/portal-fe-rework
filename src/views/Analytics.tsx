export const Analytics = () => {
  return (
    <div className="Analytics">
      <div className="mb-8">
        <h2 className="text-4xl font-bold">Your Analytics</h2>
        <p className="text-gray-400 mt-2">Track your progress and boost your visibility!</p>
      </div>
      <div className="space-y-8">
        <div className="feed-card bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-bold">Company Engagement</h3>
          <p>
            <span className="font-semibold">Profile Views:</span> 45 companies
          </p>
          <p>
            <span className="font-semibold">Outreach Messages:</span> 8 companies
          </p>
          <p className="text-gray-400 mt-2">Respond to messages to connect with top employers!</p>
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => {}}
          >
            View Messages
          </button>
        </div>
        <div className="feed-card bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-bold">Engagement Metrics</h3>
          <p>
            <span className="font-semibold">Profile Completion:</span> 85%
          </p>
          <p>
            <span className="font-semibold">Engagement Points:</span> 320 (Top 10%)
          </p>
          <p>
            <span className="font-semibold">Ranking:</span> #12 among UCLA athletes
          </p>
          <p className="text-gray-400 mt-2">Add a new internship to gain 50 points!</p>
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => {}}
          >
            Edit Profile
          </button>
        </div>
        <div className="feed-card bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-bold">Activity Stats</h3>
          <p>
            <span className="font-semibold">Job Applications:</span> 5 submitted
          </p>
          <p>
            <span className="font-semibold">NIL Deals Applied:</span> 2 applications
          </p>
          <p className="text-gray-400 mt-2">
            Apply to 3 more jobs this week to boost your ranking!
          </p>
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => {}}
          >
            Explore Jobs
          </button>
        </div>
        <div className="feed-card bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-bold">Stay Engaged!</h3>
          <p className="text-gray-400">
            Your profile is catching attention—keep it active to land your dream role!
          </p>
          <ul className="list-disc ml-5 mt-2 text-gray-400">
            <li>Update your skills to increase profile views</li>
            <li>Apply to a new NIL deal for 25 points</li>
            <li>Connect with a company to unlock opportunities</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
