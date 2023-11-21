import React from "react"
import { Link } from "react-router-dom"
import style from '../App.module.css'
import buttonSyle from '../componentsCSS/button.module.css'

const MainPage = () => {
    return (
        <div className={style.conteiner}>
            <div className={style.secendBg}>
                <h1 className={style.fontHeader}>Welcome in Better Message!</h1>
            </div>
            <div>
                {/* image */}
            </div>
            <div className={style.secendBg}>
                <h3 className={style.linkToOtherPage}>To join us you have to:</h3>
                <Link to="/login" className={style.linkToOtherPage}><h2 className={buttonSyle.animatedButton}>Login</h2></Link>
                <h3 className={style.linkToOtherPage}>or:</h3>
                <Link to="/register" className={style.linkToOtherPage}><h2 className={buttonSyle.animatedButton}>Register</h2></Link>
            </div>
        </div>
    )
}

export default MainPage