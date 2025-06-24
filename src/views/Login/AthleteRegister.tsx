import { useState } from 'react';
import { createAthlete, ICreateAthletePayload } from '../../api/athlete';
import { useNavigate } from 'react-router-dom';

export const AthleteRegister = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sport, setSport] = useState('');
  const [position, setPosition] = useState('');
  const [school, setSchool] = useState('');
  const [major, setMajor] = useState('');
  const [gpa, setGpa] = useState<number | undefined>();
  const [division, setDivision] = useState('');
  const [accolades, setAccolades] = useState('');
  const [teamRole, setTeamRole] = useState('');
  const [coachability, setCoachability] = useState('');
  const [industry, setIndustry] = useState('');
  const [graduationDate, setGraduationDate] = useState('');
  const [points, setPoints] = useState<number | undefined>();
  const [assists, setAssists] = useState<number | undefined>();
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload: ICreateAthletePayload = {
      email,
      password,
      firstName,
      lastName,
      sport,
      position,
      school,
      major,
      gpa,
      division,
      accolades,
      teamRole,
      coachability,
      industry,
      graduationDate,
      points,
      assists,
      jobTitle,
      company,
      location,
      description,
    };

    try {
      await createAthlete(payload);
      navigate('/login');
    } catch (error) {
      console.error('Error creating athlete:', error);
    }
  };

  return (
    <div className="ProfileSetup relative min-h-screen p-8 bg-gray-900 text-white">
      <div className="ProfileSetup">
        <h2 className="text-4xl font-bold mb-2">Create Your Athlete Profile</h2>
        <p className="text-gray-400 mb-6">
          Fill out your details to join the Portal and unlock career opportunities.
        </p>
        <div className="absolute top-4 right-8 text-sm text-gray-400 text-right">
          <div>Not an athlete? Register as</div>
          <a href="/register/company" className="block text-blue-400 underline hover:text-blue-300">
            Company
          </a>
          <a href="/register/school" className="block text-blue-400 underline hover:text-blue-300">
            School
          </a>
        </div>
        <form
          onSubmit={onSubmit}
          className="bg-gray-800 p-8 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Auth fields */}
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />

          {/* Name */}
          <input
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="form-input"
          />
          <input
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="form-input"
          />

          {/* Athlete Info */}
          <input
            placeholder="Sport"
            value={sport}
            onChange={(e) => setSport(e.target.value)}
            required
            className="form-input"
          />
          <input
            placeholder="Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
            className="form-input"
          />
          <input
            placeholder="School"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            required
            className="form-input"
          />
          <input
            placeholder="Major"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            required
            className="form-input"
          />
          <input
            type="number"
            step="0.1"
            placeholder="GPA"
            value={gpa ?? ''}
            onChange={(e) => setGpa(parseFloat(e.target.value))}
            required
            className="form-input"
          />
          <select
            value={division}
            onChange={(e) => setDivision(e.target.value)}
            required
            className="form-select"
          >
            <option value="">Select Division</option>
            <option value="D1">D1</option>
            <option value="D2">D2</option>
            <option value="D3">D3</option>
          </select>

          {/* Extras */}
          <input
            placeholder="Accolades"
            value={accolades}
            onChange={(e) => setAccolades(e.target.value)}
            className="form-input"
          />
          <input
            placeholder="Team Role"
            value={teamRole}
            onChange={(e) => setTeamRole(e.target.value)}
            className="form-input"
          />
          <input
            placeholder="Coachability"
            value={coachability}
            onChange={(e) => setCoachability(e.target.value)}
            className="form-input"
          />
          <input
            placeholder="Industry Preference"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="form-input"
          />
          <input
            placeholder="Graduation Date"
            value={graduationDate}
            onChange={(e) => setGraduationDate(e.target.value)}
            className="form-input"
          />

          {/* Stats */}
          <input
            type="number"
            placeholder="Points Per Game"
            value={points ?? ''}
            onChange={(e) => setPoints(parseFloat(e.target.value))}
            className="form-input"
          />
          <input
            type="number"
            placeholder="Assists Per Game"
            value={assists ?? ''}
            onChange={(e) => setAssists(parseFloat(e.target.value))}
            className="form-input"
          />

          {/* Work Experience */}
          <input
            placeholder="Job Title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="form-input"
          />
          <input
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="form-input"
          />
          <input
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="form-input"
          />
          <textarea
            placeholder="Internship/Job Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-textarea md:col-span-2"
            rows={4}
          />

          <div className="md:col-span-2 flex gap-4 mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
            >
              Submit Profile
            </button>
            <button
              type="button"
              className="bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-500"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
