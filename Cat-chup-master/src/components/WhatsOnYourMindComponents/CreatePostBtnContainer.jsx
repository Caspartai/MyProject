import { Button } from "@material-ui/core"

export const CreatePostBtnContainer = (props) => {
    const { toggle } = props

    //console.log("createPostBtn props****", props)

    return (
        <div className='whatsOnYourMindContainer'>
            <div style={{ height: '100%', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', borderTop: "0 solid #DFDFDF", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px", backgroundColor: "white" }}>
                <Button size='large' variant='outlined' onClick={toggle} color='primary' style={{ borderRadius: "3rem", backgroundColor: "#96d9ff", color: "white" }} >What's on your mind, {props.username}?</Button>
            </div>

        </div >
    )
}