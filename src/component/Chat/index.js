import { useEffect, useContext } from 'react'
import './chat.scss'
import Sidebar_chat from "./sidebar/Sidebar_chat"
import Chatwindow from "./ChatWindow/Chatwindow"
import { RoomChatContext } from '../../context/RoomChatProvider'

export default function Chat() {
    const { roomId, setRoomId } = useContext(RoomChatContext)

    useEffect(() => {
        return () => {
            setRoomId("")
        }
    }, [])


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
