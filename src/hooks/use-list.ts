import React, {useContext, useEffect} from 'react';
import {MyContext} from '../context/context';
import {RecommendedListType} from '../types/view-list';
import {Types} from '../types/reducer-type';

let artistIds: string[] = []

const delay = (t: any) => new Promise(resolve => setTimeout(resolve, t));
const useRecommendPlaylists = () => {
  const {state, dispatch} = useContext(MyContext);
  const [recommendedList, setRecommendedList] = React.useState<RecommendedListType[]>();
  const [country, setCountry] = React.useState<string>();
console.log('token ===================================>', state.auth.token);

  useEffect(() => {
    try {
      Promise.all([
        fetch('https://api.spotify.com/v1/tracks?ids=6rqhFgbbKwnb9MLmUQDhG6', {
          headers: {
            Authorization: `Bearer ${state.auth.token}`,
            'Content-Type': 'application/json',
          },
        })
          .then(res => res.json())
          .then(result => {
            const tracks: any[] = result.tracks
            for(let i: number = 0; i < tracks.length; i++){
            const artistId = tracks[i].album.artists[i].id 
            artistIds.push(artistId)
          }
          }),
        fetch('https://ipinfo.io', {headers: {'Content-Type': 'application/json' }})
          .then(res => res.json())
          .then(result => setCountry(result.country)),
        delay(1000),
        fetch(`https://api.spotify.com/v1/recommendations?market=${country}&seed_artists=${artistIds.join()}&seed_tracks=6rqhFgbbKwnb9MLmUQDhG6`, {
          headers: {
            Authorization: `Bearer ${state.auth.token}`,
            'Content-Type': 'application/json',
            },
          })
          .then(res => res.json())
          .then(result => {
            setRecommendedList(result.tracks)
          })   
      ]);
    } catch (error) {
      console.error(error);
    }
  }, [state.auth.token, country]);

  return {recommendedList,state};
};
export default useRecommendPlaylists;