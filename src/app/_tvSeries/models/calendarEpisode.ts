import * as moment from 'moment';

export interface ICalendarEpisode {
  tvShowId: number;
  tvShowName: string;
  seasonNumber: number;
  episodeNumber: number;
  episodeName: string;
  airingDate: string;
  tvSeriesRatings: any;
  backgroundPhotoName: string;
  photoName: string;
  description: string;
}
