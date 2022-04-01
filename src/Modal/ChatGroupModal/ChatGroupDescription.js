import React from 'react'

export default function ChatGroupDescription({ description, onsetDescription }) {
    return (
        <div className="chat-groupModal-row">
            <span>
                Mô tả :
            </span>
            <input
                type="text"
                value={description}
                onChange={e => onsetDescription(e.target.value)}
            />
        </div>
    )
}
