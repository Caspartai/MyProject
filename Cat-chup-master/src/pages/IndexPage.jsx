import '../stylesheet/IndexPage.css'
import { Button } from '@material-ui/core'

export const IndexPage = ()=>{
    return (
        <div className='row mx-0 full-size'>

            
            <div className='col-6 px-0 cover-container'>
                
                
            </div>
            <div className='col-6 px-0'>
            <center>
                <div className='logo-container' style={{marginTop:'130px'}}>
                    
                </div>
                <div className='button-container' style={{marginTop:'30px'}}>
                    <Button variant='contained' color='primary' href='/login' style={{width:'200px'}}>
                        Login
                        {/* <Link to='/login' style={{textDecoration:'none', color:'white',width:'100%',display:'inline-block'}}>Login</Link> */}
                    </Button>
                    <br/>
                    <Button variant='contained' color='primary' href='/register' className='mt-3' style={{width:'200px'}}>
                        Register
                        {/* <Link to='/register' style={{textDecoration:'none',color:'white',width:'100%',display:'inline-block'}}>Register</Link> */}
                    </Button>
                </div>
            </center>
            </div>
        </div>
    )
}