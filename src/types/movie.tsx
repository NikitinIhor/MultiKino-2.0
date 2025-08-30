export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  backdrop_path: string | null;
  poster_path: string | null;
  tagline: string;
  runtime: number;
  vote_average: number;
  origin_country?: string[];
  genres: Genre[];
}
