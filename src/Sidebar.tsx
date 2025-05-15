import { NavLink } from 'react-router-dom';

export const Sidebar = () => {
    return (
      <div className="sidebar">
              <h1 className="text-3xl font-bold mb-8 text-blue-400">Portal</h1>
      <nav>
        <ul>
        <li className="mb-4"><NavLink to="/home" className="text-blue-400 hover:text-blue-300">Home</NavLink></li>
        <li className="mb-4"><NavLink to="/dashboard" className="text-blue-400 hover:text-blue-300">Dashboard</NavLink></li>
        <li className="mb-4"><NavLink to="/alumni" className="text-blue-400 hover:text-blue-300">Alumni</NavLink></li>
        <li className="mb-4"><NavLink to="/jobs" className="text-blue-400 hover:text-blue-300">Jobs</NavLink></li>
        <li className="mb-4"><NavLink to="/internships" className="text-blue-400 hover:text-blue-300">Internships</NavLink></li>
        <li className="mb-4"><NavLink to="/nil" className="text-blue-400 hover:text-blue-300">NIL Deals</NavLink></li>
        <li className="mb-4"><NavLink to="/analytics" className="text-blue-400 hover:text-blue-300">Analytics</NavLink></li>
        <li className="mb-4"><NavLink to="/careerDevelopment" className="text-blue-400 hover:text-blue-300">Career Development</NavLink></li>
        <li className="mb-4"><NavLink to="/messages" className="text-blue-400 hover:text-blue-300">Messages</NavLink></li>
        </ul>
      </nav>
      </div>
    );
  }
    