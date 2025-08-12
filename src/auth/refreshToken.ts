import axios from 'axios';
import createRefresh from 'react-auth-kit/createRefresh';
import { url } from '../config/url';
import { IUserData } from '../auth/store';

export const refreshToken = createRefresh<IUserData>({
  interval: 1, // Refresh interval in minutes
  refreshApiCallback: async ({
    authToken,
    refreshToken,
  }: {
    authToken?: string;
    refreshToken?: string;
  }) => {
    console.log('Attempting to refresh token...');
    try {
      console.log('Refreshing token...');
      const response = await axios.post(
        `${url}/auth/refresh`,
        { refreshToken },
        {
          headers: {
            Authorization: authToken ? `Bearer ${authToken}` : undefined,
          },
        }
      );
      console.log(response.data);

      return {
        isSuccess: true,
        newAuthToken: response.data.accessToken,
        newAuthTokenExpireIn: response.data.expiresIn,
        newRefreshToken: response.data.refreshToken,
        newRefreshTokenExpiresIn: response.data.refreshTokenExpireIn,
      };
    } catch {
      return {
        isSuccess: false,
        newAuthToken: '',
        newAuthTokenExpireIn: 0,
        newRefreshToken: undefined,
        newRefreshTokenExpiresIn: 0,
      };
    }
  },
});
