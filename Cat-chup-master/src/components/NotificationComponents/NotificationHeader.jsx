import '../../stylesheet/notificationPage.css'


const NotificationHeader = () => {

    return (
        <div className="notificationHeaderContainer" style={{borderBottom:'1px solid #303030',marginBottom:'5px', paddingTop:'30px',backgroundColor:"#96d9ff", position:"sticky", top:"0"}}>
            <h2 style={{paddingBottom:'20px', paddingLeft:"20px"}} >Notifications</h2>
        </div>


    )

}

export default NotificationHeader;