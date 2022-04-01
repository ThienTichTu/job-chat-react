import "./chatgroupmodal.scss"
import { useContext, useState, useEffect } from 'react'
import { Modal, Button } from 'antd';
import { VisibleContext } from "../../context/VisibleProvider"
import { RoomChatContext } from "../../context/RoomChatProvider";
import { updateDocument } from '../../firebase/services'
import SelectFriend from "./SelectFriend"

export default function ChatGroupModalInVite() {
    const { isGroupChatModalInvite, setIsGroupChatModalInvite } = useContext(VisibleContext)
    const { roomId, selectedRoom } = useContext(RoomChatContext)
    const [selectedItems, setSelectedItems] = useState([])
    useEffect(() => {
        return () => {
            setSelectedItems([])
        }
    }, [isGroupChatModalInvite])
    const handleOk = () => {
        updateDocument("rooms", roomId, {
            members: [...selectedRoom.members, ...selectedItems]
        })
        setIsGroupChatModalInvite(false);

    };

    const handleCancel = () => {
        setIsGroupChatModalInvite(false);
    };

    const handleChange = (selectedItems) => {
        setSelectedItems(selectedItems)
    }
    return (

        <Modal
            title="Thêm thành viên"
            visible={isGroupChatModalInvite}
            onOk={handleOk}
            onCancel={handleCancel}
            width={700}
            footer={[
                <Button key="back" type="primary" onClick={handleOk}>
                    Thêm thành viên
                </Button>,

            ]}
        >

            <SelectFriend
                selectedItems={selectedItems}
                handleChange={handleChange}
                title="Thêm thành viên vào nhóm chat"
            />

        </Modal>

    )
}
