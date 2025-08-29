import { useEffect, useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import MovieList from "../../components/MovieList/MovieList";
import { fetchMoviesTrending } from "../../services/api";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  vote_average: number;
  release_date: string;
}

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    document.title = "Popular Movies";

    const getData = async () => {
      try {
        setIsError(false);
        setLoading(true);

        const { results = [], total_pages = 0 } = await fetchMoviesTrending(
          currentPage
        );

        setMovies((prev) => {
          const newMovies = results.filter(
            (movie) => !prev.some((prevMovie) => prevMovie.id === movie.id)
          );
          return [...prev, ...newMovies];
        });

        setTotalPages(total_pages);
      } catch (error) {
        setIsError(true);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [currentPage]);

  const changePage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <>
      {movies.length > 0 && <MovieList movies={movies} />}
      {loading && <Loader />}
      {isError && <ErrorMessage />}
      {!loading && totalPages > currentPage && (
        <LoadMoreBtn onChangePage={changePage} />
      )}
    </>
  );
};

export default HomePage;
