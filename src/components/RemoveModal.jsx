import React, { useEffect, useState } from "react";
import classes from "../assets/css/removeModal.module.css";
import axios from "axios";
const RemoveModal = (props) => {
  const submitHandler = async () => {
    try {
      const res = await axios.delete(
        `https://bytesrums.vercel.app/api/books/${props.book._id}`
      );
      props.onRefresh();
    } catch (e) {
      console.log(e);
    }
    props.onClose();
  };
  const closeHandler = () => {
    props.onClose();
  };

  return (
    <div className={classes.popupBox}>
      <div className={classes.box}>
        <div className={classes.head}>
          <h2>Remove Book</h2>
        </div>

        <div className={classes.msg}>
          <h3>
            Are you sure you want to remove the current book from the list?
          </h3>
          <div className={classes.inp}>
            <div>
              <label htmlFor="studentName" required>
                Book Name
              </label>
            </div>
            <div>
              <p>{props.book.title}</p>
            </div>
          </div>
          <div className={classes.inp}>
            <div>
              <label htmlFor="studentName" required>
                Publication Year
              </label>
            </div>
            <div>
              <p>{props.book.year}</p>
            </div>
          </div>
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

export default RemoveModal;
