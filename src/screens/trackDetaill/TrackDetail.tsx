import {FlatList, StyleSheet, TouchableOpacity, SafeAreaView, Platform, StatusBar, View} from 'react-native';
import React, {FC, useContext, useEffect, useState, useCallback} from 'react';
import {AppBar,BoxTitle, ImageTrack, Title, TitleRelease} from '../../components/screens/albumDetail/styled/styles';
import {AlbumDetailType} from '../../types/view-list';
import {NavigationContext} from '@react-navigation/native';
import {MyContext} from '../../context/context';
import {millisToMinutesAndSeconds} from '../../utils/generic'


type Props = {
  data: AlbumDetailType[] | undefined;
  route?: any
};

const AlbumDetail: FC<Props> = ({route}) => {
  const {state} = useContext(MyContext);
  const [trackDetail, setTrackDetail] = useState<any>();

  useEffect(() => {
    const getAlbumItem =  () => {
      try {
        const url = `https://api.spotify.com/v1/tracks/${route.params.trackId}`;
         fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${state.auth.token}`,
            'Content-type': 'application/json',
          },
        })
          .then(res => res.json())
          .then(result => {
            setTrackDetail(result)
          });
      } catch (error) {
        console.log(error);
      }
    }
    getAlbumItem()
  }, [route])

  return (
    <SafeAreaView>
      {Platform.OS === 'ios' && (
        <StatusBar barStyle="light-content" translucent />
      )}
      <AppBar>
        <Title style={{fontWeight: '800'}}>Track Details</Title>
      </AppBar>
      <View style={{marginVertical: 16}}>

        {trackDetail && trackDetail?.album?.images &&
        <>
          <ImageTrack
              source={{
                uri: trackDetail?.allbum?.images[0].url == ''
                ? 'https://user-images.githubusercontent.com/57744555/171692133-4545c152-1f12-4181-b1fc-93976bdbc326.png'
                : trackDetail?.album?.images[0].url
              }}
              resizeMode="contain"
              style={{alignSelf: 'center', width: '100%', marginVertical: 16}}
            /> 
          <Title>Track Name: {trackDetail?.name}</Title>
          <Title>Artist Name: {trackDetail?.artists[0].name}</Title>
          <Title>Duration: {millisToMinutesAndSeconds(trackDetail?.duration_ms)}</Title>
        </>  
        }
      </View>
     
    </SafeAreaView>
  );
};

export default AlbumDetail;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexWrap: 'wrap',
    marginVertical: 15,
    height: '35%'
  },

  cardList: {
    marginHorizontal: 10,
    marginTop: 6
  },
});