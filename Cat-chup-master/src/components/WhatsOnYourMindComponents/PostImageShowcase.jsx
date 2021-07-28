import { useEffect } from "react";

import { Cancel } from "@material-ui/icons";


const showCaseStyle = {
    width:'100%',
    height:'250px',
    
    
    
}

export const PostImageShowcase = (props)=>{
    const {imageList, onImageRemove} = props;
    useEffect(()=>{
        //console.log('In the showcase',imageList)
    },[imageList])
    const showImage = ()=>{
        if(!imageList[0]){
            return null
        }else{
            switch(imageList.length){
                case 1:
                    return (
                        <div style={{
                           ...showCaseStyle,
                           backgroundImage:`url(${imageList[0].data_url})`,
                            backgroundPosition:'center',
                            backgroundSize:'cover',
                            backgroundRepeat:'no-repeat',
                            borderRadius:'20px',
                            position:'relative'
                        }}>
                            <Cancel
                            style={{
                                position:'absolute',
                                top:'-10px',
                                right:'-10px',
                                cursor:'pointer'
                            }}
                            onClick={()=>onImageRemove(0)}
                            />
                        </div>
                    )
                case 2:
                    return (
                        <div style={{...showCaseStyle,display:'flex',justifyContent:'space-between',}}>
                            {imageList.map((image,index)=>{
                                return (
                                    <div key={index} style={{
                                        height:'100%',
                                        width:'47%',
                                        backgroundImage:`url(${image.data_url})`,
                                        backgroundSize:'cover',
                                        backgroundPosition:'center',
                                        backgroundRepeat:'no-repeat',
                                        borderRadius:'20px',
                                        position:'relative'
                                    }}>
                                        <Cancel
                                        style={{
                                            position:'absolute',
                                            top:'-10px',
                                            right:'-10px',
                                            cursor:'pointer',
                                        }}
                                        onClick={()=>onImageRemove(index)}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    )
                case 3:
                    return (
                        <div style={{...showCaseStyle,display:'flex',justifyContent:'space-between'}}>
                            <div style={{
                                height:'100%',
                                width:'47%',
                                backgroundImage:`url(${imageList[0].data_url})`,
                                backgroundSize:'cover',
                                backgroundPosition:'center',
                                backgroundRepeat:'no-repeat',
                                borderRadius:'20px',
                                position:'relative'
                            }}>
                                <Cancel
                                style={{
                                    position:'absolute',
                                    top:'-10px',
                                    right:'-10px',
                                    cursor:'pointer',
                                }}
                                onClick={()=>onImageRemove(0)}
                                />
                            </div>
                            <div style={{
                                height:'100%',
                                width:"47%",
                                display:'flex',
                                justifyContent:'space-between',
                                flexDirection:'column'
                            }}>
                                {imageList.map((image,index)=>{
                                    if(index===0)return null
                                    return (
                                        <div key={index} style={{
                                            height:'45%',
                                            backgroundImage:`url(${image.data_url})`,
                                            backgroundSize:'cover',
                                            backgroundPosition:'center',
                                            backgroundRepeat:'no-repeat',
                                            borderRadius:'20px',
                                            width:'100%',
                                            position:'relative'
                                        }}>
                                            <Cancel
                                            style={{
                                                position:'absolute',
                                                top:'-10px',
                                                right:'-10px',
                                                cursor:'pointer',
                                            }}
                                            onClick={()=>onImageRemove(index)}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                case 4:
                    return (
                        <div style={{...showCaseStyle,display:"flex",justifyContent:'space-between'}}>
                            {
                                imageList.map((image,index)=>{
                                    if(index===0||index===1){
                                        return (
                                            <div key={index} style={{
                                                width:'47%',
                                                height:'100%',
                                                display:'flex',
                                                justifyContent:'space-between',
                                                flexDirection:'column',
                                                
                                            }}>
                                                {
                                                    imageList.map((innerImage,i)=>{
                                                        if(index===i||i===index+2){
                                                            return (
                                                                <div key={i} style={{
                                                                    width:"100%",
                                                                    height:'45%',
                                                                    backgroundImage:`url(${innerImage.data_url})`,
                                                                    backgroundSize:'cover',
                                                                    backgroundPosition:'center',
                                                                    backgroundRepeat:'no-repeat',
                                                                    borderRadius:'20px',
                                                                    position:'relative',

                                                                }}>
                                                                    <Cancel
                                                                    style={{
                                                                        position:'absolute',
                                                                        top:'-10px',
                                                                        right:'-10px',
                                                                        cursor:'pointer'
                                                                    }}
                                                                    onClick={()=>onImageRemove(i)}
                                                                    />
                                                                </div>
                                                            )
                                                        }else{
                                                            return null
                                                        }
                                                    })
                                                }
                                                
                                            </div>
                                        )
                                    }else{
                                        return null;
                                    }
                                })
                            }
                            
                        </div>
                    )
                default:
                    return null
            }
        }
        
    }

    return (
        <div>
            {showImage()}
        </div>
    )

}