import React from 'react'
import { Avatar } from "antd"

export default function ChatItemImg({ isUser, data }) {
    return (
        <>
            <div className="chatItem__avatar">
                <Avatar size={40} src="https://i.pravatar.cc/150?img=3">T</Avatar>
            </div>

            <div className="chatItem__content-img">
                <div className="content-img box-shadow"

                >
                    <img src={data.img} alt="" />
                </div>
                <span className={`content-text isUser`}
                    style={{ minWidth: "150px" }}
                >
                    {data.content}
                    <span className="content-time"

                    >
                        {data.time}
                    </span>
                </span>

            </div>
        </>
    )
}
