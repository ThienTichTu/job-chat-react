import { useContext, useState, useEffect } from 'react'
import { Select, Avatar } from 'antd';
import { MemberContext } from "../../context/MemberProvider"
import { RoomChatContext } from "../../context/RoomChatProvider"
import _ from "lodash"
export default function SelectFriend({ selectedItems, handleChange, title }) {
    const { friendsList } = useContext(MemberContext)

    const { selectedRoom } = useContext(RoomChatContext)

    const [option, setOption] = useState([])
    useEffect(() => {
        const newMember = _.filter(friendsList, function (o) {
            return !_.includes(selectedRoom.members, o.uid);
        });

        setOption(newMember)
    }, [selectedItems])




    return (
        <div>
            <Select
                mode="multiple"
                placeholder={`${title}`}
                value={selectedItems}
                onChange={handleChange}
                style={{ width: '100%' }}
                size="large" listItemHeight={10} listHeight={250}

            >
                {option.map(item => (
                    <Select.Option key={item.id} value={item.uid}>
                        <div styte={{ display: 'flex' }}>
                            <Avatar size={40} src={item.photoURL}>
                                {item.photoURL ? '' : item.displayName?.charAt(0)?.toUpperCase()}
                            </Avatar>
                            <span>
                                {item.displayName}
                            </span>
                        </div>
                    </Select.Option>
                ))}
            </Select>
        </div>
    )
}
