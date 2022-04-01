import React, { useContext } from 'react'
import AuthProvider from "./AuthProvider"
import VisibleProvider from './VisibleProvider'
import MemberProvider from "./MemberProvider"
import RoomChatProvider from "./RoomChatProvider"
import ProjectProvider from "./ProjectProvider"
export default function AppProvider({ children }) {

    return (
        <AuthProvider>
            <VisibleProvider>
                <MemberProvider>
                    <RoomChatProvider>
                        <ProjectProvider>
                            {children}
                        </ProjectProvider>
                    </RoomChatProvider>
                </MemberProvider>
            </VisibleProvider>
        </AuthProvider>
    )
}
