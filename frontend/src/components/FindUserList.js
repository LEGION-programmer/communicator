import React, { useState }from "react"
import style from '../App.module.css'
import buttonSyle from '../componentsCSS/button.module.css'
import axios from "axios"

const FindUserList = ({userdata}) => {
    const [userId, setUserId] = useState(null)
    const [friendId, setFriendId] = useState(null)
    const addFriend = async() => {
        const id = parseInt(window.sessionStorage.getItem('userId'))
        setUserId(id)
        setFriendId(userdata.userId)
        const data = {userId, friendId}
        await axios.post(`http://localhost:3001/userAddFrend`, data)
    }
    return (
        <div className={style.userInfo}>
            {userdata.photo ? 
            
                <div className={style.userPhotoDiv}>
                    <img src={userdata.photo} alt="userPhoto"></img>
                </div>  
                :  
                <div className={style.userPhotoDiv}>
                    <img src={require('../assets/profilePhoto.png')}
                     alt="userPhoto"
                     className={style.userPhoto}></img>
                </div>
            } 
            <h1 className={style.userName}>{userdata.name} {userdata.surname}</h1>
            <h2 className={buttonSyle.animatedButton} onClick={addFriend}>Invite</h2>
        </div>  
    )
}

export default FindUserList