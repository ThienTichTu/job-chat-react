import { createContext, useContext, useEffect, useState, useMemo } from 'react'
import useFireStore from '../hook/useFireStore'
import { AuthContext } from "./AuthProvider"
import { MemberContext } from './MemberProvider'
import _ from "lodash"

export const RoomChatContext = createContext()

export default function RoomChatProvider({ children }) {

    const { userCurrent: { uid, displayName, id, photoURL, email } } = useContext(AuthContext)

    const { friendsList } = useContext(MemberContext)

    const [roomId, setRoomId] = useState("")

    const [roomListFriend, setRoomListFriend] = useState([])


    const roomsCondition = useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: uid,
        }
    }, [uid, friendsList])

    const rooms = useFireStore('rooms', roomsCondition)

    const selectedRoom = useMemo(
        () => {
            return _.find(rooms, ['id', roomId]) || { members: [] }
        },
        [roomId, rooms]
    );
    const userCondition = useMemo(() => {
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: selectedRoom.members,
        }

    }, [roomId, selectedRoom])

    const members = useFireStore("users", userCondition)



    // danh sach cac phong
    useEffect(() => {
        const roomsFriend = _.filter(rooms, function (o) { return o.type === 'friend chat' });
        const roomsFriendDetail = _.flatMap(roomsFriend, (item) => {

            const friend = _.filter(item.members, (o) => o !== uid)

            const interFace = _.find(friendsList, ['uid', friend[0]]);

            const { data, ...newdata } = item


            return {
                ...newdata,
                interFace
            }
        })
        setRoomListFriend(roomsFriendDetail)
    }, [rooms])



    return (
        <RoomChatContext.Provider value={{
            roomListFriend,
            roomId,
            setRoomId,
            selectedRoom,
            members
        }}>
            {children}
        </RoomChatContext.Provider>
    )
}
