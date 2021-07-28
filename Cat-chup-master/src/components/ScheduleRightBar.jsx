import "../stylesheet/scheduleArea.css";
import { useSelector } from "react-redux";
import EventCardSchedule from "./PostComponents/EventCardSchedule";
import favicon from "../../src/img/favicon.png"
const ScehduleRightBar = (props) => {
  const postListStore = useSelector((state) => state.postListStore);
  const username = props.username;
  const postList = postListStore.postList;
  //console.log('in schedule right bar',postList.filter((post)=>{return  post.owner_name!==username&&post.type==='event'}));
  return (
    <div>
      {(postList && postList.filter((post)=>{return  post.owner_name!==username&&post.type==='event'&&(new Date(post.content.start) > new Date() ||
                new Date(post.content.start) === new Date())}).length  > 0) ? (
      
      <center>
        <div
          className="Schedule-header"
          style={{
            position: "sticky",
            top: "0",
            zIndex: "10",
            backgroundColor: "white",
          }}
        >
          <h3>Available Event</h3>
          {/* <WeekIcon /> */}
          <hr
            style={{
              height: 5,
            }}
          />
        </div>

        <div>
          {postList.map((event, index) => {
            if (
              event.type === "event" &&
              username !== event.username &&
              (new Date(event.content.start) > new Date() ||
                new Date(event.content.start) === new Date())
            ) {
              return <EventCardSchedule Info={event} key={event.id} />;
            }else{
              return null
            }
            // return <EventCardSchedule Info={event} key={event.id} />;
          })}
        </div>
      </center>
      ):
      <center style={{height:"100vh"}}>
        <div
          className="Schedule-header"
          style={{
            position: "sticky",
            top: "0",
            zIndex: "10",
            backgroundColor: "white",
          }}
        >
          <h3>Available Event</h3>
          {/* <WeekIcon /> */}
          <hr
            style={{
              height: 5,
            }}
          />
        </div>

        <div style={{height:"90vh",marginLeft:"2%",marginRight:"2%",overflow:"hidden", border:"2px solid grey", backgroundColor:"#96d9ff"}}>

        <div style={{padding:"10px",marginTop:"100%"}}>
          <p>There is currently no events right now</p>
          <img style={{width:"60%"}} src={favicon} alt="cathead"></img>
        </div>

        </div>

       
      </center>}
    </div>
  );
};

export default ScehduleRightBar;
