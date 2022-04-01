import "./chatgroupmodal.scss"
import { useContext, useState } from 'react'
import { Modal, Button, message } from 'antd';
import { VisibleContext } from "../../context/VisibleProvider"
import ChatGroupName from "./ChatGroupName";
import ChatGroupDescription from "./ChatGroupDescription"
import { AuthContext } from "../../context/AuthProvider"
import { addDocument } from "../../firebase/services"
export default function ChatGroupModal() {
    const { isGroupChatModal, setIsGroupChatModal } = useContext(VisibleContext)
    const { userCurrent: { uid } } = useContext(AuthContext)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const handleOk = () => {
        if (name !== "" && description !== "") {
            addDocument("rooms", {
                type: "group chat",
                data: [],
                members: [uid],
                name: name,
                description: description
            })
            message.success("Tạo phòng chat thành công...")
            setIsGroupChatModal(false);
        } else {
            message.warning("Nhập đầy đủ thông tin...")
        }
    };

    const handleCancel = () => {
        setIsGroupChatModal(false);
    };
    return (

        <Modal
            title="Tạo phòng chat"
            visible={isGroupChatModal}
            onOk={handleOk}
            onCancel={handleCancel}
            width={700}
            footer={[
                <Button key="back" type="primary" onClick={handleOk}>
                    Tạo Phòng
                </Button>,

            ]}
        >
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
