import { useContext } from 'react'
import { SettingOutlined } from "@ant-design/icons"
import { VisibleContext } from "../../../context/VisibleProvider"
import { RoomChatContext } from "../../../context/RoomChatProvider"
import GroupChatItem from "./GroupChatItem"
export default function GroupChat() {
    const { setIsGroupChatModal } = useContext(VisibleContext)
    const { roomListGroup, setRoomId } = useContext(RoomChatContext)

    const hanleOnclick = (id) => {
        setRoomId(id)
    }
    return (
        <>
            <div className="chat__sidebar-header">
                <h2>Nhóm chat</h2>
            </div>
            <div className="sidebar__group-header"
                onClick={() => setIsGroupChatModal(true)}
            >
                <div className="item"
                >
                    <SettingOutlined />
                </div>
                <span style={{ fontSize: "18px" }}>
                    Tạo nhóm chat
                </span>
            </div>
            <div className="chat__sidebar-body">
                {
                    roomListGroup.map((item, index) =>
                        <div key={index} className="chat__sidebar-item"
                            onClick={() => hanleOnclick(item.id)}
                        >
                            <GroupChatItem
                                data={item}
                            />

                        </div>
                    )
                }

            </div>
        </>
    )
}
