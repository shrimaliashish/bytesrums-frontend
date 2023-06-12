import { useReducer } from "react";
import classes from "../assets/css/modal.module.css";
import axios from "axios";
const errorReducer = (state, action) => {
  switch (action.type) {
    case "AUTHOR_ERROR":
      return {
        ...state,
        authorErrMsg: "Error: Author field cannot be left blank",
        isAuthorErr: true,
      };
    case "TITLE_ERROR":
      return {
        ...state,
        titleErrMsg: "Error: Title field cannot be left blank",
        isTitleErr: true,
      };
    case "GENRE_ERROR":
      return {
        ...state,
        genreErrMsg: "Error:Genre field cannot be left blank",
        isGenreErr: true,
      };
    case "YEAR_ERROR":
      return {
        ...state,
        yearErrMsg: "Error:Please input publication year",
        isYearErr: true,
      };
    case "REMOVE_TITLE_ERROR":
      return {
        ...state,
        titleErrMsg: "",
        isTitleErr: false,
      };
    case "REMOVE_YEAR_ERROR":
      return {
        ...state,
        yearErrMsg: " ",
        isYearErr: false,
      };
    case "REMOVE_GENRE_ERROR":
      return {
        ...state,
        genreErrMsg: "",
        isGenreErr: false,
      };
    case "REMOVE_AUTHOR_ERROR":
      return {
        ...state,
        authorErrMsg: "",
        isAuthorErr: false,
      };
    default:
  }
  return state;
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "TITLE":
      return { ...state, title: action.value };
    case "AUTHOR":
      return { ...state, author: action.value };
    case "GENRE":
      return {
        ...state,
        genre: action.value,
      };

    case "YEAR":
      return {
        ...state,
        year: action.value,
      };
    default:
      return state;
  }
};

const intitialErr = {
  titleErrMsg: "",
  isTitleErr: false,
  author: "",
  isAuthorErr: false,
  genre: "",
  isGenreErr: false,
  year: "",
  isYearErr: false,
};

const formInitialData = {
  title: "",
  author: "",
  genre: "",
  year: "",
};

const Modal = (props) => {
  const [formData, dispatch] = useReducer(
    formReducer,
    props.book ? props.book : formInitialData
  );
  const [err, dispathErr] = useReducer(errorReducer, intitialErr);
  const closeHandler = () => {
    props.onClose();
  };

  const titleChangehandler = (event) => {
    if (event.target.value !== "" && !isNaN(event.target.value)) return;
    dispatch({ type: "TITLE", value: event.target.value });
    if (!event.target.value) {
      dispathErr({ type: "TITLE_ERROR" });
      return;
    }
    dispathErr({ type: "REMOVE_TITLE_ERROR" });
  };

  const authorChangehandler = (event) => {
    if (event.target.value !== "" && !isNaN(event.target.value)) return;
    dispatch({ type: "AUTHOR", value: event.target.value });
    if (!event.target.value) {
      dispathErr({ type: "AUTHOR_ERROR" });
      return;
    }
    dispathErr({ type: "REMOVE_AUTHOR_ERROR" });
  };

  const genreChangehandler = (event) => {
    //dispatch({ type: "GENRE", value: event.target.value });
    if (event.target.value !== "" && !isNaN(event.target.value)) return;
    dispatch({ type: "GENRE", value: event.target.value });
    if (!event.target.value) {
      dispathErr({ type: "GENRE_ERROR" });
      return;
    }

    dispathErr({ type: "REMOVE_GENRE_ERROR" });
  };

  const yearChangehandler = (event) => {
    //  dispatch({ type: "YEAR", value: event.target.value });
    if (event.target.value !== "" && isNaN(event.target.value)) return;
    dispatch({ type: "YEAR", value: event.target.value });
    if (!event.target.value) {
      dispathErr({ type: "YEAR_ERROR" });
      return;
    }

    dispathErr({ type: "REMOVE_YEAR_ERROR" });
  };

  const submitHandler = async () => {
    let error = false;
    if (!formData.title) {
      dispathErr({ type: "TITLE_ERROR" });
      error = true;
    }
    if (!formData.author) {
      dispathErr({ type: "AUTHOR_ERROR" });
      error = true;
    }
    if (!formData.genre) {
      dispathErr({ type: "GENRE_ERROR" });
      error = true;
    }
    if (!formData.year) {
      dispathErr({ type: "YEAR_ERROR" });
      error = true;
    }
    if (error) {
      return;
    }

    if (props.type === "ADD") {
      try {
        const res = await axios.post(
          "https://bytesrums.vercel.app/api/books",
          formData
        );
        props.onRefresh();
      } catch (e) {
        console.log(e);
      }
      props.onClose();
      return;
    }

    try {
      const res = await axios.put(
        `https://bytesrums.vercel.app/api/books/${props.book._id}`,
        formData
      );
      props.onRefresh();
    } catch (e) {
      console.log(e);
    }

    props.onClose();
  };

  return (
    <div className={classes.popupBox}>
      <div className={classes.box}>
        <div className={classes.head}>
          <h3>{props.type === "EDIT" ? "Edit" : "Add"} Book</h3>
        </div>
        <div className={classes.form}>
          <div className={classes.inp}>
            {/* bookTitle */}
            <div>
              <label htmlFor="bookTitle" required>
                Title*
              </label>
            </div>
            <div className={err.isTitleErr ? classes.error : ""}>
              <input
                type="text"
                value={formData.title}
                onChange={titleChangehandler}
              />
            </div>

            <p className={err.isTitleErr ? classes.error : ""}>
              {err.titleErrMsg}
            </p>
          </div>

          {/* author */}
          <div className={classes.inp}>
            <div>
              <label htmlFor="bookTitle" required>
                Author*
              </label>
            </div>
            <div className={err.isAuthorErr ? classes.error : ""}>
              <input
                type="text"
                value={formData.author}
                onChange={authorChangehandler}
              />
            </div>
            <p className={err.isAuthorErr ? classes.error : ""}>
              {err.authorErrMsg}
            </p>
          </div>
          {/* genre */}
          <div className={classes.inp}>
            <div>
              <label htmlFor="bookTitle" required>
                Genre*
              </label>
            </div>
            <div className={err.isGenreErr ? classes.error : ""}>
              <input
                type="text"
                value={formData.genre}
                onChange={genreChangehandler}
              />
            </div>
            <p className={err.isGenreErr ? classes.error : ""}>
              {err.genreErrMsg}
            </p>
          </div>
          {/* publication_year */}

          <div className={classes.inp}>
            <div>
              <label htmlFor="bookTitle" required>
                Publication Year*
              </label>
            </div>
            <div className={err.isYearErr ? classes.error : ""}>
              <input
                type="year"
                value={formData.year}
                onChange={yearChangehandler}
              />
            </div>
            <p className={err.isYearErr ? classes.error : ""}>
              {err.yearErrMsg}
            </p>
          </div>

          {/* button */}
        </div>
        <div className={classes.buttons}>
          <button className={classes.btn1} onClick={submitHandler}>
            Confirm
          </button>
          <button className={classes.btn2} onClick={closeHandler}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
