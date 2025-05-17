export const CareerDevelopment = () => {
  return (
    <div className="CareerDevelopment">
      <div className="mb-8">
        <h2 className="text-4xl font-bold">Career Development</h2>
        <p className="text-gray-400 mt-2">
          Access resources to build your professional skills and land your dream job.
        </p>
      </div>
      <div className="space-y-8">
        <div className="feed-card bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-bold">1-on-1 Career Coaching</h3>
          <p className="text-gray-400 mt-2">
            Schedule personalized sessions with career coaches to refine your goals, improve your
            interview skills, and plan your career path.
          </p>
          <p>
            <span className="font-semibold">Details:</span> 30 or 60-minute sessions, virtual or
            in-person, tailored to your industry preference.
          </p>
          <p>
            <span className="font-semibold">Next Available:</span> May 5, 2025, 10:00 AM PDT
          </p>
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => {}}
          >
            Book a Session
          </button>
        </div>
        <div className="feed-card bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-bold">Resume Building Workshops</h3>
          <p className="text-gray-400 mt-2">
            Join interactive workshops to craft a standout resume that highlights your athletic and
            academic achievements.
          </p>
          <p>
            <span className="font-semibold">Upcoming Session:</span> Resume Essentials for
            Student-Athletes – May 10, 2025, 2:00 PM PDT (Virtual)
          </p>
          <p>
            <span className="font-semibold">Led by:</span> Sarah Johnson, Career Advisor at UCLA
          </p>
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => {}}
          >
            Register Now
          </button>
        </div>
        <div className="feed-card bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-bold">Interview Preparation</h3>
          <p className="text-gray-400 mt-2">
            Access mock interviews and resources to master common interview questions and present
            your best self to employers.
          </p>
          <p>
            <span className="font-semibold">Features:</span> Video tutorials, mock interview
            scheduling, and feedback from industry professionals.
          </p>
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => {}}
          >
            Explore Resources
          </button>
        </div>
        <div className="feed-card bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-bold">Career Webinars</h3>
          <p className="text-gray-400 mt-2">
            Watch recorded webinars on topics like networking, personal branding, and transitioning
            from athletics to a professional career.
          </p>
          <p>
            <span className="font-semibold">Featured Webinar:</span> "From the Field to the Office"
            – Available on-demand
          </p>
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => {}}
          >
            Watch Now
          </button>
        </div>
        <div className="feed-card bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-bold">Skill-Building Courses</h3>
          <p className="text-gray-400 mt-2">
            Enroll in online courses to develop in-demand skills like data analysis, project
            management, and leadership.
          </p>
          <p>
            <span className="font-semibold">Popular Course:</span> Introduction to Supply Chain
            Management – Self-paced, 10 hours
          </p>
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => {}}
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};
