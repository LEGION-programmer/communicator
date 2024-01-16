import React, { useState, useEffect } from "react"
import FindUser from "../components/FindUser"
import UserList from "../components/UserList"
import MainMenu from "../components/MainMenu"
import style from '../App.module.css'
import buttonSyle from '../componentsCSS/button.module.css'
import axios from "axios"

const PulpitPage = ({socket}) => {
    const userIdFromSession = Number(window.sessionStorage.getItem('userId'))
    const [showAddFriend, setShowAddFriend] = useState(false)
    const [userList, setUserList] = useState(null)
    const [userInfo, setUserInfo] = useState(null)

    const switchShowAddFirends = () => {
        setShowAddFriend(!showAddFriend)
    }

    useEffect(() => {
        const getData = async() => {
            const friend = await axios.get(`http://localhost:3001/friendsId/${userIdFromSession}`)
            setUserList(friend.data)
            const user = await axios.get(`http://localhost:3001/userInfo/${userIdFromSession}`)
            setUserInfo(user.data)
        }
        getData()  
    }, [userIdFromSession])

    return (
        <div className={style.conteiner}>
            {showAddFriend ? (
                <div className={style.secendBg}>
                    <FindUser />
                    <h2 onClick={switchShowAddFirends}
                    className={buttonSyle.animatedButton}>Back</h2>
                </div>
            )
            : 
                <h2 onClick={switchShowAddFirends}
                className={buttonSyle.animatedButton}>Add friends</h2>
            }
            {userList ? (
                <div className={style.pulpit}>
                    <UserList userList={userList} socket={socket}/>
                </div>
            ): null}
            {userInfo ? 
            <MainMenu userInfo={userInfo}/>
            : null}
        </div>
    )
}

export default PulpitPage