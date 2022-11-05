export enum Types {
  AlbumPayload = 'ALBUM_PAYLOAD',
}
export type AuthType = {
    token: string;
  };
  
  export type UpdateUserType = {
    images: [
      {
        url: string;
      },
    ];
    display_name: string;
    id: string;
    followers: {
      total: number;
    };
  };

  export type AlbumPayloadType = {
    album_type: string;
    artist: [];
    images: [];
    name: string;
  };
  
  export type InputCreatePlaylistType = {
    value: string;
  };
  
  export type UpdatePlaylistsType = {
    id: string;
    name: string;
    description?: string;
    images: [
      {
        url?: string;
      },
    ];
  };
  
  export type DetailPlaylistsData = {
    id: string;
    description: string;
    images: [
      {
        url: string;
      },
    ];
    name: string;
    owner: {
      display_name: string;
    };
  };
  
  export type SnapshotUpdateType = {
    snapshot_id: string;
  };
  
  export type InitialState = {
    auth: AuthType;
    updateUser: UpdateUserType;
    albumPayload: AlbumPayloadType
    inputCreatePlaylist: InputCreatePlaylistType;
    updatePlaylists: UpdatePlaylistsType[];
    detailPlaylists: DetailPlaylistsData;
    snapshotUpdate: SnapshotUpdateType;
  };