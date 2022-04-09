import { useContext, useState } from 'react'
import { ProjectContext } from '../../../../context/ProjectProvider'
import { Avatar } from 'antd'
import HeaderListMember from "./HeaderListMember"
import UpdateProject from "./UpdateProject"
// import { LeftSquareFilled } from "@ant-design/icons"
export default function ProjectHeader() {
    const { selectedProject } = useContext(ProjectContext)
    const { background, name, time } = selectedProject
    const [updateProjectVisible, setUpdateProjectVisible] = useState(false)
    return (
        <div className="project__dashboard-header">


            <Avatar className="dashboard__header-avatar" size={40} src={background}
                onClick={() => setUpdateProjectVisible(true)}
            ></Avatar>
            <span className="dashboard__header-name"
                onClick={() => setUpdateProjectVisible(true)}

            >
                {name}
            </span>

            <HeaderListMember />
            <span className="dashboard__header-infor">
                {`Ngày khởi tạo: ${time}`}
            </span>
            <UpdateProject
                updateProjectVisible={updateProjectVisible}
                setUpdateProjectVisible={setUpdateProjectVisible}
            />
        </div>
    )
}
