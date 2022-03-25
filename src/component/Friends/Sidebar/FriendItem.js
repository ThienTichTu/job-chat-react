import { useContext } from 'react'
import { Avatar } from 'antd'
export default function FriendItem({ data }) {
    const { photoURL, displayName } = data

    return (
        <>
            <Avatar src={photoURL} size="40" >
                {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
            </Avatar>

            <span className="friend-item-name">
                {displayName}
            </span>
        </>

    )
}
