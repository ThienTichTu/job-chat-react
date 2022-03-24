import React from 'react'
import "./friend.scss"
import FriendWindow from "./FriendWindow/FriendWindow"
import SideBarFriend from "./Sidebar/SidebarFriend"

export default function Friends() {
    return (
        <div className="friend">
            <SideBarFriend />

            <FriendWindow />
        </div>
    )
}
