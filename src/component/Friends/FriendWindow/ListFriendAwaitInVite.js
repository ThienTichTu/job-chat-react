import { useContext } from 'react'
import { Avatar, Alert } from "antd"
import { MemberContext } from "../../../context/MemberProvider"
import { VisibleContext } from "../../../context/VisibleProvider"
export default function ListFriendAwaitInVite() {
    const { friendsInvite } = useContext(MemberContext)
    const {
        setIsPreviewUserVisible,
        setIdUserPreview
    } = useContext(VisibleContext)
    const handleUserPreviews = (e) => {
        setIsPreviewUserVisible(true)
        setIdUserPreview(e)

    }
    return (
        <div className="list__friendAwait">
            <div className="list__header">
                <span>Lời mời kết bạn</span>
            </div>

            <div className="list__invite-body">
                {
                    friendsInvite.length === 0
                        ?

                        <Alert style={{ height: "50px", marginTop: "5px", borderRadius: "5px" }} message="Không có lời mời kết bạn" type="info" />

                        :
                        friendsInvite.map((item, index) =>
                            <div
                                key={index}
                                className="list__invite-body-item"
                                onClick={() => handleUserPreviews(item.id)}
                            >
                                <Avatar src={item.photoURL} size="40" >
                                    {item.photoURL ? '' : item.displayName?.charAt(0)?.toUpperCase()}
                                </Avatar>

                                <span
                                    style={{ marginLeft: "10px" }}
                                >
                                    {item.displayName}
                                </span>
                            </div>
                        )
                }

            </div>
        </div>
    )
}
