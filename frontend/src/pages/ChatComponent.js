import React, {useState, useEffect} from "react"
import axios from "axios"
import chatCss from '../componentsCSS/chat.module.css'
import io from 'socket.io-client'

const socket = io('http://localhost:3001')

const ChatComponent = () => {
    const [friendData, setFriendData] = useState(null)
    const [message, setMessage] = useState("")
    const [room, setRoom] = useState(window.localStorage.getItem('roomId'))
    const [allMessage, setAllMessage] = useState([])

    socket.emit('join_room', room)

    useEffect(()=>{
        socket.on('receive_message', (data)=>{
            setAllMessage(oldData => {
                const newData = [...oldData, data]
                return newData
            })
        })
    }, [socket])

    const sendMessage = () => {
        const messageData = {
            room,
            author: friendData.name,
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
                        <span className={chatCss.return}>&#x21d0;</span>
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
                {allMessage.map((message, index) => (
                <div key={index}>
                    <div>
                        <span className={chatCss.messageOwner}>{message.owner}</span>
                    </div>
                    <div className={chatCss.message}>
                        {message.message}
                    </div>
                    <div>
                        <span className={chatCss.time}>{message.time}</span>
                    </div>
                </div>
                ))}
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