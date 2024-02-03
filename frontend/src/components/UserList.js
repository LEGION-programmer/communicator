import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import userListCss from '../componentsCSS/userList.module.css'

const UserList = ({userList}) => {
    const navigate = useNavigate()
    const [friendId, setFriendId] = useState(null)
    const [friendName, setFriendName] = useState(null)
    
    const getFirend = (id, name) => {
        setFriendId(id)
        setFriendName(name)
    }

    useEffect(()=>{
        if(friendId !== null){
            window.localStorage.setItem('friendId', friendId)
            window.localStorage.setItem('friendName', friendName)
            const data = parseInt(window.sessionStorage.getItem('userId')) + parseInt(friendId)
            window.localStorage.setItem('roomId', data)
            navigate('/chat')
        }
    }, [friendId])
    return (
        <div>
            <div>
                <ul>
                    {userList.friends.map(friend => (
                    <li key={friend._id} 
                    className={userListCss.listElement}
                    onClick={()=>getFirend(friend.userId, friend.name)}>
                        {friend.userPhoto ? (
                            <div>
                                <img src={friend.userPhoto} alt="usePphoto" className={userListCss.userPhoto}></img>
                            </div>
                        ):  <img src={require('../assets/profilePhoto.png')}
                            alt="userPhoto"
                            className={userListCss.userPhoto}></img>
                        }
                        <h1 className={userListCss.name}>{friend.name} {friend.surname}</h1>
                    </li>
                    ))}
                </ul>   
            </div>
        </div>
    )
}

export default UserList