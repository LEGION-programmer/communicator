import React, {useState, useEffect} from "react"
import axios, { all } from "axios"
import MessageComponent from "../components/MessageComponent"
import chatCss from '../componentsCSS/chat.module.css'
import io from 'socket.io-client'
import { useNavigate } from 'react-router-dom'

const socket = io('http://localhost:3001')

const ChatComponent = () => {
    const navigate = useNavigate()
    const [friendData, setFriendData] = useState(null)
    const [message, setMessage] = useState("")
    const [room, setRoom] = useState(window.localStorage.getItem('roomId'))
    const [allMessage, setAllMessage] = useState([])

    socket.emit('join_room', room)

    useEffect(() => {
        if(!window.sessionStorage.getItem('userId')){
            navigate('/')
        }
    })

    useEffect(()=>{
        socket.on('receive_message', (data)=>{
            setAllMessage(oldData => {
                const newData = [...oldData, data]
                if(newData[newData.length-1] === newData[newData.length-2]){
                    newData.pop()
                }
                return newData
            })
        })
    }, [socket])

    const sendMessage = () => {
        const messageData = {
            room,
            author: window.localStorage.getItem('friendId'),
            time: new Date(Date.now()).getHours()+
            ':'
            +new Date(Date.now()).getMinutes(),
            message
        }
        socket.emit('send_message', messageData)
        setMessage('')
        setAllMessage(oldData => {
            const newData = [...oldData, messageData]
            return newData
        })
    }

    const leaveChat = () => {
        window.localStorage.clear()
        socket.emit('leaveRoom')
        navigate('/pulpit')
    } 
    
    useEffect(()=>{
        const getFirendData = async() => {
            const res = await axios.get(`http://localhost:3001/findUser/${window.localStorage.getItem('friendId')}`)
            setFriendData(res.data)
        }
        if(friendData === null){
            getFirendData()
        }
        
    },[friendData])

    return (
        <div className={chatCss.firstBg}>
            <div>
                {friendData ? (
                    <div className={chatCss.header}>
                        <span className={chatCss.return} onClick={leaveChat}>&#x21d0;</span>
                        <div>
                            {friendData.userPhoto ? 
                            <img src={friendData.userPhoto} alt="usePphoto" className={chatCss.headerPhoto}></img>
                            :<img src={require('../assets/profilePhoto.png')} alt="userPhoto" className={chatCss.headerPhoto}></img>}
                        </div>
                        <div>
                            <h1 className={chatCss.headerName}>{friendData.name} {friendData.surname}</h1>
                        </div>
                    </div>   
                ): null}
            </div>
            <div className={chatCss.body}>
                <MessageComponent allMessage={allMessage}/>
            </div>
            <div className={chatCss.footer}>
                <input type="text" placeholder="message..." 
                className={chatCss.input}
                value={message}
                onChange={(event)=>{setMessage(event.target.value)}}
                ></input>
                <span className={chatCss.return} onClick={()=>sendMessage()}>&#x27A4;</span>
            </div>
        </div>
    )
}

export default ChatComponent