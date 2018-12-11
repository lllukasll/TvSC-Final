import { IEpisode } from './episode';

export interface ISeason {
  id: number;
  seasonNumber: number;
  watched: boolean;
  episodes: IEpisode[];
}
