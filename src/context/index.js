import React, { useContext } from 'react'
import AuthProvider from "./AuthProvider"
import VisibleProvider from './VisibleProvider'
import MemberProvider from "./MemberProvider"
import RoomChatProvider from "./RoomChatProvider"
export default function AppProvider({ children }) {

    return (
        <AuthProvider>
            <VisibleProvider>
                <MemberProvider>
                    <RoomChatProvider>
                        {children}
                    </RoomChatProvider>
                </MemberProvider>
            </VisibleProvider>
        </AuthProvider>
    )
}
