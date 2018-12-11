export interface TvShow {
  id: number;
  name: string;
  description: string;
  network: string;
  episodeLength: number;
  emissionHour: string;
  seasons: [
    {
      id: number;
      seasonNumber: number;
      episodes: [{
        id: number;
        episodeNumber: number;
        episodeName: string;
        airingDate: string;
        watched:  boolean;
      }]
    }
  ];
  isFavourite: boolean;
  userRatingDto: {
    story: number;
    effects: number;
    music: number;
    average: number;
  };
}
