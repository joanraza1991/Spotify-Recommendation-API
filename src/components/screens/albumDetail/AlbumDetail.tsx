import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import React, {FC, useContext, useEffect} from 'react';
import {AppBar,BoxTitle, ImageTrack, Title, TitleRelease} from './styled/styles';
import {AlbumDetailType} from '../../../types/view-list';
import {NavigationContext} from '@react-navigation/native';
import useGetAlbumDetail from '../../../hooks/use-getAlbumDetail'


type Props = {
  data: AlbumDetailType[] | undefined;
  route?: any
};

const AlbumDetail: FC<Props> = ({data, route}) => {
  const navigation = useContext(NavigationContext);
  const {albumDetail, getAlbumItem} = useGetAlbumDetail()

  console.log('params ================================>', route.params.albumId);
  
  // useEffect(() => {
  //   getAlbumItem()
  // }, [getAlbumItem])
  return (
    <>
      <AppBar>
        <Title>Album Details</Title>
      </AppBar>
      {/* <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        style={styles.container}
        data={data}
        numColumns={2}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          // console.log('item ==========>', item.album.id);
          return (
          <TouchableOpacity style={styles.cardList} onPress={() => navigation?.navigate('', {albumId: item.album.id})}>
            <ImageTrack
              source={{
                uri: item.album.images[0].url === undefined 
                ? 'https://user-images.githubusercontent.com/57744555/171692133-4545c152-1f12-4181-b1fc-93976bdbc326.png'
                : item.album.images[0].url
              }}
              resizeMode="cover"
            />
            <BoxTitle>
              <TitleRelease>Title: {item.name}</TitleRelease>
            </BoxTitle>
            <TitleRelease>Tracks: {item.track_number}</TitleRelease>
          </TouchableOpacity>
        )}}
      /> */}
    </>
  );
};

export default AlbumDetail;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexWrap: 'wrap',
    marginVertical: 15,
    marginBottom: 30,
  },

  cardList: {
    marginHorizontal: 10,
    marginTop: 6
  },
});