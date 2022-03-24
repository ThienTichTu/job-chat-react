import React from 'react'
import FriendWindowSearchEmail from "./FriendWindowSearchEmail"
import FriendWindowSearchName from './FriendWindowSearchName'
export default function FriendWindow() {
    return (
        <div className="friend__window">
            <div className="friend__window-search email">
                <FriendWindowSearchEmail />
            </div>
            <div className="friend__window-search name">
                <FriendWindowSearchName />
            </div>
        </div>
    )
}
