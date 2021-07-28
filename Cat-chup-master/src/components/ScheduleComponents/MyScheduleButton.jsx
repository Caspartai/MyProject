import { useHistory } from "react-router-dom";






export const MyscheduleButton = ()=>{
  //const history = useHistory();
  const history = useHistory();
  const routeChange = () => {
    let path = "/schedule";
    
    history.push(path);

    //window.location.href = "/schedule";
  };
    return(
    <div style={{marginTop:"10px"}}>
          <button style={{backgroundColor:"#96d9ff", color:"white", borderRadius:"15px", padding:"3px 15px 3px 20px", fontSize:"25px", border:"none"}} id="myScheduleButton" onClick={routeChange}>
      My Schedule
    </button>

    </div>
    )
}



// const routeChange = () => {
//     // let path = "/schedule";
//     // const history = useHistory();
//     // history.pushState(path);
//     window.location.href = "/schedule";
//   };

//   return (
//     <div className="plansTodaySection">
//       <p className="myPlansTodayText"> My plans today </p>
//       <div
//         className="plansTodayContainer"
//         onClick={routeChange}