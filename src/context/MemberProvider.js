import { createContext, useContext, useMemo, useState } from 'react'
import { AuthContext } from "./AuthProvider"
import useFireStore from "../hook/useFireStore"
export const MemberContext = createContext()

export default function MemberProvider({ children }) {


    const { userCurrent: { friends } } = useContext(AuthContext)


    const userCondition = useMemo(() => {
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: friends,
        };

    }, [friends])

    const memberInvites = useFireStore('users', userCondition)


    return (
        <MemberContext.Provider value={memberInvites}>
            {children}
        </MemberContext.Provider>
    )
}
