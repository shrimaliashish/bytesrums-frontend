import React,{useState} from 'react'
import RemoveModal from './RemoveModal';
import delete_icon from "../assets/img/icon_trash.png";
const Delete = ({book,onRefresh}) => {
    const [show,setShow]=useState(false)
    const openHandler=()=>{
      setShow(true);
    }
    const closeHandler=()=>{
      setShow(false);
    }
  
    const refresh=()=>{
      onRefresh()
  }
  return (
    <React.Fragment>
         {show && <RemoveModal onClose={closeHandler} book={book} onRefresh={refresh}/>}
         <span
            onClick={openHandler}
        >
            <img
            src={delete_icon}
            className="card_edit"
            alt="delete"
            />
        </span>
       
    </React.Fragment>
  );
};

export default Delete;
