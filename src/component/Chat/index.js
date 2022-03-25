import React from 'react'
import './chat.scss'
import Sidebar_chat from "./sidebar/Sidebar_chat"
import Chatwindow from "./ChatWindow/Chatwindow"
export default function Chat() {
    return (
        <div className="chat">
            <div className="chat__sidebar">
                <Sidebar_chat />
            </div>
            <div className="chat__windown">
                <Chatwindow />
            </div>
        </div>
    )
}
