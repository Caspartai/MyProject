import React from "react"
import catLogo from '../../img/cat-chup_logo.png'
 
 const NoPostsPlaceHolder =()=> {
     return (

        <div style={{display:"flex", justifyContent:"center"}}>
            <div style={{backgroundColor:"#dfdfdf"}} >
                <p style={{padding:"10px",fontSize:"30px",
                 fontWeight:"700",borderBottom:"2px solid #96d9ff",
                 color:"white",WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor:"black",  width:"32vw",
                 backgroundColor:"#dfdfdf"}}>
                     You currently have no posts or events!</p>
                <img style={{padding:"10px",alignSelf:"center",height:"40vh"}} src={catLogo} alt="catlogo"></img>
            </div>
            </div>
     )
 }


 export default NoPostsPlaceHolder;