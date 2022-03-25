import React from 'react'
import FriendChat from "./FriendChat"
import GroupChat from "./GroupChat"
export default function Sidebar_chat() {
    return (
        <>
            <div className="chat__sidebar-friend">
                <FriendChat />
            </div>
            <div className="chat__sidebar-group">
                <GroupChat />
            </div>
        </>
    )
}
