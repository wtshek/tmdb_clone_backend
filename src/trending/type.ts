export enum MediaType {
  All = 'all',
  Movie = 'movie',
  TV = 'tv',
  Person = 'person',
}

export enum TimeWindow {
  Day = 'day',
  Week = 'week',
}

interface Trending {
  poster_path: string | null;
  adult?: boolean;
  overview?: string;
  release_date?: string;
  genre_ids?: number[];
  id?: number;
  original_title?: string;
  original_language?: string;
  title?: string;
  backdrop_path?: string | null;
  popularity?: number;
  vote_count?: number;
  video?: boolean;
  vote_average?: number;
}

export interface TrendingResults {
  page?: number;
  results?: Trending[];
  total_pages?: number;
  total_results?: number;
}
