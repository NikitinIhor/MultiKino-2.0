import { Link, useLocation } from "react-router-dom";
import noImg from "../../assets/images/no-img.png";
import s from "./MovieList.module.css";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  vote_average: number;
  release_date: string;
}

interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  const location = useLocation();

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    return `${year}, ${month}`;
  }

  return (
    <ul className={s.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={s.item}>
          <Link to={`/movies/${movie.id}`} state={location} className={s.link}>
            <div className={s.imageWrap}>
              <img
                className={s.image}
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : noImg
                }
                alt={movie.overview || "No description available"}
                width="500"
                height="750"
                loading="lazy"
              />
            </div>
            <div className={s.content}>
              <div className={s.raiting}>
                <div className={s.raitingWrap}>
                  {Math.round(movie.vote_average * 10)}
                  <sup>%</sup>
                </div>
              </div>
              <div className={s.title}>{movie.title}</div>
              <div className={s.date}>{formatDate(movie.release_date)}</div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
