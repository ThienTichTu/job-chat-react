import { useContext } from 'react'
import FriendItem from "./FriendItem"
import { VisibleContext } from '../../../context/VisibleProvider'

export default function SideBarFriend() {
    const {
        setIsPreviewUserVisible,
        setIdUserPreview
    } = useContext(VisibleContext)

    const handleUserPreviews = (e) => {
        setIsPreviewUserVisible(true)
        setIdUserPreview(e)

    }

    return (
        <div className="friend__sidebar">
            <div className="friend__sidebar-header">
                <h2>Danh sách bạn bè</h2>
            </div>
            <div className="friend__sidebar-listfriend">
                <div className="friend-item"
                    onClick={() => handleUserPreviews("id user")}
                >

                    <FriendItem />
                </div>
            </div>
        </div>
    )
}
