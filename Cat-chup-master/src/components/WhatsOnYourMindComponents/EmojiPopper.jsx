import { Fade, Popper } from "@material-ui/core";
import Picker from 'emoji-picker-react';

export const EmojiPopper = (props)=>{
    const {id,open,anchorEl,onEmojiClick} = props;

    //console.log('open',open);
    //console.log('anchorEl',anchorEl);

    return (
        
        <Popper
        style={{zIndex:'2000'}}
        id={id}
        open={open}
        anchorEl={anchorEl}
        transition
    >
        
        {({TransitionProps})=>{
            return (
                
                    <Fade {...TransitionProps} timeout={200}>
                        
                        <Picker onEmojiClick={onEmojiClick}/>
                        </Fade>
                
            )
        }
        
        }

    </Popper>
    )
}