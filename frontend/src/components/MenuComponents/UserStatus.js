import React from "react"
import mainMenuCss from "../../componentsCSS/mainMenu.module.css"

const UserStatus = () => {
    
    const changeStatus = (status) => {
        window.localStorage.removeItem('userStatus')
        window.localStorage.setItem('userStatus', status)   
        window.location.reload() 
    }

    return (
        <div>
            <ul className={mainMenuCss.list}>
                    <li><span onClick={()=>changeStatus('online')}>Online</span></li>
                    <li><span onClick={()=>changeStatus('BeRightBack')}>Be Right Back</span></li>
                    <li><span onClick={()=>changeStatus('DoNotDisturb')}>Do Not Disturb</span></li>
            </ul>
        </div>
    )
}

export default UserStatus