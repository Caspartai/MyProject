// import SelectSearch from 'react-select-search';
import React from "react";
import SearchIcon from '../../img/searchIcon.png'
// import fuzzySearch from '../../util/fuzzySearch';
import "../../stylesheet/globalSearch.css";
import { useState, useEffect } from "react";


const FriendSearchBar = (props) => {


    const [searchValue, setSearchValue] = useState("");
    // const inputE1 = useRef("")
    const { localFriendsList, searched } = props;
    //console.log("this is props inFriendSearchBar", props)
    //console.log("this is local friends list", localFriendsList)

    // const friendsObject = localFriendsList && localFriendsList.filter((val) => {
    //     if (searchValue == "") {
    //         return val
    //     } else if (val.toLowerCase().includes(searchValue.toLocaleLowerCase())) {
    //         return val
    //     }
    // }).map(friend => {
    //     //console.log("username:friend", friend)
    //     return {

    //         username: friend,
    //         key: friend
    //     }
    // })
    //console.log("friendsList from searchbar", friendsObject);
    // const filteredNames = localFriendsList.filter()

    useEffect(() => {
        searched(searchValue);
        //console.log("FRIENDS SEARCH USE EFFECT", searchValue)
    }, [searchValue])

    // function handleChange(value) {

    //     // setSearchValue(localFriendsList.filter(name => name.toLowerCase().includes(inputE1))
    //     setSearchValue(value)
    //     // console.log("this is value", value)
    //     // console.log(inputE1.current.value);
    //     // setSearchValue(inputE1.current.value)
    //     // setSearchValue(friendsObject => friendsObject[0].name.toLowerCase().includes(inputE1.current.value.toLowerCase()))
    //     // console.log("this is the value of handle change", value)
    // }

    return (

        <div className="friendSearch-input-container">
            <img className="search-icon" src={SearchIcon} alt="SearchIcon"></img>
            {/* //use input */}
            {/* <input style={{ border: "none" }} options={friendsObject} onChange={handleChange} filterOptions={fuzzySearch} search placeholder="Search Friends" /> */}
            <input className="friendSearch__input" type="text" style={{ border: "none", textDecoration: "none" }}
                options={localFriendsList}
                // ref={inputE1}
                // value={friendsObject}
             placeholder="Search Friends"
                onChange={event => { setSearchValue(event.target.value) }} />


        </div>



    )
}




export default FriendSearchBar;