import React from 'react';
import { Button, FormGroup, Label, Input, FormText } from 'reactstrap';


// In every form we construct, we always need an onSubmit handler for the form JSX element
// as well as the inputOnChange handler for each of those inputs 
function AddLinkForm(props) {
    return (
        <div className="m-2 container col-5">
            <h1>Add Link Form</h1>
            <form onSubmit={props.onSubmit}>
              <FormGroup className="position-relative">
                <Label for="exampleEmail">Title</Label>
                <Input valid onChange={props.titleOnChange} value={props.title}/>
                {/* <FormFeedback valid tooltip>Sweet! that name is available</FormFeedback> */}
                <FormText>Type in the title of your link</FormText>
                <br />
                <Label for="exampleEmail">URL</Label>
                <Input valid onChange={props.urlOnChange} value={props.url}/>
                {/* <FormFeedback valid tooltip>Sweet! that name is available</FormFeedback> */}
                <FormText>Type in the URL of your link</FormText>
                <br />
                <Label for="exampleEmail">Tags</Label>
                <Input valid onChange={props.tagsOnChange} value={props.tags}/>
                {/* <FormFeedback valid tooltip>Sweet! that name is available</FormFeedback> */}
                <FormText>Type in the tags of your link,please separated by commas</FormText>

               </FormGroup>
                <br />
                <Button outline color="success">Add Link</Button>{' '}

            </form>

        </div>
    )
}

export default AddLinkForm;