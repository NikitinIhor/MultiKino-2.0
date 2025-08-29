import clsx from "clsx";
import { BiSolidMoviePlay } from "react-icons/bi";
import { CgSearch } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";

const buildLinkClass = ({ isActive }: { isActive: boolean }) =>
  clsx(s.link, { [s.active]: isActive });

const Navigation: React.FC = () => {
  return (
    <header>
      <nav className={s.nav}>
        <NavLink to="/" className={buildLinkClass}>
          <BiSolidMoviePlay className={s.icon} />
          Popular Movies
        </NavLink>
        <NavLink to="/movies" className={buildLinkClass}>
          <CgSearch className={s.icon} />
          Movie Search
        </NavLink>
      </nav>
    </header>
  );
};

export default Navigation;
