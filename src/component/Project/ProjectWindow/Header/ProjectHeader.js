import { useContext } from 'react'
import { ProjectContext } from '../../../../context/ProjectProvider'
import { Avatar } from 'antd'
import HeaderListMember from "./HeaderListMember"
// import { LeftSquareFilled } from "@ant-design/icons"
export default function ProjectHeader() {
    const { selectedProject } = useContext(ProjectContext)
    const { background, name, time } = selectedProject
    return (
        <div className="project__dashboard-header">

            <Avatar className="dashboard__header-avatar" size={40} src={background}></Avatar>
            <span className="dashboard__header-name">
                {name}
            </span>
            <HeaderListMember />
            <span className="dashboard__header-infor">
                {`Ngày khởi tạo: ${time}`}
            </span>

        </div>
    )
}
