import React from 'react'
import { Avatar } from "antd"



export default function FriendChatItem({ data }) {

    return (
        <>
            {
                data
                &&
                <>
                    <div className="avatar-chat">
                        <Avatar src={data.photoURL} >
                            {data.photoURL ? '' : data.displayName?.charAt(0)?.toUpperCase()}

                        </Avatar>
                    </div>
                    <span style={{ fontWeight: "bold", marginLeft: "10px" }}>
                        {data.displayName}
                    </span>
                </>
            }

        </>
    )
}
