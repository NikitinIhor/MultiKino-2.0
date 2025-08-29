import { lazy, Suspense } from "react";
import { useMediaQuery } from "react-responsive";
import { Route, Routes } from "react-router-dom";

import Footer from "./components/Footer/Footer";
import GoUp from "./components/GoUp/GoUp";
import Navigation from "./components/Navigation/Navigation";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(
  () => import("./pages/MovieDetailsPage/MovieDetailsPage")
);
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"));
const MovieReviews = lazy(
  () => import("./components/MovieReviews/MovieReviews")
);
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

function App() {
  const isBigScreen = useMediaQuery({ query: "(min-width: 481px)" });

  return (
    <>
      <Navigation />

      <main className="main">
        <Suspense>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />

      {isBigScreen && <GoUp />}
    </>
  );
}

export default App;
