import { useContext, useEffect } from 'react'
import { useParams, Link } from "react-router-dom"
import { ProjectContext } from '../../../context/ProjectProvider';
import { isRenderChatRoom } from "./RenderDashBoard"
import ProjectMainBoard from './Body/ProjectMainBoard';
import ProjectHeader from "./Header/ProjectHeader"

function ProjectDarboard() {
    let { id } = useParams();

    const { selectedProject } = useContext(ProjectContext)


    return (
        <div className="project__dashboard">
            <ProjectHeader />
            <ProjectMainBoard />
        </div>
    )
}
export default isRenderChatRoom(ProjectDarboard)