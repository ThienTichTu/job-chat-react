import React, { useState, memo, useContext } from 'react';
import { Drawer, Avatar } from 'antd';
import { CloseOutlined, PlusOutlined } from "@ant-design/icons"
import { ProjectContext } from "../../context/ProjectProvider"
function UpdateMember({ updateMemberVisible, setUpdateMemberVisible, maker, updateMaker }) {
    const { memberProjects } = useContext(ProjectContext)
    const onClose = () => {
        setUpdateMemberVisible(false)
    }
    return (
        <Drawer
            title="Cập nhật người làm" placement="right" width={500}
            onClose={onClose} visible={updateMemberVisible}>
            <div className="task__update-updatemaker">
                <h4> Người đang thực hiện</h4>

                {
                    maker &&
                    maker.map((item, index) =>

                        <div key={index} className="avatar-item2">
                            <Avatar src={item.photoURL} size={40}>
                                {item.photoURL ? '' : item.displayName?.charAt(0)?.toUpperCase()}
                            </Avatar>
                            <span style={{ fontSize: "20px", marginLeft: "10px" }}>
                                {item.displayName}
                            </span>
                            <div style={{ marginLeft: "auto", cursor: "pointer" }}
                                onClick={() => updateMaker(index, "remove")}
                            >
                                <CloseOutlined />
                            </div>
                        </div>
                    )
                }

            </div>
            <div className="task__update-updatemember">
                <h4> Danh sách người có thể thực hiện </h4>
                {
                    memberProjects &&
                    memberProjects.map((item, index) => {
                        const isMaker = maker ? maker.map(item => item.uid).includes(item.uid) : false

                        return <div key={index} className={`avatar-item2 ${isMaker && "disable"}`}>
                            <Avatar src={item.photoURL} size={40}>
                                {item.photoURL ? '' : item.displayName?.charAt(0)?.toUpperCase()}
                            </Avatar>
                            <span style={{ fontSize: "20px", marginLeft: "10px" }}>
                                {item.displayName}
                            </span>
                            <div style={{ marginLeft: "auto", cursor: "pointer" }}

                            >
                                {
                                    isMaker ? "Đang thực hiện" : <PlusOutlined
                                        onClick={() => updateMaker(item, "add")}
                                    />
                                }

                            </div>
                        </div>
                    }

                    )
                }

            </div>
        </Drawer>
    )
}
export default memo(UpdateMember)