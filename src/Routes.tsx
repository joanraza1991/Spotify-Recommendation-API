import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {horizontalAnimation, verticalAnimation} from './utils/transition';
import {MyTheme} from './utils/theme';
import Login from './screens/login/Login';
import useLogin from './hooks/use-login';
import HomeList from './screens/home/HomeList';
import AlbumDetail from './screens/albumDetail/AlbumDetail';
import TrackDetail from './screens/trackDetaill/TrackDetail'

const Stack = createStackNavigator();

const Routes = () => {
  const {state} = useLogin();

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator screenOptions={horizontalAnimation}>
        {state.auth.token === '' ? (
          <>
            <Stack.Screen name="Login" component={Login} />
          </>
        ) : (
          <>
          <Stack.Screen name="Home" component={HomeList} />
          <Stack.Screen name="AlbumDetail" component={AlbumDetail} />
          <Stack.Screen name="TrackDetail" component={TrackDetail} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;