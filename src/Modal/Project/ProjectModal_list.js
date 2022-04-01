import React from 'react'
import { Avatar } from "antd"
import { Select } from 'antd';

const { Option } = Select;

export default function ProjectModal_list({ members, ChangeMember }) {

    return (
        <div className="project__modal-list">
            {
                members.map((item, index) => (
                    <div key={index} className="project-members-rules">
                        <Avatar size={40} src={item.photoURL}>
                            {item.photoURL ? '' : item.displayName?.charAt(0)?.toUpperCase()}
                        </Avatar>
                        <span>{item.displayName}</span>

                        <Select
                            defaultValue={`${item.uid} ${item.role} ${index}`}
                            style={{ minWidth: 170, marginLeft: "auto", fontSize: "18px" }}
                            onChange={ChangeMember}>
                            <Option value={`${item.uid} member ${index}`}>Thành viên</Option>
                            <Option value={`${item.uid} admin ${index}`}>Quản trị viên</Option>

                        </Select>

                    </div>

                ))
            }


        </div >
    )
}
