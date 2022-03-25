import { useContext } from 'react'
import { UserAddOutlined } from "@ant-design/icons"
import { Menu, Avatar, Dropdown, Alert } from 'antd';
import { MemberContext } from "../../context/MemberProvider"
import { VisibleContext } from "../../context/VisibleProvider"

export default function UserAddNotification() {
    const { friendsInvite } = useContext(MemberContext)
    const {
        setIsPreviewUserVisible,
        setIdUserPreview
    } = useContext(VisibleContext)
    const handleUserPreviews = (e) => {
        setIsPreviewUserVisible(true)
        setIdUserPreview(e)

    }

    const menu = (
        <Menu>
            {
                friendsInvite.length === 0
                    ?
                    <Alert style={{ width: "250px" }} message="Không có lời mời !" type="info" />
                    :
                    friendsInvite.map((item, index) =>
                        <Menu.Item key={index}>
                            <div style={{ width: "250px" }}
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
                        </Menu.Item>
                    )
            }


        </Menu>
    );
    return (
        <Dropdown overlay={menu} placement="bottomRight" arrow={{ pointAtCenter: true }}>
            <div className="UserAddNotification">
                <UserAddOutlined />

                {
                    friendsInvite.length !== 0 &&
                    <span className=" UserAddNotification-cout">
                        {
                            friendsInvite.length
                        }
                    </span>
                }
            </div>

        </Dropdown>
    )
}
