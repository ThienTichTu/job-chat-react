import React from 'react'
import { Avatar, Tooltip } from "antd"
import { UsergroupAddOutlined, SettingOutlined } from "@ant-design/icons"
export default function Header() {
    return (
        <>
            <div className="chatwindow__header-infor">
                <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                    Tên Phòng chát
                </span>
                <span>
                    Description
                </span>
            </div>
            <div className="chatwindow__header-member">
                <div className="header-member-setting">
                    <UsergroupAddOutlined />
                </div>
                <div className="header-member-setting hover-rotate">
                    <SettingOutlined />
                </div>
                <div className="header-member-list">
                    <Avatar.Group size={40} maxCount={2} maxPopoverPlacement="bottom">
                        <Tooltip title="Thirn" key="1" >
                            <Avatar src="https://i.pravatar.cc/150?img=3" size={40} >
                                T
                            </Avatar>
                        </Tooltip>
                        <Tooltip title="Thirn" key="2" >
                            <Avatar src="https://i.pravatar.cc/150?img=3" size={40} >
                                T
                            </Avatar>
                        </Tooltip>
                        <Tooltip title="Thirn" key="4" >
                            <Avatar src="https://i.pravatar.cc/150?img=3" size={40} >
                                T
                            </Avatar>
                        </Tooltip>
                    </Avatar.Group>
                </div>
            </div>
        </>
    )
}
