import React from 'react'
import ProfileModal from "./Profile/ProfileModal"
import UserPreviewModal from "./UserPreview/UserPreviewModal"
export default function ModalWarper() {
    return (
        <>
            <ProfileModal />
            <UserPreviewModal />
        </>
    )
}
