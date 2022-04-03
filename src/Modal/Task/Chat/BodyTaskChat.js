import { useContext, useEffect, useState, memo } from 'react'
import { Avatar } from 'antd'
import { FileFilled } from "@ant-design/icons"
import { RoomChatContext } from "../../../context/RoomChatProvider"
import _ from "lodash"
function BodyTaskChat() {

    const { selectedRoom: { data }, members, setScroll } = useContext(RoomChatContext)

    const [dataChat, setDataChat] = useState([])




    useEffect(() => {
        if (data) {
            const datachat = data.map(item => {
                const i = _.find(members, user => user.uid === item.idSend)
                item.user = i
                return item
            })
            setDataChat(datachat)
        }
    }, [data, members])

    return (
        <>
            {
                dataChat &&
                dataChat.map((item, index) => {
                    if (index === dataChat.length - 1) {
                        setScroll(index)
                    }
                    if (item.type === 'text' && item.user) {
                        return (
                            <div key={index} className="taskchat-item">
                                <div className="taskchat-item-avatar">
                                    <Avatar src={item.user.photoURL} size={50}>
                                        {item.user.photoURL ? '' : item.user.displayName?.charAt(0)?.toUpperCase()}
                                    </Avatar>
                                </div>
                                <div className="taskchat-item-content">
                                    <span>
                                        {item.content}

                                    </span>
                                    <div className="taskchat-item-time">
                                        <span>{item.time}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    if (item.type === 'image') {
                        return (
                            <div key={index} className="taskchat-item">
                                {
                                    item.user
                                    &&
                                    <>
                                        <div className="taskchat-item-avatar">
                                            <Avatar src={item.user.photoURL} size={50}></Avatar>
                                        </div>
                                        <div className="taskchat-item-contentFile">
                                            <div className="contentFile-icon">
                                                <Avatar shape="square" src={item.content.url} size={50} style={{ marginLeft: "5px" }}>
                                                    avatar
                                                </Avatar>
                                            </div>
                                            <div className="contentFile-name">
                                                <a href={item.content.url} target="_blank">
                                                    {item.content.name}
                                                </a>
                                            </div>
                                            <div className="taskchat-item-time" style={{ textAlign: "end", paddingRight: "10px" }}>
                                                <span>{item.time}</span>
                                            </div>
                                        </div>

                                    </>
                                }
                            </div>
                        )

                    }
                    else {
                        return (

                            <div key={index} className="taskchat-item">
                                {
                                    item.user
                                    &&
                                    <>
                                        <div className="taskchat-item-avatar">
                                            <Avatar src={item.user.photoURL} size={50}></Avatar>
                                        </div>
                                        <div className="taskchat-item-contentFile">
                                            <div className="contentFile-icon">

                                                <FileFilled
                                                    style={{ color: "#00cafd" }}
                                                />
                                            </div>
                                            <div className="contentFile-name">
                                                <a href={item.content.url} target="_blank">
                                                    {item.content.name}
                                                </a>
                                            </div>
                                            <div className="taskchat-item-time" style={{ textAlign: "end", paddingRight: "10px" }}>
                                                <span>{item.time}</span>
                                            </div>
                                        </div>
                                    </>
                                }


                            </div>
                        )
                    }


                })
            }

        </>
    )
}
export default memo(BodyTaskChat)

