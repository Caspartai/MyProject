

export const BgPicDiv = (props)=>{


    return (
        <div style={{height:'150px', width:'200px',backgroundImage:`url(${props.imgPath})`,backgroundSize:'contain',backgroundRepeat:'no-repeat'}}>

        </div>
    )
}