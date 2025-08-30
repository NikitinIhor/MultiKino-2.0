import { useEffect, useState } from "react";
import { BiSolidUser } from "react-icons/bi";
import { GoStarFill } from "react-icons/go";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../services/api";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import s from "./MovieReviews.module.css";

interface AuthorDetails {
  avatar_path: string | null;
  rating: number | null;
}

interface Review {
  id: string;
  author: string;
  content: string;
  created_at: string;
  updated_at?: string;
  author_details: AuthorDetails;
}

const MovieReviews: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();

  const [movieReviews, setMovieReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isNoData, setIsNoData] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    const getData = async () => {
      try {
        setIsError(false);
        setLoading(true);

        const { results } = await fetchMovieReviews(Number(movieId));
        setMovieReviews(results);
        setIsNoData(results.length === 0);
      } catch (error) {
        setIsError(true);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [movieId]);

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  }

  return (
    <div className={s.reviews}>
      {movieReviews.length > 0 ? (
        <ul className={s.list}>
          {movieReviews.map((review) => (
            <li key={review.id} className={s.item}>
              <div className={s.reviewHeader}>
                <div className={s.reviewAvatar}>
                  {review.author_details.avatar_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/original/${review.author_details.avatar_path}`}
                      alt={review.author}
                      width="185"
                      height="112"
                      loading="lazy"
                    />
                  ) : (
                    <BiSolidUser />
                  )}
                </div>
                <div className={s.reviewInfo}>
                  <div className={s.reviewAuthor}>{review.author}</div>
                  <div className={s.reviewInfoDetails}>
                    <div className={s.reviewAuthorRaiting}>
                      <GoStarFill />
                      <span className={s.raitingValue}>
                        {review.author_details.rating
                          ? review.author_details.rating * 10
                          : "N/A"}
                        <sup>%</sup>
                      </span>
                    </div>
                    <div className={s.reviewWritten}>
                      Written by{" "}
                      <span className={s.author}>{review.author}</span> on{" "}
                      {formatDate(review.updated_at ?? review.created_at)}
                    </div>
                  </div>
                </div>
              </div>
              <div className={s.reviewContent}>{review.content}</div>
            </li>
          ))}
        </ul>
      ) : (
        isNoData && (
          <div className={s.noData}>
            <p className={s.noDataContent}>
              We don&apos;t have any reviews for this movie.
            </p>
          </div>
        )
      )}

      {loading && <Loader />}
      {isError && <ErrorMessage />}
    </div>
  );
};

export default MovieReviews;
