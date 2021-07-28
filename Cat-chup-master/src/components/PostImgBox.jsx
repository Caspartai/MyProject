const PostImgBox = (props) => {
  console.log(props);

  return (
    // { _props.Picture.length === 1 ? (
    //         <img width="100%" src={props.Picture[0].data_url} alt="Card image cap" />
    //       )
    //     :null
    // }
    props.Picture.length === 1 ? (
      <img width="100%" src={props.Picture[0].data_url} alt="Card image cap" />
    ) : props.Picture.length === 2 ? (
      <div>
        <img width="50%" src={props.Picture[0].data_url} alt="Card image cap" />
        <img width="50%" src={props.Picture[0].data_url} alt="Card image cap" />
      </div>
    ) : null
  );
};

export default PostImgBox;
