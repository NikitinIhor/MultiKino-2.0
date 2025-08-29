import axios from "axios";

const TOKEN = import.meta.env.VITE_API_READ_ACCESS_TOKEN_TMDB;
const URL = import.meta.env.VITE_BASE_URL;

const options = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
};

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  vote_average: number;
  release_date: string;
}

interface Genres {
  id: number;
  name: string;
}

interface MoviesResponse {
  results: Movie[];
  total_pages: number;
}

export const fetchMoviesTrending = async (
  page: number
): Promise<MoviesResponse> => {
  const urlTrending = `${URL}/discover/movie?include_adult=true&include_video=true&language=en-US&&sort_by=popularity.desc&page=${page}`;
  const response = await axios.get(urlTrending, options);
  console.log(response.data);
  return response.data;
};

export const fetchGenres = async (): Promise<Genres[]> => {
  const urlGenres = `${URL}/genre/movie/list?language=en`;
  const response = await axios.get(urlGenres, options);
  return response.data.genres;
};

export const fetchMovieByID = async (movieId: number): Promise<Movie> => {
  const urlMovieId = `${URL}/movie/${movieId}?language=en-US`;
  const response = await axios.get(urlMovieId, options);
  return response.data;
};

export const fetchMovieCredits = async (movieId: number): Promise<any[]> => {
  const urlMovieCredits = `${URL}/movie/${movieId}/credits?language=en-US`;
  const response = await axios.get(urlMovieCredits, options);
  return response.data.cast;
};

export const fetchMovieReviews = async (movieId: number): Promise<any> => {
  const urlMovieReviews = `${URL}/movie/${movieId}/reviews?language=en-US`;
  const response = await axios.get(urlMovieReviews, options);
  return response.data;
};

export const fetchMoviesBySearch = async (
  query: string,
  page: number
): Promise<MoviesResponse> => {
  const urlSearch = `${URL}/search/movie?query=${query}&include_adult=true&language=en-US&page=${page}`;
  const response = await axios.get<MoviesResponse>(urlSearch, options);
  return response.data;
};
