import type { MouseEvent } from "react";
import { useEffect, useState } from "react";
import { IoArrowUpOutline } from "react-icons/io5";
import s from "./GoUp.module.css";

const GoUp: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsActive(window.scrollY > 150);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = (evt: MouseEvent<HTMLButtonElement>) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    evt.currentTarget.blur();
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={`${s.goUp} ${isActive ? s.isActive : ""}`}
      aria-label="Back to Top"
    >
      <IoArrowUpOutline className={s.icon} />
    </button>
  );
};

export default GoUp;
