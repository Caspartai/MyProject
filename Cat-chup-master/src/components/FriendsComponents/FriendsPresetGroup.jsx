import { NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

export const FriendsPresetGroup = (props) => {
    const { activeTab, toggle, group } = props

    return (
        <NavItem>
            <NavLink id="navFriends"
                className={classnames({ active: activeTab === group })}
                onClick={() => { toggle(group); }}>
                <p className="friendGroupList">{group}</p>
            </NavLink>
        </NavItem>
    )
}