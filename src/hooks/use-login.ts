import {useContext} from 'react';
import {authorize} from 'react-native-app-auth';
import {MyContext} from '../context/context';
import {Types} from '../types/reducer-type';

const authConfig = {
  clientId: '696e84c49e0e418f8b6bb9e6abca2839',
  // optional clien secret
  clientSecret: '67b04d9a01944fea9bea5b8679ca07ac',
  redirectUrl: 'com.homitagTest://oauth/',
  scopes: ['playlist-modify-public', 'playlist-modify-private'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  },
};

export default function useLogin() {
  // const {token, setToken} = useContext(AuthContext);
  const {state, dispatch} = useContext(MyContext);

  const authLogin = async () => {
    try {
      const result = await authorize(authConfig);

      // setToken(result.accessToken);
      dispatch({
        type: Types.Auth,
        payload: {
          token: result.accessToken,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return {
    state,
    authLogin,
  };
}
