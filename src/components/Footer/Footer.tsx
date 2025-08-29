import { SiThemoviedatabase } from "react-icons/si";
import s from "./Footer.module.css";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className={s.wrap}>
        <SiThemoviedatabase className={s.icon} />
        Movies | Built with React | {currentYear}
      </div>
    </footer>
  );
};

export default Footer;
