import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import LoaderSearch from "../../components/LoaderSearch/LoaderSearch";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import MovieList from "../../components/MovieList/MovieList";
import SearchBar from "../../components/SearchBar/SearchBar";
import { fetchMoviesBySearch } from "../../services/api";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  vote_average: number;
  release_date: string;
}

const MoviesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const searchQuery = searchParams.get("query") ?? "";

  useEffect(() => {
    if (!searchQuery) return;

    document.title = "Movie Search";

    const getData = async () => {
      try {
        setIsError(false);
        setLoading(true);

        const { results = [], total_pages = 0 } = await fetchMoviesBySearch(
          searchQuery,
          currentPage
        );

        setMovies((prev) => [
          ...prev,
          ...results.filter(
            (movie) => !prev.some((prevMovie) => prevMovie.id === movie.id)
          ),
        ]);

        setTotalPages(total_pages);
      } catch (error: any) {
        setIsError(true);
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [currentPage, searchQuery]);

  const handleSetQuery = (query: string) => {
    setMovies([]);
    setSearchParams({ query });
    setCurrentPage(1);
  };

  const changePage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <>
      <SearchBar handleSetQuery={handleSetQuery} />

      {movies.length > 0 && <MovieList movies={movies} />}
      {loading && (currentPage > 1 ? <Loader /> : <LoaderSearch />)}
      {isError && <ErrorMessage />}
      {!loading && totalPages > currentPage && (
        <LoadMoreBtn onChangePage={changePage} />
      )}
    </>
  );
};

export default MoviesPage;
