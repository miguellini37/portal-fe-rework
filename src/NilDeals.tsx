import { Sidebar } from "./Sidebar";

export const NIL = () => {
    return (
      <div className="NIL">
                <div className="mb-8">
          <h2 className="text-4xl font-bold">NIL Deals</h2>
          <p className="text-gray-400 mt-2">Explore Name, Image, and Likeness opportunities</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="nil-card bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold">Mastery Logistics Systems</h3>
            <p className="text-gray-400">Social Media Campaign & Internship</p>
            <p><span className="font-semibold">Compensation:</span> $2,500 + 8-week internship</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => {}}>Apply for Deal</button>
          </div>
        </div>
      </div>
    );
  }
    