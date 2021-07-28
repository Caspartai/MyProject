import React from "react"
import catLogo from '../../img/cat-chup_logo.png'
 
 const NoPostsOrEventsPlaceholder =()=> {
     return (

        <div style={{display:"flex", justifyContent:"center"}}>
            <div style={{backgroundColor:"#dfdfdf"}} >
                <p style={{padding:"10px",fontSize:"30px",
                 fontWeight:"700",borderBottom:"2px solid #96d9ff",
                 color:"white",WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor:"black",  width:"32vw",
                 backgroundColor:"#dfdfdf"}}>Add your posts or events for your friends to see !</p>
                <img style={{padding:"10px",alignSelf:"center",height:"40vh"}} src={catLogo} alt="catlogo"></img>
            </div>
            </div>
     )
 }


 export default NoPostsOrEventsPlaceholder;