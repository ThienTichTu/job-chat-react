import React from 'react'
import { SettingOutlined } from "@ant-design/icons"
export default function GroupChat() {
    return (
        <>
            <div className="chat__sidebar-header">
                <h2>Nhóm chat</h2>
            </div>
            <div className="sidebar__group-header">
                <div className="item">
                    <SettingOutlined />

                </div>
                <span style={{ fontSize: "18px" }}>
                    Tạo nhóm chat
                </span>
            </div>
            <div className="chat__sidebar-body">

            </div>
        </>
    )
}
