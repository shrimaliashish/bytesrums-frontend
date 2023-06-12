import React,{useState} from 'react'
import Modal from './Modal'
import edit_icon from "../assets/img/edit_attend.png";
const Edit = ({book,onRefresh}) => {
    const [show,setShow]=useState(false)
    const handleEdit=()=>{
        setShow(true)
    }
    const closeHandler=()=>{
        setShow(false)
    }
    const refresh=()=>{
        onRefresh()
    }
    return (
        <React.Fragment>
        <span
                    onClick={handleEdit}
                >
                    <img
                        src={edit_icon}
                        className="card_edit"
                        alt="delete"
                    />
                </span>
           {show &&  <Modal book={book} onClose={closeHandler} type={'EDIT'} onRefresh={refresh}/>}
        </React.Fragment>
    );
};

export default Edit;