import React from 'react'
import { Avatar, Image } from "antd"
import { FileFilled } from "@ant-design/icons"
export default function ChatItemImg({ isUser, data, useSend, handleSetpreviews }) {
    return (
        <>
            {
                useSend &&
                <>
                    <div className="chatItem__avatar"
                        onClick={() => { handleSetpreviews(useSend.id) }}
                    >
                        <Avatar size={40} src={useSend.photoURL}>
                            {useSend.photoURL ? '' : useSend.displayName?.charAt(0)?.toUpperCase()}
                        </Avatar>
                    </div>
                    <div className={`chatItem__file ${isUser}`}>
                        <div className="chatItem__file-icon">
                            {
                                data.fileOfType === "image"
                                &&
                                <Image size={45} src={data.content.url}   ></Image>
                            }
                            {
                                data.fileOfType === "application"
                                &&
                                <FileFilled />

                            }

                        </div>
                        <div className="chatItem__file-content">
                            <a href={data.content.url} target="_blank">
                                {data.content.name}
                            </a>

                        </div>
                    </div>
                </>
            }

        </>
    )
}
