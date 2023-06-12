import React, { useState,useEffect } from "react";
import classes from "../assets/css/books.module.css";
import Delete from "./Delete";
import Edit from './Edit'
import Add from './Add'
import axios from 'axios'
const initialData = [];


const Students = () => {
  const [bookData, setBookData] = useState(initialData);

  const fillData=async ()=>{
  const res = await axios.get("https://bytesrums.vercel.app/api/books");
  console.log(res);
  setBookData(res.data)
  }
  useEffect(()=>{
    fillData();
  },[])
  return (
    <React.Fragment>
      <div className={classes.stdBody}>
          <div className={classes.rightWrapper}>
            <div className={classes.rightTop}>
              <div className={classes.subHeader}>
                <h1>Book Library</h1>
                <Add onRefresh={fillData}/>
              </div>
              <div className={classes.tableWrapper}>
                <table className={classes.contentTable}>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Title</th>
                      <th>Author </th>
                      <th>Genre</th>
                      <th>Publication Year</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookData.map((book, ind) => {
                      return (
                        <tr key={book._id}>
                          <td>{ind + 1}</td>
                          <td>{book.title}</td>
                          <td>
                            {book.author}
                          
                          </td>
                          <td>
                            {book.genre}
                          </td>
                          <td>{book.year}</td>
                          <td>                            
                              <div className={classes.actionIcons}>
                              <Edit book={book} onRefresh={fillData}/>
                              <Delete book={book} onRefresh={fillData}/>
                              </div>                          
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          
          </div>
        </div>
    </React.Fragment>
  );
};

export default Students;
