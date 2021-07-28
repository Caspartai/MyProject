import ImageUploading from 'react-images-uploading'


export const UploadImage = (props)=>{
    const {initialPic,title,PicDiv,newPic} = props
    
    const [images,setImages] = newPic;
    
    const maxNumber = 1;
    const onChange = (imageList,addUpdateIndex)=>{
        setImages(imageList);
    }   
    
    
    
    return (
        
            <ImageUploading
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey='data_url'
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageRemove,
                    onImageUpdate,
                    isDragging,
                    dragProps,
                })=>{
                    return (
                        <div style={{position:'relative',width:"100%",height:'170px',paddingTop:'20px'}}>
                            <div style={{position:'absolute',left:'0',top:'0'}}>{title}</div>
                            {!images[0]?(<div  >
                                <center><PicDiv
                                    imgPath={process.env.REACT_APP_API_SERVER+initialPic}
                                /></center>
                                <button type='button' className='btn btn-primary' onClick={onImageUpload} style={{position:'absolute',top:'0',right:'0'}}>Edit</button>
                            </div>):(<div >
                            <center><PicDiv
                                    imgPath={images[0]["data_url"]}
                                /></center>
                                <div style={{position:'absolute',top:'0',right:'0'}}>
                                    
                                    <button type='button' className='btn btn-danger' onClick={onImageRemoveAll}>Discard</button>
                                </div>
                            </div>)}
                        </div>
                    )
                }}
            </ImageUploading>
        
    )
}