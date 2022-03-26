import React from 'react'
import { Avatar } from "antd"

export default function ChatItemImg({ isUser }) {

    return (
        <>
            <div className="chatItem__avatar">
                <Avatar size={40} src="https://i.pravatar.cc/150?img=3">T</Avatar>
            </div>

            <div className={`chatItem__content-img ${isUser}`}>
                <div className="content-img">
                    <img src="https://i.pinimg.com/564x/18/7f/65/187f656be22bf834ae896e60485ddd41.jpg" alt="" />
                </div>
                <span className={`content-text isUser`}>
                    hello
                    <span className="content-time">
                        time
                    </span>
                </span>

            </div>
        </>
    )
}
