import React from 'react';

export default function LinkRow(props) {
    return (
        <tr>
        <th scope="row">{props.index+1}</th>
        <td>{props.link.name}</td>
        <td>{props.link.url}</td>
        <td>{props.link.tags.map((tag,index) => {
            return (
                <span key={index}>{tag} </span>
            )
        })}</td>
      </tr>
    )
}