import React, { useState } from "react"
import mainMenuCss from "../componentsCSS/mainMenu.module.css"
import ProfilePhoto from "./MenuComponents/ProfilePhoto"
import UserStatus from "./MenuComponents/UserStatus"
import { useNavigate } from 'react-router-dom'

const MainMenu = ({userInfo}) => {
    const [userStatus, setUserStatus] = useState(window.localStorage.getItem('userStatus'))
    const [showOptions, setShowOptions] = useState(false)
    const [showChangeStatus, setShowChangeStatus] = useState(false)
    const navigate = useNavigate()

    const changeShowOptionsStatus = () => {
        setShowOptions(!showOptions)
    }

    const switchChangeStatus = () => {
        setShowChangeStatus(!showChangeStatus)
    }

    const logout = () => {
        window.localStorage.clear()
        window.sessionStorage.clear()
        navigate('/')
    }

    return (
        <div className={mainMenuCss.con}>
            {showOptions ? (
                <div>
                <div className={mainMenuCss.options}>
                    <ul className={mainMenuCss.list}>
                        <li className={mainMenuCss.listElement}>
                            <div className={mainMenuCss.topBlock}>
                                <div className={mainMenuCss.leftBlock}>{userInfo.userPhoto ? 
                                    <img src={userInfo.userPhoto} alt="usePphoto" className={mainMenuCss.optionPhoto}></img>
                                    :<img src={require('../assets/profilePhoto.png')} alt="userPhoto" className={mainMenuCss.optionPhoto}></img>}
                                </div>
                                <div className={mainMenuCss.rightBlock}>
                                    <p>{userInfo.name} {userInfo.surname}</p>
                                    <p>Your id: {userInfo.userId}</p>
                                </div>
                            </div> 
                        </li>
                        <li className={mainMenuCss.listElement}>
                            Change profile Photo
                            <div>
                                <ProfilePhoto />
                            </div>
                        </li>
                        <li className={mainMenuCss.listElement} onClick={switchChangeStatus}>
                            Change status
                            {showChangeStatus ? (
                                <div>
                                    <UserStatus />
                                </div>
                            ): null} 
                        </li>
                        <li className={mainMenuCss.listElement}>
                            <span className={mainMenuCss.logout} onClick={logout}>Logout</span>
                        </li>
                    </ul>
                </div>
            </div>
            ): null}
            <div onClick={changeShowOptionsStatus}>
                {userInfo.userPhoto ? 
                <img src={userInfo.userPhoto} alt="usePphoto" className={mainMenuCss.photo}></img>
                :<img src={require('../assets/profilePhoto.png')} alt="userPhoto" className={mainMenuCss.photo}></img>}
                <div>
                    {userStatus==='online' ?
                    (
                        <div className={mainMenuCss.activeStatusOnline}></div>
                    )
                    : userStatus==='BeRightBack' ? (
                        <div className={mainMenuCss.activeStatusBeRightBack}></div>

                    ): userStatus==='DoNotDisturb' ? 
                    (
                        <div className={mainMenuCss.activeStatusDoNotDisturb}></div>
                    ):null
                    }
                </div>
            </div> 
        </div>
    )
}

export default MainMenu