import {  IconButton } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import * as React from 'react'
import { withRouter } from 'react-router-dom'


class GoBack extends React.Component{
    
    goBack=()=>{
       // console.log('i amgoing back',this.props.history)
        this.props.history.goBack();
    }
    render(){
        return (
            <IconButton onClick={this.goBack}>
                <ArrowBack/>
            </IconButton>
        )
    }
}

export default withRouter(GoBack)