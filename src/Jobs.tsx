export const Jobs = () => {
    return (
      <div className="Jobs">
                <div className="mb-8">
          <h2 className="text-4xl font-bold">Job Opportunities</h2>
          <p className="text-gray-400 mt-2">Explore open career opportunities for student-athletes</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-bold mb-4">Filter Jobs</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Preferred Major</label>
              <select id="filter-major" className="filter-select" onChange={() => {}}>
                <option value="">All Majors</option>
                <option value="Business">Business</option>
                <option value="Engineering">Engineering</option>
                <option value="Finance">Finance</option>
                <option value="Economics">Economics</option>
                <option value="Biology">Biology</option>
                <option value="Health Sciences">Health Sciences</option>
                <option value="Communications">Communications</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Location</label>
              <select id="filter-location" className="filter-select" onChange={() => {}}>
                <option value="">All Locations</option>
                <option value="Chicago, IL">Chicago, IL</option>
                <option value="Remote">Remote</option>
                <option value="Cincinnati, OH">Cincinnati, OH</option>
                <option value="Dallas, TX">Dallas, TX</option>
                <option value="Minneapolis, MN">Minneapolis, MN</option>
                <option value="New Brunswick, NJ">New Brunswick, NJ</option>
                <option value="New York, NY">New York, NY</option>
                <option value="San Francisco, CA">San Francisco, CA</option>
                <option value="Philadelphia, PA">Philadelphia, PA</option>
                <option value="Boston, MA">Boston, MA</option>
                <option value="Austin, TX">Austin, TX</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Industry</label>
              <select id="filter-industry" className="filter-select" onChange={() => {}}>
                <option value="">All Industries</option>
                <option value="Logistics">Logistics</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Finance">Finance</option>
                <option value="Technology">Technology</option>
                <option value="Marketing">Marketing</option>
                <option value="Consulting">Consulting</option>
              </select>
            </div>
          </div>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => {}}>Reset Filters</button>
        </div>
        <div id="job-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
      </div>
    );
  }
    