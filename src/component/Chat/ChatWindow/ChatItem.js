import { memo } from 'react'
import { Avatar } from "antd"
function ChatItem({ isUser, data, useSend, handleSetpreviews }) {

    return (
        <>
            {useSend &&
                <>
                    <div className="chatItem__avatar"
                        onClick={() => { handleSetpreviews(useSend.id) }}
                    >
                        <Avatar size={40} src={useSend.photoURL}>
                            {useSend.photoURL ? '' : useSend.displayName?.charAt(0)?.toUpperCase()}
                        </Avatar>
                    </div>

                    <div className={`chatItem__content ${isUser}`}>
                        <span>
                            {data.content}
                        </span>
                        <span className="chatItem__content-time">
                            {data.time}
                        </span>
                    </div>
                </>
            }

        </>
    )
}
export default memo(ChatItem)
