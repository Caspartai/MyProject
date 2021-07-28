import { useEffect } from "react";


export const PostImgShowcase = (props)=>{
    const {imageList,height} = props;
    const showCaseStyle = {
        width:'100%',
        height:height,
    }
    useEffect(()=>{
        //console.log('In the showcase',imageList)
    },[imageList])
    const showImage = ()=>{
        if(imageList){
            if(!imageList[0]){
                return null
            }else{
                switch(imageList.length){
                    case 1:
                        return (
                            <div style={{
                               ...showCaseStyle,
                               backgroundImage:`url(${process.env.REACT_APP_API_SERVER+imageList[0]})`,
                                backgroundPosition:'center',
                                backgroundSize:'cover',
                                backgroundRepeat:'no-repeat',
                                borderRadius:'20px',
                                position:'relative'
                            }}>
                                
                            </div>
                        )
                    case 2:
                        return (
                            <div style={{...showCaseStyle,display:'flex',justifyContent:'space-between',}}>
                                {imageList.map((image,index)=>{
                                    return (
                                        <div key={index} style={{
                                            height:'100%',
                                            width:'49%',
                                            backgroundImage:`url(${process.env.REACT_APP_API_SERVER+image})`,
                                            backgroundSize:'cover',
                                            backgroundPosition:'center',
                                            backgroundRepeat:'no-repeat',
                                            borderRadius:'20px',
                                            position:'relative'
                                        }}>
                                           
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
                                    width:'49%',
                                    backgroundImage:`url(${process.env.REACT_APP_API_SERVER+imageList[0]})`,
                                    backgroundSize:'cover',
                                    backgroundPosition:'center',
                                    backgroundRepeat:'no-repeat',
                                    borderRadius:'20px',
                                    position:'relative'
                                }}>
                                    
                                </div>
                                <div style={{
                                    height:'100%',
                                    width:"49%",
                                    display:'flex',
                                    justifyContent:'space-between',
                                    flexDirection:'column'
                                }}>
                                    {imageList.map((image,index)=>{
                                        if(index===0)return null
                                        return (
                                            <div key={index} style={{
                                                height:'47%',
                                                backgroundImage:`url(${process.env.REACT_APP_API_SERVER+image})`,
                                                backgroundSize:'cover',
                                                backgroundPosition:'center',
                                                backgroundRepeat:'no-repeat',
                                                borderRadius:'20px',
                                                width:'100%',
                                                position:'relative'
                                            }}>
                                                
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
                                                    width:'49%',
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
                                                                        height:'48%',
                                                                        backgroundImage:`url(${process.env.REACT_APP_API_SERVER+innerImage})`,
                                                                        backgroundSize:'cover',
                                                                        backgroundPosition:'center',
                                                                        backgroundRepeat:'no-repeat',
                                                                        borderRadius:'20px',
                                                                        position:'relative',
    
                                                                    }}>
                                                                        
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
                                            return null
                                        }
                                    })
                                }
                                
                            </div>
                        )
                    default:
                        return null
                }
            }
        }else {
            return null
        }
        
        
    }

    return (
        <div>
            {showImage()}
        </div>
    )

}