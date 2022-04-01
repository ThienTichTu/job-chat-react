import { useContext, useEffect, useState } from 'react'
import { Modal, Button } from 'antd';
import { VisibleContext } from "../../context/VisibleProvider"
import { RoomChatContext } from '../../context/RoomChatProvider';
import { AuthContext } from "../../context/AuthProvider"
import ChatGroupName from "./ChatGroupName"
import ChatGroupModalMembers from "./ChatGroupModalMembers"
import ChatGroupDescription from './ChatGroupDescription';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { updateDocument, deleteDocument } from "../../firebase/services"
const { confirm } = Modal;



export default function ChatGroupModalUpdate() {
    const { userCurrent: { uid } } = useContext(AuthContext)
    const { isGroupChatUpdate, setIsGroupChatUpdate } = useContext(VisibleContext)

    const { selectedRoom, setRoomId } = useContext(RoomChatContext)

    const [name, setName] = useState("")


    const [description, setDescription] = useState("")
    const handleOk = () => {
        setIsGroupChatUpdate(false)
    }
    const handleCancel = () => {
        setIsGroupChatUpdate(false)

    }
    useEffect(() => {

        if (selectedRoom.type = "group chat") {
            setName(selectedRoom.name)
            setDescription(selectedRoom.description)
        }
        return () => {
            setName("")
            setDescription("")
        }
    }, [isGroupChatUpdate])
    function showConfirm() {

        confirm({
            title: 'Bạn có chắc chắn muốn rời khỏi phòng ?',
            icon: <ExclamationCircleOutlined />,
            content: 'Chọn Ok để rời hoặc chọn Cancel để hủy',
            onOk() {
                const newMember = selectedRoom.members.filter(member => member !== uid)
                if (newMember.length === 0) {
                    setRoomId("")
                    setIsGroupChatUpdate(false)
                    deleteDocument('rooms', selectedRoom.id)
                } else {
                    updateDocument('rooms', selectedRoom.id, {
                        members: newMember
                    })
                    setRoomId("")
                    setIsGroupChatUpdate(false)
                }



            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    return (
        <Modal
            title="Thêm thành viên"
            visible={isGroupChatUpdate}
            onOk={handleOk}
            onCancel={handleCancel}
            width={700}
            footer={[
                <Button key="back" type="danger" onClick={showConfirm}>
                    Rời khỏi phòng
                </Button>,
                <Button key="submit" type="primary" onClick={handleOk}>
                    Cập nhật
                </Button>,
            ]}
        >

            <ChatGroupModalMembers />

            <ChatGroupName
                name={name}
                onSetName={setName}
            />

            <ChatGroupDescription
                description={description}
                onsetDescription={setDescription}
            />

        </Modal>


    )
}
