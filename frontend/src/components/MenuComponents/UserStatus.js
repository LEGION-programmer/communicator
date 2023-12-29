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
                    <li><span onClick={()=>changeStatus('BeRightBack')}>Online</span></li>
                    <li><span onClick={()=>changeStatus('DoNotDisturb')}>Online</span></li>
            </ul>
        </div>
    )
}

export default UserStatus