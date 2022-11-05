import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import React, {FC, useContext} from 'react';
import {AppBar,BoxTitle, ImageTrack, Title, TitleRelease} from './styled/styles';
import {RecommendedListType} from '../../../types/view-list';
import {NavigationContext} from '@react-navigation/native';


type Props = {
  data: RecommendedListType[] | undefined;
};

const HomeList: FC<Props> = ({data}) => {
  const navigation = useContext(NavigationContext);
  return (
    <>
      <AppBar>
        <Title>Recommended Playlist</Title>
      </AppBar>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        style={styles.container}
        data={data}
        numColumns={2}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          console.log('item ==========>', item.album);
          return (
          <TouchableOpacity style={styles.cardList} onPress={() => navigation?.navigate('AlbumDetail', {albumId: item.album.id})}>
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
      />
    </>
  );
};

export default HomeList;

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