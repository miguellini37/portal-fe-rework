import { useNavigate } from 'react-router-dom';

export const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="Homepage min-h-screen h-screen bg-gradient-to-b from-blue-50 to-blue overflow-hidden flex flex-col justify-center items-center p-0 m-0">
      <div className="w-full flex flex-col items-center flex-1 p-0 m-0">
        <div className="hero-section relative flex flex-col items-center justify-center w-full p-0 m-0">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-700/70 to-blue-500/40 z-0 rounded-b-2xl" />
          <div className="hero-content relative z-10 flex flex-col items-center text-center px-2 md:px-4 w-full">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-1 drop-shadow-lg tracking-tight">
              Launch Your Career with{' '}
              <span className="text-[#2563eb] font-black" style={{ letterSpacing: '0.01em' }}>
                Portal
              </span>
            </h1>
            <p className="text-base md:text-lg text-blue-100 mb-2 font-medium drop-shadow-md max-w-xl mx-auto">
              Connecting NCAA student-athletes with top employers and NIL opportunities.
            </p>
            <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center">
              <button
                className="btn btn-primary text-base shadow-lg px-6 py-2"
                onClick={() => {
                  navigate('/register?athlete');
                }}
              >
                Join Now (Athletes)
              </button>
              <button
                className="btn btn-secondary text-base shadow px-6 py-2 font-semibold"
                onClick={() => navigate('/register?type=company')}
              >
                Hire Talent (Employers)
              </button>
              <button
                className="btn btn-secondary text-base shadow px-6 py-2 font-semibold"
                onClick={() => navigate('/register?type=school')}
              >
                Help Students (Schools)
              </button>
            </div>
          </div>
        </div>
        <div className="w-full text-center mt-2 p-0 m-0 pt-5">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2 text-gray-800">Why Portal?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-5xl mx-auto">
            <div className="bg-white p-4 rounded-2xl shadow-glow border border-blue-100 flex flex-col items-center">
              <p className="text-xl font-extrabold text-blue-500 mb-1">550,000+</p>
              <p className="text-gray-500 text-base">NCAA Athletes</p>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-glow border border-blue-100 flex flex-col items-center">
              <p className="text-xl font-extrabold text-blue-500 mb-1">12+</p>
              <p className="text-gray-500 text-base">Top Companies</p>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-glow border border-blue-100 flex flex-col items-center">
              <p className="text-xl font-extrabold text-blue-500 mb-1">Free</p>
              <p className="text-gray-500 text-base">For Athletes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
