import { MdDownloading } from "react-icons/md";
import s from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onChangePage: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onChangePage }) => {
  const handleClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage();
    evt.currentTarget.blur();
  };

  return (
    <button className={s.btn} type="button" onClick={handleClick}>
      Show More Movies
      <MdDownloading />
    </button>
  );
};

export default LoadMoreBtn;
