import React from "react"
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import style from '../App.module.css'
import formStyle from '../componentsCSS/form.module.css'

const LoginPage = () => {
    const navigate = useNavigate()
    const formik= useFormik({
        initialValues: {
            userId: '',
            password: ''
        },
        onSubmit: async values => {
            const res = await axios.post('http://localhost:3001/login', values)
            window.sessionStorage.setItem('userId', parseInt(res.data.data))
            navigate('/pulpit')
        }
    })
    
    return (
        <div className={style.conteiner}>
            <div className={style.secendBg}>
                <h1 className={style.fontHeader}>Login</h1>
                <form onSubmit={formik.handleSubmit} className={formStyle.formElement}>
                    <ul className={formStyle.list}>
                        <li className={formStyle.listElement}>
                            <input type="text" id="userId" name="userId" 
                            onChange={formik.handleChange} 
                            value={formik.values.userId} 
                            className={formStyle.inputElement} />
                        </li>
                        <li>
                            <label htmlFor="userId" className={formStyle.labelElement}>Your name: </label>
                        </li>
                        <li className={formStyle.listElement}>
                            <input type="password" id="password" name="password" 
                            onChange={formik.handleChange} 
                            value={formik.values.password} 
                            className={formStyle.inputElement} />
                        </li>
                        <li>
                            <label htmlFor="password" className={formStyle.labelElement}>Password: </label>
                        </li>

                    </ul>               
                    <button type="submit" className={formStyle.buttonElement}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage