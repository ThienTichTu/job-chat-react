import React, { useContext } from 'react'
import { Menu, Avatar, Dropdown } from 'antd';
import { auth } from "../../firebase/config"
import { LogoutOutlined } from "@ant-design/icons"
import { AuthContext } from '../../context/AuthProvider';
import { VisibleContext } from '../../context/VisibleProvider'

export default function UserNav() {

    const { userCurrent: { displayName, email, photoURL } } = useContext(AuthContext)

    const { setIsProfileVisible } = useContext(VisibleContext)



    const menu = (
        <Menu>

            <Menu.Item key="0">
                <div className="dropdow__item-infor">
                    <span>{displayName}</span>
                </div>
            </Menu.Item>
            <Menu.Item key="1">
                <div className="dropdow__item"
                    onClick={() => setIsProfileVisible(true)}
                >
                    <span>Thông tin cá nhân</span>
                </div>
            </Menu.Item>
            <Menu.Item key="3" >
                <div
                    className="dropdow__item"
                    onClick={() => {
                        auth.signOut()
                    }}
                >
                    <LogoutOutlined />
                    <span className="mr-10 block">
                        Đăng xuất
                    </span>
                </div>
            </Menu.Item>
        </Menu>
    );
    return (
        <div style={{ marginLeft: "auto" }} >
            <Dropdown trigger="click" overlay={menu} placement="bottomRight" arrow={{ pointAtCenter: true }}>
                <div className="main__header-avatar">
                    <Avatar src={photoURL} size={40} >
                        {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
                    </Avatar>

                </div>
            </Dropdown>

        </div >
    )
}
