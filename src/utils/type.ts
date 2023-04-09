export enum MediaType {
  Movie = 'movie',
  TV = 'tv',
}

export enum TimeWindow {
  Today = 'today',
  Week = 'this-week',
}

export enum Availability {
  ForRents = 'for_rents',
  OnTv = 'on_tv',
  InTheaters = 'in_theaters',
  Streaming = 'streaming',
}

export type Asset = {
  id: number;
  title: string;
  tmdb_id: string;
  media_type: MediaType;
  image: string;
  time_window: TimeWindow;
  available: Availability;
};
