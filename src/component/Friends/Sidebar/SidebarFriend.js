import { useContext } from 'react'
import FriendItem from "./FriendItem"
import { VisibleContext } from '../../../context/VisibleProvider'
import { MemberContext } from "../../../context/MemberProvider"
export default function SideBarFriend() {
    const { friendsList } = useContext(MemberContext)
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

                {
                    friendsList.map((item, index) =>

                        <div className="friend-item"
                            onClick={() => handleUserPreviews(item.id)}
                            key={index}
                        >
                            <FriendItem
                                data={item}
                            />
                        </div>

                    )
                }


            </div>
        </div>
    )
}
