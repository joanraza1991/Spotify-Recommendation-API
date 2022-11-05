import {FlatList, StyleSheet, TouchableOpacity, SafeAreaView, Platform, StatusBar, View} from 'react-native';
import React, {FC, useContext, useEffect, useState, useCallback} from 'react';
import {AppBar,BoxTitle, ImageTrack, Title, TitleRelease} from '../../components/screens/albumDetail/styled/styles';
import {AlbumDetailType} from '../../types/view-list';
import {NavigationContext} from '@react-navigation/native';
import {MyContext} from '../../context/context';


type Props = {
  data: AlbumDetailType[] | undefined;
  route?: any
};

const AlbumDetail: FC<Props> = ({data, route}) => {
  const {state} = useContext(MyContext);
  const navigation = useContext(NavigationContext);
  const [tracks, setTracks] = useState<AlbumDetailType[]>([]);
  const [albumDetail, setAlbumDetail] = useState<any>([]);

  useEffect(() => {
    const getAlbumItem =  () => {
      try {
        const url = `https://api.spotify.com/v1/albums/${route.params.albumId}`;
         fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${state.auth.token}`,
            'Content-type': 'application/json',
          },
        })
          .then(res => res.json())
          .then(result => {
            setAlbumDetail(result)
            setTracks(result.tracks.items)
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
        <Title>Album Details</Title>
      </AppBar>
      <View style={{}}>

        {albumDetail && albumDetail.images &&
        <>
          <ImageTrack
              source={{
                uri: albumDetail?.images[0].url == ''
                ? 'https://user-images.githubusercontent.com/57744555/171692133-4545c152-1f12-4181-b1fc-93976bdbc326.png'
                : albumDetail?.images[0].url
              }}
              resizeMode="cover"
              style={{alignSelf: 'center', width: '100%', marginVertical: 16}}
            /> 
          <Title>Album Name: {albumDetail?.name}</Title>
          <Title>Artist Name: {albumDetail?.artists[0].name}</Title>
          <Title>Popularity: {albumDetail?.popularity}</Title>
        </>  
        }
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        style={styles.container}
        data={tracks}
        numColumns={2}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
          <TouchableOpacity style={styles.cardList} onPress={() => navigation?.navigate('TrackDetail', {trackId: item.id})}>
            <BoxTitle>
              <TitleRelease>{item.track_number}. {item.name}</TitleRelease>
            </BoxTitle>
          </TouchableOpacity>
        )}}
      />
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