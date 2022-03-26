import { useContext, useState, useEffect } from 'react'
import { Avatar, Tooltip } from "antd"
import { UsergroupAddOutlined, SettingOutlined } from "@ant-design/icons"
import { RoomChatContext } from '../../../context/RoomChatProvider'
import { MemberContext } from '../../../context/MemberProvider'
import { AuthContext } from "../../../context/AuthProvider"
import _ from "lodash"
export default function Header() {

    const { members, selectedRoom, roomId } = useContext(RoomChatContext)
    const { userCurrent: { uid } } = useContext(AuthContext)
    const [name, setName] = useState({
        nameRoom: "",
        descriptionRoom: ""

    })

    useEffect(() => {
        if (selectedRoom.name) {
            setName(selectedRoom.name)
        } else {
            const RoomName = _.find(members, (item) => item.uid !== uid)
            if (RoomName) {
                setName({
                    nameRoom: RoomName.displayName,
                    descriptionRoom: ""
                })
            }
        }

    }, [roomId, members])


    return (
        <>
            <div className="chatwindow__header-infor">
                <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                    {name.nameRoom}
                </span>
                <span>
                    {name.descriptionRoom}
                </span>
            </div>
            <div className="chatwindow__header-member">
                <div className="header-member-setting">
                    <UsergroupAddOutlined />
                </div>
                <div className="header-member-setting hover-rotate"
                    style={{ marginRight: "20px" }}
                >
                    <SettingOutlined />
                </div>
                <div className="header-member-list">
                    <Avatar.Group size={40} maxCount={2} maxPopoverPlacement="bottom">


                        {members.map((member) => (
                            <Tooltip title={member.displayName} key={member.id} >
                                <Avatar src={member.photoURL} size={40} >
                                    {member.photoURL ? '' : member.displayName?.charAt(0)?.toUpperCase()}

                                </Avatar>
                            </Tooltip>
                        ))}
                    </Avatar.Group>
                </div>
            </div>
        </>
    )
}
