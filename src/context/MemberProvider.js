import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { AuthContext } from "./AuthProvider"
import useFireStore from "../hook/useFireStore"
export const MemberContext = createContext()

export default function MemberProvider({ children }) {
    const [friendsList, setFriendList] = useState([])

    const [friendsInvite, setFriendInvite] = useState([])

    const { userCurrent: { friends, FriendInvite } } = useContext(AuthContext)


    const friendsCondition = useMemo(() => {
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: friends,
        };
    }, [friends])

    const Friends = useFireStore('users', friendsCondition)

    useEffect(() => {
        const data = Friends.map(item => {
            return {
                displayName: item.displayName,
                email: item.email,
                keywords: item.keywords,
                uid: item.uid,
                photoURL: item.photoURL,
                id: item.id
            }
        })
        setFriendList(data)
    }, [Friends])



    const friendsInviteCondition = useMemo(() => {
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: FriendInvite,
        };
    }, [FriendInvite])

    const FriendsInvite = useFireStore('users', friendsInviteCondition)

    useEffect(() => {
        const data = FriendsInvite.map(item => {
            return {
                displayName: item.displayName,
                email: item.email,
                keywords: item.keywords,
                uid: item.uid,
                photoURL: item.photoURL,
                id: item.id
            }
        })

        setFriendInvite(data)
    }, [FriendsInvite])

    return (
        <MemberContext.Provider value={
            {
                friendsList,
                friendsInvite
            }
        }>
            {children}
        </MemberContext.Provider>
    )
}
