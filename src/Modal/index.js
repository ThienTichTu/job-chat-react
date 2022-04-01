import React from 'react'
import ProfileModal from "./Profile/ProfileModal"
import UserPreviewModal from "./UserPreview/UserPreviewModal"
import ChatGroupModal from "./ChatGroupModal/ChatGroupModal"
import ChatGroupModalInVite from "./ChatGroupModal/ChatGroupModalInVite"
import ChatGroupModalUpdate from "./ChatGroupModal/ChatGroupModalUpdate"
import ProjectModal from "./Project/ProjectModal"
export default function ModalWarper() {
    return (
        <>
            <ProfileModal />
            <UserPreviewModal />
            <ChatGroupModal />
            <ChatGroupModalInVite />
            <ChatGroupModalUpdate />
            <ProjectModal />
        </>
    )
}
