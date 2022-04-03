import React from 'react'
import ProfileModal from "./Profile/ProfileModal"
import UserPreviewModal from "./UserPreview/UserPreviewModal"
import ChatGroupModal from "./ChatGroupModal/ChatGroupModal"
import ChatGroupModalInVite from "./ChatGroupModal/ChatGroupModalInVite"
import ChatGroupModalUpdate from "./ChatGroupModal/ChatGroupModalUpdate"
import ProjectModal from "./Project/ProjectModal"
import Taskupdate from "./Task/Taskupdate"
import TaskChat from "./Task/Chat/TaskChat"
export default function ModalWarper() {
    return (
        <>
            <ProfileModal />
            <UserPreviewModal />
            <ChatGroupModal />
            <ChatGroupModalInVite />
            <ChatGroupModalUpdate />
            <ProjectModal />
            <Taskupdate />
            <TaskChat />
        </>
    )
}
