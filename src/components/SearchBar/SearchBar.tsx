import { Field, Form, Formik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { CgSearch } from "react-icons/cg";
import s from "./SearchBar.module.css";

interface SearchBarProps {
  handleSetQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ handleSetQuery }) => {
  const initialValues = {
    query: "",
  };

  const handleSubmit = (values: typeof initialValues) => {
    if (values.query.trim() === "") {
      toast.error("You must enter text to search for a movie");
      return;
    }
    handleSetQuery(values.query);
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={s.form}>
          <Field
            className={s.input}
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search for a movie"
          />
          <button className={s.btn} type="submit">
            <CgSearch className={s.icon} />
            Search
          </button>
        </Form>
      </Formik>
      <Toaster position="top-right" />
    </div>
  );
};

export default SearchBar;
