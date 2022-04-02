import React, { createContext, useState } from 'react'

export const VisibleContext = createContext()

export default function VisibleProvider({ children }) {

    const [isProfileVisible, setIsProfileVisible] = useState(false)
    const [isPreviewUserVisible, setIsPreviewUserVisible] = useState(false)
    const [isGroupChatModal, setIsGroupChatModal] = useState(false)
    const [isGroupChatModalInvite, setIsGroupChatModalInvite] = useState(false)
    const [isGroupChatUpdate, setIsGroupChatUpdate] = useState(false)
    const [isProjectModal, setIsProjectModal] = useState(false)
    const [isTasKUpdate, setIsTasKUpdate] = useState(false)

    const [idUserPreview, setIdUserPreview] = useState("")



    return (
        <VisibleContext.Provider
            value={{
                isProfileVisible,
                setIsProfileVisible,
                isPreviewUserVisible,
                setIsPreviewUserVisible,
                idUserPreview,
                setIdUserPreview,
                isGroupChatModal,
                setIsGroupChatModal,
                isGroupChatModalInvite,
                setIsGroupChatModalInvite,
                isGroupChatUpdate,
                setIsGroupChatUpdate,
                isProjectModal,
                setIsProjectModal,
                isTasKUpdate,
                setIsTasKUpdate
            }}
        >
            {children}
        </VisibleContext.Provider>
    )
}
