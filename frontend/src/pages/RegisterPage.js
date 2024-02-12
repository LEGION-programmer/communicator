import React from "react"
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import style from '../App.module.css'
import formStyle from '../componentsCSS/form.module.css'

const RegisterPage = () => {
    const navigate = useNavigate()

    const formik= useFormik({
        initialValues: {
            name: '',
            surname: '',
            password: '',
            cPassword: '',
            sex: 'man'
        },
        onSubmit: async values => {
            const res = await axios.post('http://localhost:3001/register', values)
            window.sessionStorage.setItem('userId', parseInt(res.data.data))
            window.localStorage.clear()
            navigate('/pulpit')
        }
    })
    
    return (
        <div className={style.conteiner}>
            <div className={style.secendBg}>
                <h1 className={style.fontHeader}>Register</h1>
                <form onSubmit={formik.handleSubmit} className={formStyle.formElement}>
                    <ul className={formStyle.list}>
                        <li className={formStyle.listElement}>
                            <input type="text" id="name" name="name" 
                            onChange={formik.handleChange} 
                            value={formik.values.name} 
                            className={formStyle.inputElement} />
                        </li>
                        <li>
                            <label htmlFor="name" className={formStyle.labelElement}>Your name: </label>
                        </li>
                        <li className={formStyle.listElement}>
                            <input type="text" id="surname" name="surname" 
                            onChange={formik.handleChange} 
                            value={formik.values.surname} 
                            className={formStyle.inputElement} />
                        </li>
                        <li>
                            <label htmlFor="surname" className={formStyle.labelElement}>Your surname: </label>
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
                        <li className={formStyle.listElement}>
                            <input type="password" id="cPassword" name="cPassword" 
                            onChange={formik.handleChange} 
                            value={formik.values.cPassword} 
                            className={formStyle.inputElement} />
                        </li>
                        <li>
                            <label htmlFor="cPassword" className={formStyle.labelElement}>Confirm password: </label>
                        </li>
                        <li className={formStyle.listElement}>
                            <label htmlFor="sex" className={formStyle.labelSelectElement}>Your sex: </label>
                            <select id="sex" name="sex" 
                            onChange={formik.handleChange} 
                            value={formik.values.sex}
                            className={formStyle.selectElement}>
                                <option value="man">Man</option>
                                <option value="woman">Woman</option>
                            </select>
                        </li>
                    </ul>               
                    <button type="submit" className={formStyle.buttonElement}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage