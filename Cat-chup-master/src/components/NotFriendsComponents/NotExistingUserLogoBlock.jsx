import React from "react"
import catLogo from '../../img/cat-chup_logo.png'
 
 const NotExistingUserLogoBlock =()=> {
     return (

        <div className='col-9 px-0 row mx-0'>
            <div className='col-9 px-0' style={{ height: "50vh", width:"100%"}}>
                <img style={{height:"40vh", paddingTop: "50px"}} src={catLogo} alt="catlogo"></img>

            </div>
            </div>
         
     )
 }


 export default NotExistingUserLogoBlock;