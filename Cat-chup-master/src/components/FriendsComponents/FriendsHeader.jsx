import { useState } from "react";
import { Nav } from "reactstrap";
// import classnames from 'classnames';
import GlobalSearchBar from "./GlobalSerachBar";
// import { GroupFriendDrop } from './GroupFriendDrop';
import { useEffect } from "react";
import { FriendsPresetGroup } from "./FriendsPresetGroup";

const FriendsHeader = (props) => {
  const { activeTab, toggle, friendsList } = props;
  const [presetGroup, setPresetGroup] = useState([]);
  // console.log("friendsHeader", props)

  useEffect(() => {
    let newPresetGroup = Object.keys(friendsList);
    newPresetGroup.splice(5);
    setPresetGroup(newPresetGroup);
  }, [friendsList]);
  return (
    <div className="friendsHeaderContainer">
      <div className="TitleSearchContainer">
        {friendsList[activeTab] == null ? (
          <p className="FriendsTitle">All Friends(0)</p>
        ) : (
          <p className="FriendsTitle">
            {activeTab}(
            {friendsList[activeTab] && friendsList[activeTab].length})
          </p>
        )}

        {/* <p className="FriendsTitle">{activeTab}</p> */}

        <GlobalSearchBar />
      </div>

      <Nav tabs style={{ position: "relative" }}>
        {presetGroup.map((group, index) => {
          return (
            <FriendsPresetGroup
              toggle={toggle}
              activeTab={activeTab}
              group={group}
              key={group}
            />
          );
        })}

        {/* <div style={{ position: 'absolute', right: '0px' }}> */}
        {/* <GroupFriendDrop
                        friendsList={friendsList}
                    /> */}
        {/* </div> */}
      </Nav>
    </div>
  );
};

export default FriendsHeader;

