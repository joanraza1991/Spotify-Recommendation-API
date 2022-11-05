export interface RecommendedListType {
    artists: [
      {
        name: string;
      },
    ];
    id: string;
    album: 
      {
        id: string;
        images: [
          {
            url: string;
          },
        ];
      }
    name: string;
    track_number: string;
  }

  export interface AlbumDetailType {
    artists: [
      {
        name: string;
      },
    ];
    images: [];
    items: []
    id: string;
    album: 
      {
        id: string;
        images: [
          {
            url: string;
          },
        ];
      }
    name: string;
    track_number: string;
    preview_url: string
  }

  export interface TrackDetailType {
    artists: [
      {
        name: string;
      },
    ];
    items: []
    id: string;
    album: 
      {
        id: string;
        images: [
          {
            url: string;
          },
        ];
      }
    name: string;
    track_number: string;
    preview_url: string
  }