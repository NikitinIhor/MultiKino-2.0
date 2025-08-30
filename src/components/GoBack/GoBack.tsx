import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import s from "./GoBack.module.css";

const GoBack = ({ to = "/", children = "Go Back" }) => {
  return (
    <Link className={s.link} to={to}>
      <IoArrowBack /> {children}
    </Link>
  );
};

export default GoBack;
