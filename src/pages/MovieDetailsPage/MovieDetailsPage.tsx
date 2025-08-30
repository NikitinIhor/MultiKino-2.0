import { Suspense, useEffect, useRef, useState } from "react";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdRateReview } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import noImg from "../../assets/images/no-img.png";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import GoBack from "../../components/GoBack/GoBack";
import Loader from "../../components/Loader/Loader";
import { fetchMovieByID } from "../../services/api";
import s from "./MovieDetailsPage.module.css";

import type { Movie } from "../../types/movie";

const MovieDetailsPage: React.FC = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const location = useLocation();

  const goBackLink = useRef(location.state ?? "/movies");

  const { movieId } = useParams<{ movieId: string }>();

  const [movie, setMovie] = useState<Movie | null>(null);

  const [loading, setLoading] = useState(false);

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!movieId) return;
    const getMovie = async () => {
      try {
        setIsError(false);
        setLoading(true);

        const data = await fetchMovieByID(Number(movieId));
        setMovie(data);
      } catch (error) {
        setIsError(true);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getMovie();
  }, [movieId]);

  function formatDate(dateString: string, fullDate: boolean = true): string {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date string provided");
    }
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    return fullDate ? `${day}.${month}.${year}` : `${year}`;
  }

  function formatTime(duration: number): string {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    if (hours > 0 && minutes > 0) {
      return `${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return `${minutes}m`;
    }
  }

  return (
    <>
      <GoBack to={goBackLink.current} />

      {isMobile
        ? movie && (
            <div className={s.wrapMovie}>
              <div className={s.posterWrapper}>
                <div className={s.poster}>
                  <div
                    className={s.imageContent}
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/w780/${movie.backdrop_path})`,
                    }}
                  >
                    <div className={s.backgroundGradient}></div>
                    <div className={s.image}>
                      <img
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
                  </div>
                </div>
              </div>
              <ul className={s.details}>
                <li className={s.detailsItem}>
                  <h1 className={s.title}>
                    {movie.title}{" "}
                    <span className={s.titleYear}>
                      ({formatDate(movie.release_date, false)})
                    </span>
                  </h1>
                  <div className={s.infoWrap}>
                    <div className={s.info}>
                      <div className={s.date}>
                        <span>{formatDate(movie.release_date)}</span>{" "}
                        <span>({movie.origin_country})</span>
                      </div>
                      <div className={s.duration}>
                        {formatTime(movie.runtime)}
                      </div>
                    </div>
                    <div className={s.scoreWrap}>
                      <div className={s.score}>
                        <div className={s.scoreContainer}>
                          {Math.round(movie.vote_average * 10)}
                          <sup>%</sup>
                        </div>
                      </div>
                      <div className={s.scoreTitle}>
                        User
                        <br /> Score
                      </div>
                    </div>
                  </div>
                </li>
                <li className={s.detailsItem}>
                  <div className={s.genres}>
                    {movie.genres.map((genre) => genre.name).join(", ")}
                  </div>
                  <div className={s.tagline}>{movie.tagline}</div>
                </li>
                <li className={s.detailsItem}>
                  <div className={s.categoryName}>Overview</div>
                  <div>{movie.overview}</div>
                </li>
              </ul>
            </div>
          )
        : movie && (
            <div
              className={s.movieHeader}
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${movie.backdrop_path})`,
              }}
            >
              <div className={s.movieBg}>
                <div className={s.movieWrap}>
                  <div className={s.movieInner}>
                    <div className={s.poster}>
                      <div className={s.image}>
                        <img
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
                    </div>
                    <ul className={s.details}>
                      <li className={s.detailsItem}>
                        <h1 className={s.title}>
                          {movie.title}{" "}
                          <span className={s.titleYear}>
                            ({formatDate(movie.release_date, false)})
                          </span>
                        </h1>
                        <div className={s.infoWrap}>
                          <div className={s.info}>
                            <div className={s.date}>
                              <span>{formatDate(movie.release_date)}</span>{" "}
                              <span>({movie.origin_country})</span>
                            </div>
                            <div className={s.duration}>
                              {formatTime(movie.runtime)}
                            </div>
                          </div>
                          <div className={s.scoreWrap}>
                            <div className={s.score}>
                              <div className={s.scoreContainer}>
                                {Math.round(movie.vote_average * 10)}
                                <sup>%</sup>
                              </div>
                            </div>
                            <div className={s.scoreTitle}>
                              User
                              <br /> Score
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className={s.detailsItem}>
                        <div className={s.genres}>
                          {movie.genres.map((genre) => genre.name).join(", ")}
                        </div>
                        <div className={s.tagline}>{movie.tagline}</div>
                      </li>
                      <li className={s.detailsItem}>
                        <div className={s.categoryName}>Overview</div>
                        <div>{movie.overview}</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

      {movie && (
        <div>
          <ul className={s.listMoreInfo}>
            <li>
              <Link to="cast" className={s.linkMoreInfo}>
                <FaPeopleGroup /> Cast
              </Link>
            </li>
            <li>
              <Link to="reviews" className={s.linkMoreInfo}>
                <MdRateReview /> Rewiews
              </Link>
            </li>
          </ul>
          <Suspense
            fallback={
              <div>
                <Loader />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </div>
      )}

      {loading && <Loader />}
      {isError && <ErrorMessage />}
    </>
  );
};

export default MovieDetailsPage;
