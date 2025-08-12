import { useEffect, useState } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { IUserData } from '../../../auth/store';
import './talentPool.css';
import { getAthletes, GetAthletesResponse } from '../../../api/athlete';

export const TalentPool = () => {
  const authHeader = useAuthHeader();
  const user = useAuthUser<IUserData>();

  const [athletes, setAthletes] = useState<GetAthletesResponse[]>([]);

  useEffect(() => {
    getAthletes({}, authHeader).then((data) => setAthletes(data));
  }, []);

  return <div className="w-full max-w-6xl mx-auto mt-6 relative">Talent Pool</div>;
};
