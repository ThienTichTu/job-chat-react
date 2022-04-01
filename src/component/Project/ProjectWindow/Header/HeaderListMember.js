import { useContext } from 'react'
import { Avatar, Tooltip } from "antd"
import { ProjectContext } from '../../../../context/ProjectProvider'
import { VisibleContext } from '../../../../context/VisibleProvider'
import { AuthContext } from '../../../../context/AuthProvider'
export default function HeaderListMember() {
    const { memberProjects } = useContext(ProjectContext)
    const { setIsProfileVisible, setIsPreviewUserVisible, setIdUserPreview } = useContext(VisibleContext)
    const { userCurrent: { id } } = useContext(AuthContext)
    const handleSetpreviews = (userid) => {

        if (userid === id) {

            setIsProfileVisible(true)
        } else {
            setIsPreviewUserVisible(true)
            setIdUserPreview(userid)
        }

    }
    return (
        <div className="dashboard__header-listmembers">
            <Avatar.Group size={40} maxCount={10} maxPopoverPlacement="bottom">
                {memberProjects.map((memberProjects) => (
                    <Tooltip title={memberProjects.displayName} key={memberProjects.id} >
                        <Avatar src={memberProjects.photoURL} size={40}
                            onClick={() => handleSetpreviews(memberProjects.id)}
                        >
                            {memberProjects.photoURL ? '' : memberProjects.displayName?.charAt(0)?.toUpperCase()}

                        </Avatar>
                    </Tooltip>
                ))}
            </Avatar.Group>
        </div>
    )
}
