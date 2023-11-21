import React, { useState, useEffect } from "react"
import mainMenuCss from "../componentsCSS/mainMenu.module.css"

const MainMenu = ({userInfo}) => {
    const [userStatus, setUserStatus] = useState('online')
    const [showOptions, setShowOptions] = useState(false)
    const [showChangeStatus, setShowChangeStatus] = useState(false)

    const changeShowOptionsStatus = () => {
        setShowOptions(!showOptions)
    }

    const switchChangeStatus = () => {
        setShowChangeStatus(!showChangeStatus)
    }

    const changeuserStatus = status => {
        setUserStatus(status)
    }

    useEffect(()=>{
        
        console.log(userStatus)
    }, [userStatus])

    return (
        <div className={mainMenuCss.con}>
            {showOptions ? (
                <div>
                <div className={mainMenuCss.options}>
                    <ul className={mainMenuCss.list}>
                        <li className={mainMenuCss.listElement}>{userInfo.userPhoto ? 
                            <img src={userInfo.userPhoto} alt="usePphoto" className={mainMenuCss.optionPhoto}></img>
                            :<img src={require('../assets/profilePhoto.png')} alt="userPhoto" className={mainMenuCss.optionPhoto}></img>}
                        </li>
                        <li className={mainMenuCss.listElement}>
                            {userInfo.name} {userInfo.surname}
                        </li>
                        <li className={mainMenuCss.listElement}>
                            Your id: {userInfo.userId}
                        </li>
                        <li className={mainMenuCss.listElement}>
                            Change profile Photo
                            <div>

                            </div>
                        </li>
                        <li className={mainMenuCss.listElement} onClick={switchChangeStatus}>
                            Change status
                            {showChangeStatus ? (
                            <div>
                                <ul className={mainMenuCss.list}>
                                    <li><span onClick={setUserStatus('online')}>Online</span></li>
                                    <li><span onClick={setUserStatus('BeRightBack')}>Be Right Back</span></li>
                                    <li><span onClick={setUserStatus('DoNotDisturb')}>Do Not Disturb</span></li>
                                </ul>
                            </div>
                            ): null}
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