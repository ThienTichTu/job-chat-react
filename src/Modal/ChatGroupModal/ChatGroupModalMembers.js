import { useContext } from 'react'
import { Avatar, Tooltip } from "antd"
import { RoomChatContext } from "../../context/RoomChatProvider"
import { VisibleContext } from "../../context/VisibleProvider"
import { AuthContext } from "../../context/AuthProvider"
export default function ChatGroupModalMembers() {
    const { members } = useContext(RoomChatContext)
    const { userCurrent: { id } } = useContext(AuthContext)
    const { setIsProfileVisible, setIsPreviewUserVisible, setIdUserPreview } = useContext(VisibleContext)
    const handleSetpreviews = (userid) => {

        if (userid === id) {

            setIsProfileVisible(true)
        } else {
            setIsPreviewUserVisible(true)
            setIdUserPreview(userid)
        }

    }


    return (
        <div className="chat-groupModal-row">
            <span>
                Thành viên :
            </span>
            <div style={{ display: 'flex', height: '50px', alignItems: 'center', marginLeft: "10px" }}>
                <Avatar.Group size={40} maxCount={10} maxPopoverPlacement="bottom">
                    {members.map((member) => (
                        <Tooltip title={member.displayName} key={member.id} >
                            <Avatar
                                src={member.photoURL} size={40}
                                onClick={() => handleSetpreviews(member.id)}
                            >
                                {member.photoURL ? '' : member.displayName?.charAt(0)?.toUpperCase()}

                            </Avatar>
                        </Tooltip>
                    ))}
                </Avatar.Group>
            </div>
        </div>
    )
}
