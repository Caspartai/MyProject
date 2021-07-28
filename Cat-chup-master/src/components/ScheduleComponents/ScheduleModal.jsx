import React from "react";

const ScheduleModal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal d-block" : "modal d-none";

  return (
    <div className={showHideClassName}>
      <div className="modal-container">
        {children}
        <span  style={{cursor:'pointer',
          border:"1px solid black",
          borderRadius:"2rem",
          padding:"4px 10px 4px 10px",
          fontSize:"25px",
          backgroundColor:"red",
          textDecoration:"none",
          color:"white",
          display:"inline-flex",
          marginTop:"10px"
            }}
               className="modal-close"
                onClick={handleClose}>
          close
        </span>
      </div>
    </div>
  );
};

export default ScheduleModal;
