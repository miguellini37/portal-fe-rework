export const Dashboard = () => {
    return (
      <div className="Dashboard">
        <div className="mb-8">
          <h2 className="text-4xl font-bold">Welcome, Jane Doe!</h2>
          <p className="text-gray-400 mt-2">Your journey to a dream career starts here.</p>
        </div>
        <div className="space-y-8">
          <div className="feed-card bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold">Your Profile Status</h3>
            <p><span className="font-semibold">Profile Completion:</span> 85%</p>
            <p><span className="font-semibold">Engagement Points:</span> 320 (Top 10%)</p>
            <p className="text-gray-400 mt-2">Complete your profile to unlock more opportunities!</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => {}}>Edit Profile</button>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Recommended Jobs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="feed-card bg-gray-800 p-6 rounded-lg">
                <h4 className="text-lg font-bold">Coyote Logistics</h4>
                <p className="text-gray-400">Carrier Sales Representative</p>
                <p><span className="font-semibold">Location:</span> Chicago, IL</p>
                <p><span className="font-semibold">Salary Range:</span> $50,000–$65,000</p>
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => {}}>Apply</button>
              </div>
              <div className="feed-card bg-gray-800 p-6 rounded-lg">
                <h4 className="text-lg font-bold">Mastery Logistics Systems</h4>
                <p className="text-gray-400">Supply Chain Analyst</p>
                <p><span className="font-semibold">Location:</span> Remote</p>
                <p><span className="font-semibold">Salary Range:</span> $60,000–$75,000</p>
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => {}}>Apply</button>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Recommended NIL Deals</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="feed-card bg-gray-800 p-6 rounded-lg">
                <h4 className="text-lg font-bold">Mastery Logistics Systems</h4>
                <p className="text-gray-400">Social Media Campaign & Internship</p>
                <p><span className="font-semibold">Compensation:</span> $2,500 + 8-week internship</p>
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => {}}>Apply for Deal</button>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Recent Activity</h3>
            <div id="recent-activity" className="feed-card bg-gray-800 p-6 rounded-lg">
              <p><span className="font-semibold">Applied:</span> Coyote Logistics, Carrier Sales Representative – April 25, 2025</p>
              <p><span className="font-semibold">Completed:</span> Mastery Logistics Systems, Supply Chain Intern – August 2024</p>
              <p><span className="font-semibold">Profile Updated:</span> Added internship details – April 20, 2025</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
    