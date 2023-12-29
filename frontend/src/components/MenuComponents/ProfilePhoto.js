import React, { useState } from "react"
import axios from "axios"
import formStyle from '../../componentsCSS/form.module.css'
import mainMenuCss from "../../componentsCSS/mainMenu.module.css"

const ProfilePhoto = () => {
    const [imageBase64, setImageBase64] = useState('')
    const [submit, setSubmit] = useState(false) 

    const handleImageUpload = (event) => {
        const file = event.target.files[0] 
        if (file) {
            const reader = new FileReader()
    
            reader.onloadend = () => {
            setImageBase64(reader.result)
            }
    
            reader.readAsDataURL(file)
            setSubmit(true)
        }
    }

    const changePhoto = async() => {
        await axios.put(`http://localhost:3001/userPhoto/${window.sessionStorage.getItem('userId')}`, {userPhoto: imageBase64})
        window.location.reload()
    }

    return (
        <div>
            <input type="file" onChange={handleImageUpload} className={mainMenuCss.inputFile}/>
            {submit ? (
                <button onClick={changePhoto} className={formStyle.buttonElement}>Change your profile photo</button>
            ): null}
        </div>
    )
}

export default ProfilePhoto