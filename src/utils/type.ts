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

export enum PanelType {
  Popular = 'popular',
  Trending = 'trending',
  ForRents = 'for_rents',
  OnTv = 'on_tv',
  InTheaters = 'in_theaters',
  Streaming = 'streaming',
  Today = 'today',
  ThisWeek = 'this_week',
}

export type Asset = {
  id: number;
  title: string;
  tmdb_id: string;
  media_type: MediaType;
  image: string;
  available: Availability;
  created_at: number;
  updated_at: number;
};
