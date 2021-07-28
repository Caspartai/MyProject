import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { CommentListCard } from "./CommentListCard";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export const CommentSection = (props)=>{
    const {comments} = props;
    const classes = useStyles();
  //console.log('comment section',comments);

    return (
        <List className={classes.root}>
      {comments?comments.map((comment, index) => {
        return (
            <CommentListCard
                comment={comment}
                key={comment}
            />
        );
      }):null}

      
    </List>
    )
}