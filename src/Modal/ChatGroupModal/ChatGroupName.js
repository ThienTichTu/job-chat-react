import { useState } from 'react'

export default function ChatGroupName({ name, onSetName }) {
    return (
        <div className="chat-groupModal-row">
            <span>
                Tên Phòng :
            </span>
            <input
                type="text"
                value={name}
                onChange={(e) => onSetName(e.target.value)}
            />
        </div>
    )
}
