import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import noImg from "../../assets/images/no-img.png";
import { fetchMovieCredits } from "../../services/api";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import s from "./MovieCast.module.css";

interface Actor {
  cast_id: number;
  name: string;
  original_name: string;
  character: string;
  profile_path: string | null;
}

const MovieCast: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();

  const [movieCredits, setMovieCredits] = useState<Actor[]>([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isNoData, setIsNoData] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    const getData = async () => {
      try {
        setIsError(false);
        setLoading(true);

        const cast = await fetchMovieCredits(Number(movieId));
        setMovieCredits(cast);
        setIsNoData(cast.length === 0);
      } catch (error) {
        setIsError(true);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [movieId]);

  return (
    <div className={s.cast}>
      {movieCredits.length > 0 ? (
        <ul className={s.list}>
          {movieCredits.map((actor) => (
            <li key={actor.cast_id} className={s.item}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w185/${actor.profile_path}`
                    : noImg
                }
                alt={actor.name ?? actor.original_name}
                width="185"
                height="277"
                loading="lazy"
              />
              <div className={s.actorWrap}>
                <div className={s.actorName}>
                  {actor.name ?? actor.original_name}
                </div>
                <div className={s.actorCharacter}>{actor.character}</div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        isNoData && (
          <div className={s.noData}>
            <p className={s.noDataContent}>
              There is no information about the cast of this film.
            </p>
          </div>
        )
      )}

      {loading && <Loader />}
      {isError && <ErrorMessage />}
    </div>
  );
};

export default MovieCast;
