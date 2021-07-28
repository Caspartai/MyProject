import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import InputBase from '@material-ui/core/InputBase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    position: 'relative',
    backgroundColor: 'transparent',
    borderRadius:'20px',
    fontSize: 16,
    padding: '5px 26px 5px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: '20px',
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  
}));

export default function FriendGroupSelector(props) {
  const classes = useStyles();
  const {selectedGroup,handleSelect,friendGroup}=props;
  return (
    <div>
      
      <FormControl className={classes.margin}>
       
        <Select
           MenuProps={{
            disableScrollLock: true
          }}
          name='visible_group'
          id='visible_group'
          labelId="demo-customized-select-label"
          value={selectedGroup}
          onChange={handleSelect}
          input={<BootstrapInput />}
          renderValue={(value)=>(<div><FontAwesomeIcon className='mx-1' icon={faEye}/> visible to {value}</div>)}
        >
          {friendGroup.map((group,index)=>{
            return (
              <MenuItem
                value={group}
                key={index}
              >
                {group}
              </MenuItem>
            )
          })}
          {/* <MenuItem value="All Friends">
            All Friends
          </MenuItem>
          <MenuItem value={'Close Friends'}>Close Friends</MenuItem>
          <MenuItem value={'Family'}>Family</MenuItem>
          <MenuItem value={'Work'}>Work</MenuItem> */}
        </Select>
      </FormControl>
      
    </div>
  );
}
