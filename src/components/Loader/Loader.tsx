import { DotLoader } from "react-spinners";
import s from "./Loader.module.css";

const Loader: React.FC = () => {
  return (
    <div className={s.loader}>
      <DotLoader
        color="#10B3E1"
        size={80}
        speedMultiplier={1.2}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
