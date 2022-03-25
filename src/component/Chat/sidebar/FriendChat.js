import { useContext, memo } from 'react'
import { MemberContext } from "../../../context/MemberProvider"
import FriendChatItem from "./FriendChatItem"
import { RoomChatContext } from "../../../context/RoomChatProvider"


function FriendChat() {
    const { roomListFriend, setRoomId } = useContext(RoomChatContext)

    const hanleOnclick = (id) => {
        setRoomId(id)
    }

    return (
        <>
            <div className="chat__sidebar-header">
                <h2>Tin nhắn bạn bè</h2>
            </div>
            <div className="chat__sidebar-body">
                {
                    roomListFriend.map((item, index) =>
                        <div key={index} className="chat__sidebar-item"
                            onClick={() => hanleOnclick(item.id)}
                        >
                            <FriendChatItem
                                data={item.interFace}
                            />

                        </div>
                    )
                }



            </div>
        </>
    )
}
export default memo(FriendChat)