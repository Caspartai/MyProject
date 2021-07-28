import { Container, Row, Col } from 'reactstrap';
import CalendarIcon from '../img/calendar-icon.png';
import MondayIcon from '../img/monday-icon.png';
import TuesdayIcon from '../img/tuesday-icon.png';
import WednesdayIcon from '../img/wednesday-icon.png';
import ThursdayIcon from '../img/thursday-icon.png';
import FridayIcon from '../img/friday-icon.png';
import SaturdayIcon from '../img/saturday-icon.png';
import SundayIcon from '../img/sunday-icon.png';
import 'bootstrap/dist/css/bootstrap.min.css'

const WeekIcon = () => {
    return ( 
        <Container>
          <Row  style={{display:"flex",width:"90%" }} >
             <Col style={{margin:"0",padding:"0" }} ><img src={MondayIcon} alt="monday" style={{width:"20px", height:"20px"}} /></Col>
             <Col style={{margin:"0",padding:"0" }}><img src={TuesdayIcon} alt="tuesday"  style={{width:"20px", height:"20px"}} /></Col>
             <Col style={{margin:"0",padding:"0" }}><img src={WednesdayIcon} alt="wednesday"  style={{width:"20px", height:"20px"}} /></Col>
             <Col style={{margin:"0",padding:"0" }}><img src={ThursdayIcon} alt="thursday"  style={{width:"20px", height:"20px"}} /></Col>
             <Col style={{margin:"0",padding:"0" }}><img src={FridayIcon} alt="friday"  style={{width:"20px", height:"20px"}} /></Col>
             <Col style={{margin:"0",padding:"0" }}><img src={SaturdayIcon} alt="saturday"  style={{width:"20px", height:"20px"}} /></Col>
             <Col style={{margin:"0",padding:"0" }}><img src={SundayIcon} alt="sunday"  style={{width:"20px", height:"20px"}}/></Col>
             <Col style={{margin:"0",padding:"0" }}><img src={CalendarIcon} alt="calendar"  style={{width:"20px", height:"20px"}} /></Col>
             {/* <img src={MondayIcon} alt="monday" style={{width:"10px", height:"10px"}} />
             <img src={TuesdayIcon} alt="tuesday"  style={{width:"10px", height:"10px"}}/>
             <img src={WednesdayIcon} alt="wednesday"  style={{width:"10px", height:"10px"}}/>
             <img src={ThursdayIcon} alt="thursday"  style={{width:"10px", height:"10px"}}/>
             <img src={FridayIcon} alt="friday"  style={{width:"10px", height:"10px"}}/>
             <img src={SaturdayIcon} alt="saturday"  style={{width:"10px", height:"10px"}}/>
             <img src={SundayIcon} alt="sunday"  style={{width:"10px", height:"10px"}}/>
             <img src={CalendarIcon} alt="calendar"  style={{width:"10px", height:"10px"}}/> */}
          </Row>
        </Container>
  
     );
}
 
export default WeekIcon;