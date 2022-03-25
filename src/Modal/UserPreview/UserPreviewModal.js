import { useContext, useEffect, useState, memo } from 'react'
import { Modal, Button, message, Avatar } from "antd"
import ButtonStateUser from "./ButtonStateUser"
import { VisibleContext } from "../../context/VisibleProvider"
import { FindUserWithId } from "../../firebase/services"
import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from "@ant-design/icons"
import { MemberContext } from "../../context/MemberProvider"
import { AuthContext } from "../../context/AuthProvider"
import _ from "lodash"
import "./UserPreviewModal.scss"

function UserPreviewModal() {

    const { friendsList } = useContext(MemberContext)
    const [user, setUser] = useState({})

    const [checkUser, setCheckUser] = useState("")

    const {
        isPreviewUserVisible,
        setIsPreviewUserVisible,
        idUserPreview,
        setIdUserPreview } = useContext(VisibleContext)

    const { userCurrent: { friends, FriendInvite, uid } } = useContext(AuthContext)



    const getUser = async () => {
        if (idUserPreview) {
            const data = await FindUserWithId(idUserPreview)
            setUser(data)

        }
    }

    useEffect(() => {
        getUser()
        return () => {

            setUser({})
            setCheckUser("")
        }
    }, [isPreviewUserVisible])

    useEffect(() => {
        let friends = _.find(friendsList, (item) => item.uid === user.uid) // render Bạn bè

        let Invite = _.find(FriendInvite, (item) => item === user.uid) // => render Đồng ý

        let InviteOfUser = _.find(user.FriendInvite, (item) => item === uid) // => render da gui loi moi

        if (friends) {
            setCheckUser("Ban be")
        } else {
            if (Invite) {
                setCheckUser("Dong y")
            } else {
                if (InviteOfUser) {
                    setCheckUser("Da gui loi moi")
                } else {
                    setCheckUser("Kết bạn")

                }
            }
        }

        return () => [
            setCheckUser('')
        ]
    }, [user])


    const handleOk = () => {
        setIsPreviewUserVisible(false)
    }

    const handleCancel = () => {
        setIsPreviewUserVisible(false)
        setIdUserPreview("")
        setCheckUser("")
    }

    return (

        <Modal
            title="Thông tin cá nhân"
            visible={isPreviewUserVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            width={700}
            footer={null}
        >
            <div className="userpreviews">
                <div className="userpreviews__avatar">
                    <Avatar src={user.photoURL} size={120} >
                        {user.photoURL ? '' : <>
                            <span
                                style={{ fontSize: '35px' }}
                            >
                                {user.displayName?.charAt(0)?.toUpperCase()}
                            </span>
                        </>}
                    </Avatar>
                    <ButtonStateUser
                        checkUser={checkUser}
                        setCheckUser={setCheckUser}
                        idUser={idUserPreview}
                        listFriensInvite={user.FriendInvite}
                        User={user}
                    />
                </div>
                <div className="userpreviews__infor">
                    <div className="userpreviews__infor-item">
                        <span className="userpreviews__infor-title">
                            Tên :
                        </span>
                        <span className="userpreviews__infor-content">
                            {user.displayName}
                        </span>
                    </div>
                    <div className="userpreviews__infor-item">
                        <span className="userpreviews__infor-title">
                            Email:
                        </span>
                        <span className="userpreviews__infor-content">
                            {user.email}

                        </span>
                    </div>
                    <div className="userpreviews__infor-item">
                        <span className="userpreviews__infor-title">
                            Số điện thoại
                        </span>
                        <span className="userpreviews__infor-content">
                            {user.phone}

                        </span>
                    </div>
                    <div className="userpreviews__infor-item">
                        <span className="userpreviews__infor-title">
                            Địa chỉ:
                        </span>
                        <span className="userpreviews__infor-content">
                            {user.address}

                        </span>
                    </div>
                    <div className="userpreviews__infor-item">
                        <span className="userpreviews__infor-title">

                        </span>
                        <div className="userpreviews__infor-link">
                            {
                                user.linkFace && (
                                    <div className="userpreviews__infor-link-item">
                                        <a href={user.linkFace}>
                                            <FacebookOutlined />
                                        </a>

                                    </div>
                                )
                            }
                            {
                                user.linkTwitter && (
                                    <div className="userpreviews__infor-link-item">
                                        <a href={user.linkTwitter}>
                                            <TwitterOutlined />
                                        </a>

                                    </div>
                                )
                            }

                            {
                                user.linkInstagram && (
                                    <div className="userpreviews__infor-link-item">
                                        <a href={user.linkInstagram}>
                                            <InstagramOutlined />
                                        </a>

                                    </div>
                                )
                            }



                        </div>
                    </div>


                </div>
            </div>

        </Modal>

    )
}
export default memo(UserPreviewModal)