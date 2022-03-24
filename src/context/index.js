import React, { useContext } from 'react'
import AuthProvider from "./AuthProvider"
import VisibleProvider from './VisibleProvider'
import MemberProvider from "./MemberProvider"
export default function AppProvider({ children }) {

    return (
        <AuthProvider>
            <VisibleProvider>
                <MemberProvider>
                    {children}
                </MemberProvider>
            </VisibleProvider>
        </AuthProvider>
    )
}
