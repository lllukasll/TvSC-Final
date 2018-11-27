export interface TvShow {
  id: number;
  name: string;
  description: string;
  network: string;
  episodeLength: number;
  emissionHour: string;
  seasons: any[];
  isFavourite: boolean;
  userRatingDto: {
    story: number;
    effects: number;
    music: number;
    average: number;
  };
}
