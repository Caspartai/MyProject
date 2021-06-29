 import React from 'react';
 import { InputGroup, InputGroupAddon, Input } from 'reactstrap';

 export default function FilterInput(props){
     return (
         <div className="col-5">
            <InputGroup>
               <InputGroupAddon addonType="prepend">Look for your link!</InputGroupAddon>
               <Input placeholder="Filter" value={props.filter} onChange={props.filterOnChange} />
            </InputGroup>
         </div>
     );
 }

