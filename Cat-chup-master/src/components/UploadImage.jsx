import React from "react";
import { useEffect } from "react";
import ImageUploading from "react-images-uploading";
import UploadImageIcon from '../img/upload_imageIcon.png'
import TrashIcon from '../img/error-icon.png'

function UploadImages(props) {
   
    const maxNumber = 4;
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        props.setImages(imageList);
    };
    console.log(props.images)
    return (
        <div className="App">
            <ImageUploading
                multiple
                value={props.images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps
                }) => (


                    // write your building UI
                    <div className="upload__image-wrapper">
                        <button
                            className="upload_image_all_btn"
                            style={isDragging ? { color: "red" } : null}
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            Click or Drop here
                        </button>

                        &nbsp;
                        {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
{/* 
                        {imageList.map((image, index) => (
                            <div key={index} className="image-item">
                                <img src={image.data_url} alt="" width="100%" />
                                <div className="image-item__btn-wrapper">
                                    <button onClick={() => onImageUpdate(index)}>Update</button>
                                    <button onClick={() => onImageRemove(index)}>Remove</button>
                                </div>
                            </div>
                        ))} */}
            
                        { props.images.length == 1 && 
                        (
                            <div key={0} className="image-item" style={{position:"absolute",display:"grid"}} >
                                <button onClick={() => onImageUpdate(0)}>
                                    <img src={props.images[0].data_url} alt="" width="100%" className="upload-img-1"/>
                                    {/* <img src={UploadImageIcon} alt="uploadImageIcon" className="upload-icon" /> */}
                                </button>
                                <button onClick={() => onImageRemove(0)} className="trash-icon-btn">
                                    <img src={TrashIcon} alt="trash-icon" className="trash-icon"/>
                                </button>
                            </div>
                        )
                        }


                        { props.images.length == 2 && 
                        (
                            <div style={{display:"flex"}}>
                                 <div key={0} className="image-item" style={{position:"absolute"}} >
                                <img src={props.images[0].data_url} alt="" width="50%" />
                                <div className="image-item__btn-wrapper">
                                <button onClick={() => onImageUpdate(0)}>
                                    <img src={UploadImageIcon} alt="uploadImageIcon" className="upload-icon" className="upload-img-1"/>
                                </button>
                                <button onClick={() => onImageRemove(0)}>
                                    <img src={TrashIcon} alt="trash-icon" className="trash-icon"/>
                                </button>
                                </div>
                            </div>
                            <div key={1} className="image-item" style={{position:"absolute"}} >
                                 <img src={props.images[1].data_url} alt="" width="50%" />
                                 <div className="image-item__btn-wrapper">
                                 <button onClick={() => onImageUpdate(1)}>
                                    <img src={UploadImageIcon} alt="uploadImageIcon" className="upload-icon" className="upload-img-2"/>  
                                 </button>
                                 <button onClick={() => onImageRemove(1)}>
                                    <img src={TrashIcon} alt="trash-icon" className="trash-icon"/>
                                </button>  
                                </div>
                             </div>
                            </div>
                        )
                        }

                        { props.images.length == 3 && 
                        (
                            <div style={{display:"flex"}}>
                                 <div key={0} className="image-item" style={{position:"absolute"}} >
                                <img src={props.images[0].data_url} alt="" width="50%" />
                                <div className="image-item__btn-wrapper">
                                <button onClick={() => onImageUpdate(0)}>
                                    <img src={UploadImageIcon} alt="uploadImageIcon" className="upload-icon" className="upload-img-1"/>
                                </button>
                                <button onClick={() => onImageRemove(0)}>
                                    <img src={TrashIcon} alt="trash-icon" className="trash-icon"/>
                                </button>
                                </div>
                            </div>
                            <div key={1} className="image-item" style={{position:"absolute"}} >
                                 <img src={props.images[1].data_url} alt="" width="50%" />
                                 <div className="image-item__btn-wrapper">
                                 <button onClick={() => onImageUpdate(1)}>
                                    <img src={UploadImageIcon} alt="uploadImageIcon" className="upload-icon" className="upload-img-2"/>
                                 </button>
                                 <button onClick={() => onImageRemove(1)}>
                                    <img src={TrashIcon} alt="trash-icon" className="trash-icon"/>
                                </button>
                                 </div>
                             </div>
                             <div key={2} className="image-item" style={{position:"absolute"}} >
                                 <img src={props.images[2].data_url} alt="" width="50%" />
                                 <div className="image-item__btn-wrapper">
                                 <button onClick={() => onImageUpdate(2)}>
                                    <img src={UploadImageIcon} alt="uploadImageIcon" className="upload-icon" className="upload-img-3"/>
                                 </button>
                                 <button onClick={() => onImageRemove(2)}>
                                    <img src={TrashIcon} alt="trash-icon" className="trash-icon"/>
                                </button>
                                 </div>
                             </div>
                            </div>
                        )
                        }

                        { props.images.length == 4 && 
                        (
                            <div style={{display:"flex"}}>
                                 <div key={0} className="image-item" style={{position:"absolute"}} >
                                <img src={props.images[0].data_url} alt="" width="50%" />
                                <div className="image-item__btn-wrapper">
                                <button onClick={() => onImageUpdate(0)}>
                                    <img src={UploadImageIcon} alt="uploadImageIcon" className="upload-icon" className="upload-img-1"/>
                                </button>
                                <button onClick={() => onImageRemove(0)}>
                                    <img src={TrashIcon} alt="trash-icon" className="trash-icon"/>
                                </button>
                                </div>
                            </div>
                            <div key={1} className="image-item" style={{position:"absolute"}} >
                                 <img src={props.images[1].data_url} alt="" width="50%" />
                                 <div className="image-item__btn-wrapper">
                                 <button onClick={() => onImageUpdate(1)}>
                                    <img src={UploadImageIcon} alt="uploadImageIcon" className="upload-icon" className="upload-img-2"/>
                                 </button>
                                 <button onClick={() => onImageRemove(1)}>
                                    <img src={TrashIcon} alt="trash-icon" className="trash-icon"/>
                                </button>
                                 </div>
                             </div>
                             <div key={2} className="image-item" style={{position:"absolute"}} >
                                 <img src={props.images[2].data_url} alt="" width="50%" />
                                 <div className="image-item__btn-wrapper">
                                 <button onClick={() => onImageUpdate(2)}>
                                    <img src={UploadImageIcon} alt="uploadImageIcon" className="upload-icon" className="upload-img-3"/>
                                 </button>
                                 <button onClick={() => onImageRemove(2)}>
                                    <img src={TrashIcon} alt="trash-icon" className="trash-icon"/>
                                </button>
                                 </div>
                             </div>
                             <div key={3} className="image-item" style={{position:"absolute"}} >
                                 <img src={props.images[3].data_url} alt="" width="50%" />
                                 <div className="image-item__btn-wrapper">
                                 <button onClick={() => onImageUpdate(3)}>
                                 <img src={UploadImageIcon} alt="uploadImageIcon" className="upload-icon" className="upload-img-4"/>
                                 </button>
                                 <button onClick={() => onImageRemove(3)}>
                                    <img src={TrashIcon} alt="trash-icon" className="trash-icon"/>
                                </button>
                                 </div>
                             </div>
                            </div>
                        )
                        }
         










                    </div>
                )}
            </ImageUploading>
        </div>
    );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);

export default UploadImages;
