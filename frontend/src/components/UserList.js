import React from "react"
import userListCss from '../componentsCSS/userList.module.css'

const UserList = ({userList}) => {
    return (
        <div>
            <ul>
                {userList.friends.map(friend => (
                <li key={friend._id} className={userListCss.listElement}>
                    <img src={require('../assets/profilePhoto.png')}
                     alt="userPhoto"
                     className={userListCss.userPhoto}></img>
                    <h1 className={userListCss.name}>{friend.name} {friend.surname}</h1>
                </li>
                ))}
            </ul>   
        </div>
    )
}

export default UserList