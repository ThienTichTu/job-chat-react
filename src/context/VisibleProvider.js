import React, { createContext, useState } from 'react'

export const VisibleContext = createContext()

export default function VisibleProvider({ children }) {

    const [isProfileVisible, setIsProfileVisible] = useState(false)
    const [isPreviewUserVisible, setIsPreviewUserVisible] = useState(false)
    const [idUserPreview, setIdUserPreview] = useState("")



    return (
        <VisibleContext.Provider
            value={{
                isProfileVisible,
                setIsProfileVisible,
                isPreviewUserVisible,
                setIsPreviewUserVisible,
                idUserPreview,
                setIdUserPreview
            }}
        >
            {children}
        </VisibleContext.Provider>
    )
}
