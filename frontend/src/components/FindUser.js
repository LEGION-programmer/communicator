import React, { useState, useEffect } from "react"
import style from '../App.module.css'
import { useForm } from 'react-hook-form'
import FindUserList from "./FindUserList"
import formStyle from '../componentsCSS/form.module.css'
import axios from 'axios'

const FindUser = () => {
    const [showUserList, setShow] = useState(false)
    const [userList, setUserList] = useState(null)
    const { register, handleSubmit, getValues } = useForm()

    const submit = () => {
        setShow(true)
    }

    useEffect(() => {
        if (showUserList) {
            const fetchData = async () => {
                const data = getValues('userId')
                const res = await axios.get(`http://localhost:3001/userList/${data}`)
                setUserList(res.data[0])
                
            }
            fetchData()
        }
    }, [showUserList, getValues])

    return (
        <div className={style.container}>
            <div>
                <form className={formStyle.formElement} onSubmit={handleSubmit(submit)}>
                    <ul className={formStyle.list}>
                        <li className={formStyle.listElement}>
                            <input
                                type="number"
                                id="userId"
                                {...register('userId', { shouldAsNumber: true })}
                                className={formStyle.inputElement}
                            />
                        </li>
                        <li className={formStyle.listElement}>
                            <label htmlFor="userId" className={formStyle.labelElement}>
                                Find user by Id:
                            </label>
                        </li>
                    </ul>
                    <button
                        type="submit"
                        className={formStyle.buttonElement}
                        onClick={() => setShow(true)}
                    >
                        Find
                    </button>
                </form>
                {userList ? (
                    <div>
                        <FindUserList userdata={userList} />
                    </div>
                ) : null}                    
            </div>
        </div>
    )
}


export default FindUser