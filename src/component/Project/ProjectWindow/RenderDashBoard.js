import { Link } from "react-router-dom"
import { useContext, useEffect } from 'react'
import { Alert } from 'antd';
import { ProjectContext } from '../../../context/ProjectProvider';
import Marquee from 'react-fast-marquee';
import { useParams } from "react-router-dom"

export const isRenderChatRoom = WrappedComponent => props => {
    const { id } = useParams()
    const { selectedProject, projectId, setProjectId } = useContext(ProjectContext)
    useEffect(() => {
        if (id && !projectId) {
            setProjectId(id)
        }

    }, [id])
    return (
        <>
            {
                selectedProject
                    ?
                    <WrappedComponent
                        {...props}
                    />
                    : <Alert
                        banner
                        message={
                            <Marquee pauseOnHover gradient={false}>
                                <span style={{ marginRight: "10px" }}>
                                    Dự án bạn chọn không tồn tại hãy quay lại
                                </span>
                                <Link to="/">  Trang chủ !!</Link>
                            </Marquee>
                        }
                    />

            }
        </>

    );
};
