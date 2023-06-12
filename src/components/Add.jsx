import React,{useState} from 'react'
import Modal from './Modal'
import classes from "../assets/css/books.module.css";
import add from "../assets/svg/add.svg";

const AddModal = ({book,onRefresh={onRefresh}}) => {
    const [show,setShow]=useState(false)
    const closeHandler=()=>{
        setShow(false)
    }

  return (
    <React.Fragment>
         <button
            className={classes.btn}
            onClick={() => {
            setShow(true);
            }}
        >
            <span>
            <img src={add} alt="" />
            </span>
            &nbsp;
            <span>Add</span>
        </button>
        
        {show && <Modal book={null} onClose={closeHandler } type={'ADD'} onRefresh={onRefresh}/>}
       
    </React.Fragment>
  );
};

export default AddModal;
