import React, { useState } from "react"
import chatCss from '../componentsCSS/chat.module.css'

const MessageComponent = ({allMessage}) => {
    const [friendId, setFriendId] = useState(window.localStorage.getItem('friendId'))
    return (
        <div>
            {allMessage.map((message, index) => (
                friendId!==message.author ? (
                    <div key={index} className={chatCss.receiveMessage}>
                        <div className={chatCss.message}>
                            {message.message}
                        </div>
                        <div className={chatCss.timeFromReceiveMessage}>
                            <p>{message.time}</p>
                        </div>
                    </div>
                ):(
                    <div key={index} className={chatCss.sendMessage}>
                        <div className={chatCss.message}>
                            {message.message}
                        </div>
                        <div className={chatCss.timeFromReceiveMessage}>
                            <p>{message.time}</p>
                        </div>
                    </div>
                )
                
                
                
            ))}
            {/*
                        {myMessage.map((message, index) => (
                <div key={index} className={chatCss.sendMessage}>
                    <div>
                        <span className={chatCss.messageOwner}>{message.owner}</span>
                    </div>
                    <div className={chatCss.message}>
                        {message.message}
                    </div>
                    <div className={chatCss.timeFromSendMessage}>
                        <p>{message.time}</p>
                    </div>
                </div>
            ))}
            */}

        </div>
    )
}

export default MessageComponent