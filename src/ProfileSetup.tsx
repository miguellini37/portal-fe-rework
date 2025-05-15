import { Sidebar } from "./Sidebar";

export const ProfileSetup = () => {
    return (
      <div className="ProfileSetup">
                <div className="mb-8">
          <h2 className="text-4xl font-bold">Create Your Athlete Profile</h2>
          <p className="text-gray-400 mt-2">Fill out your details to join the Portal and unlock career opportunities.</p>
        </div>
        <div className="bg-gray-800 p-8 rounded-lg">
          <form id="athlete-profile-form" onSubmit={() => {}}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Full Name</label>
                <input type="text" className="form-input" placeholder="Enter your full name" required/>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Sport</label>
                <input type="text" className="form-input" placeholder="e.g., Basketball" required/>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Position</label>
                <input type="text" className="form-input" placeholder="e.g., Point Guard" required/>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">School</label>
                <input type="text" className="form-input" placeholder="e.g., UCLA" required/>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Major</label>
                <input type="text" className="form-input" placeholder="e.g., Business" required/>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">GPA</label>
                <input type="number" step="0.1" min="0" max="4" className="form-input" placeholder="e.g., 3.8" required/>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Division</label>
                <select className="form-select" required>
                  <option value="">Select Division</option>
                  <option value="D1">D1</option>
                  <option value="D2">D2</option>
                  <option value="D3">D3</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Graduation Date</label>
                <input type="text" className="form-input" placeholder="e.g., May 2025" required/>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Industry Preference</label>
                <input type="text" className="form-input" placeholder="e.g., Logistics" required/>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Relocation</label>
                <select className="form-select" required>
                  <option value="">Select Option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Internships (Optional)</label>
                <textarea className="form-textarea" rows={4} placeholder="List internships, e.g., Mastery Logistics Systems, Supply Chain Intern, Summer 2024"></textarea>
              </div>
            </div>
            <div className="mt-6 flex space-x-4">
              <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">Submit Profile</button>
              <button type="button" className="bg-gray-700 text-white px-6 py-3 rounded hover:bg-gray-600" onClick={() => {}}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
    