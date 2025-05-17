export const Messages = () => {
  return (
    <div className="Messages">
      <div className="mb-8">
        <h2 className="text-4xl font-bold">Your Messages</h2>
        <p className="text-gray-400 mt-2">
          Connect with potential employers, alumni, and fellow students.
        </p>
      </div>
      <div className="space-y-8">
        <div className="feed-card bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Potential Employers</h3>
          <p className="text-gray-400">
            Messages from companies interested in your profile or job applications.
          </p>
          <p>
            <span className="font-semibold">Recent Messages:</span>
          </p>
          <ul className="list-disc ml-5 mt-2 text-gray-400">
            <li>
              Coyote Logistics (April 28, 2025): "Interested in discussing our Carrier Sales role?"{' '}
              <button
                className="ml-4 bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                onClick={() => {}}
              >
                Reply
              </button>
            </li>
            <li>
              Mastery Logistics Systems (April 27, 2025): "Follow-up on your Supply Chain Analyst
              application."{' '}
              <button
                className="ml-4 bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                onClick={() => {}}
              >
                Reply
              </button>
            </li>
            <li>
              Stryker (April 25, 2025): "We’d like to schedule an interview for the Medical Device
              Sales role."{' '}
              <button
                className="ml-4 bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                onClick={() => {}}
              >
                Reply
              </button>
            </li>
          </ul>
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => {}}
          >
            View All Employer Messages
          </button>
        </div>
        <div className="feed-card bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Alumni</h3>
          <p className="text-gray-400">
            Stay connected with UCLA alumni for mentorship and networking.
          </p>
          <p>
            <span className="font-semibold">Recent Messages:</span>
          </p>
          <ul className="list-disc ml-5 mt-2 text-gray-400">
            <li>
              John B. (’18, April 26, 2025): "Happy to mentor you in logistics!"{' '}
              <button
                className="ml-4 bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                onClick={() => {}}
              >
                Reply
              </button>
            </li>
            <li>
              Sarah K. (’22, April 24, 2025): "Anyone attending the homecoming game? Let’s meet up!"{' '}
              <button
                className="ml-4 bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                onClick={() => {}}
              >
                Reply
              </button>
            </li>
            <li>
              Michael C. (’20, April 23, 2025): "I can share insights on breaking into finance."{' '}
              <button
                className="ml-4 bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                onClick={() => {}}
              >
                Reply
              </button>
            </li>
          </ul>
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => {}}
          >
            View All Alumni Messages
          </button>
        </div>
        <div className="feed-card bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Other Students</h3>
          <p className="text-gray-400">
            Collaborate and network with fellow UCLA student-athletes.
          </p>
          <p>
            <span className="font-semibold">Recent Messages:</span>
          </p>
          <ul className="list-disc ml-5 mt-2 text-gray-400">
            <li>
              Emily R. (Student, April 25, 2025): "Seeking alumni advice for medical sales careers.
              Want to join me?"{' '}
              <button
                className="ml-4 bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                onClick={() => {}}
              >
                Reply
              </button>
            </li>
            <li>
              David L. (Student, April 24, 2025): "Anyone interested in a study group for supply
              chain management?"{' '}
              <button
                className="ml-4 bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                onClick={() => {}}
              >
                Reply
              </button>
            </li>
            <li>
              Lauren M. (Student, April 22, 2025): "Looking for teammates for the career fair prep
              workshop!"{' '}
              <button
                className="ml-4 bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                onClick={() => {}}
              >
                Reply
              </button>
            </li>
          </ul>
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => {}}
          >
            View All Student Messages
          </button>
        </div>
      </div>
    </div>
  );
};
