import { useContext } from 'react'
import './project.scss'
import { PlusOutlined } from "@ant-design/icons"
import { VisibleContext } from "../../context/VisibleProvider"
import { ProjectContext } from "../../context/ProjectProvider"
import { AuthContext } from '../../context/AuthProvider'
import { useNavigate } from "react-router-dom"
export default function Project() {
    const navigate = useNavigate()
    const { userCurrent: { uid } } = useContext(AuthContext)
    const { setIsProjectModal } = useContext(VisibleContext)
    const { projects, setProjectId } = useContext(ProjectContext)
    const redirect = (id) => {
        setProjectId(id)
        navigate(`/projects/${id}`)
    }
    return (
        <div className="project">
            {
                projects.map((item, index) => (

                    <div className="project-item" key={index}
                        onClick={() => redirect(item.id)}
                    >
                        {item.admin.includes(uid) && <div className="isAdmin"></div>}

                        <div className="project-item-avatar">
                            <img src={item.background} alt="" />
                        </div>

                        <span className="project-item-name">
                            {item.name}

                        </span>

                    </div>


                ))
            }


            <div className="project-item"
                onClick={() => setIsProjectModal(true)}
            >
                <div className=" add-project">
                    <PlusOutlined />
                </div>
                <span
                    className="project-item-name"
                    style={{ opacity: "0.6" }}
                >
                    Tạo  dự án
                </span>
            </div>
        </div>
    )
}
