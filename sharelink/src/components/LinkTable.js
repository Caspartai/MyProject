import React from 'react';
import { Table } from 'reactstrap';
import LinkRow from './LinkRow';

export default function LinkTable(props) {
    return (
        <Table striped className="container">
        <thead>
          <tr>
            <th>id</th>
            <th>Title</th>
            <th>URL</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
        {props.links.map((link, index) => {
            return (
                <LinkRow index={index} key={index} link={link}/>
            )
        }) }
        {/* <LinkRow title="Friday" url="https://www.youtube.com/watch?v=kfVsfOSbJY0" tags={["fun video","friday"]}/> */}
        </tbody>
      </Table>
    )
}