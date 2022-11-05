import {Platform, SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import useRecommendPlaylists from '../../hooks/use-list';
import RecommendedList from '../../components/screens/home/HomeList';

const Home = () => {
  const {recommendedList, state} = useRecommendPlaylists();
  console.log('state======>', state.albumPayload);
  

  return (
    <SafeAreaView>
      {Platform.OS === 'ios' && (
        <StatusBar barStyle="light-content" translucent />
      )}
      <RecommendedList data={recommendedList} />
    </SafeAreaView>
  );
};

export default Home;