import {useCallback, useContext, useState} from 'react';
import {MyContext} from '../context/context';
import {AlbumDetailType} from '../types/view-list';

const useGetAlbumDetail = () => {
  const {state} = useContext(MyContext);
  const [albumDetail, setAlbumDetail] = useState<AlbumDetailType[]>();

  const getAlbumItem = useCallback(
    async (id: string) => {
      const controller = new AbortController();
      try {
        const url = `https://api.spotify.com/v1/albums/${id}`;
        await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${state.auth.token}`,
            'Content-type': 'application/json',
          },
        })
          .then(res => res.json())
          .then(result => {
            console.log('result ========>', result);
            
            setAlbumDetail(result.items)});
      } catch (error) {
        console.log(error);
      }
    },
    [state.auth.token],
  );

  return {albumDetail, getAlbumItem};
};

export default useGetAlbumDetail;