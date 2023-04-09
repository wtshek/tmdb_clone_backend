enum MediaType {
  Movie = 'movie',
  TV = 'tv',
}

enum TimeWindow {
  Today = 'today',
  Week = 'this-week',
}

enum Availability {
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
