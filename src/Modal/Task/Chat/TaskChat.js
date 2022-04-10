import { useContext, useRef, useState, useEffect, useCallback } from 'react'
import "./TaskChat.scss"
import BodyTaskChat from "./BodyTaskChat"
import { Button, Drawer, Space } from "antd"
import { VisibleContext } from "../../../context/VisibleProvider"
import { RoomChatContext } from "../../../context/RoomChatProvider"
import FooterTaskChat from "./FooterTaskChat"
export default function TaskChat({ taskchatVisible }) {
    const { isTasKChat, setIsTasKChat } = useContext(VisibleContext)
    const { scroll } = useContext(RoomChatContext)

    const onClose = () => {
        setIsTasKChat(false)
    }
    const messagesEndRef = useRef(null)



    useEffect(() => {

        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTo(0, messagesEndRef.current.scrollHeight)
        }

    }, [scroll, taskchatVisible]);

    return (
        <Drawer
            title="Tin nhắn công việc"
            placement="top"
            height={500}
            onClose={onClose}
            visible={isTasKChat}
            extra={
                <Space>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="primary" onClick={onClose}>
                        OK
                    </Button>
                </Space>
            }
        >
            <div className="taskchat">

                <div className="taskchat-body" ref={messagesEndRef}>
                    <BodyTaskChat
                    />

                </div>
                <div className="taskchat-footer">
                    <FooterTaskChat
                        taskchatVisible={taskchatVisible}
                    />
                </div>
            </div>

        </Drawer>
    )
}
