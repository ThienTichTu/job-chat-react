import { useContext, useEffect, useState } from 'react'
import { Select, Avatar } from 'antd';
import { ProjectContext } from "../../../../context/ProjectProvider"
const { Option } = Select;
export default function SelectedUser({ handleChange, addTaskVisible }) {
    // <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    const { memberProjects } = useContext(ProjectContext)
    const children = [];



    for (let i = 0; i < memberProjects.length; i++) {
        children.push(
            <Option key={memberProjects[i].uid}>
                {
                    <div
                        style={{ display: 'flex' }}
                    >
                        <Avatar size={30} src={memberProjects[i].photoURL} />
                        <span style={{ fontSize: "18px", marginLeft: "10px" }}>
                            {memberProjects[i].displayName}
                        </span>
                    </div>

                }
            </Option>);
    }




    return (

        <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            size="large"
            placeholder="Nhấp vào để chọn..."
            onChange={handleChange}
        >
            {
                children
            }
        </Select>

    )
}
