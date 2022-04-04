import { useContext, useEffect, useState } from 'react'
import { ProjectContext } from '../../../../context/ProjectProvider'
import { EllipsisOutlined, NodeCollapseOutlined } from "@ant-design/icons"
import { Avatar, Timeline } from "antd"
import { VisibleContext } from '../../../../context/VisibleProvider'
import { RoomChatContext } from "../../../../context/RoomChatProvider"

import _ from "lodash"
export default function Task({ data, index }) {
    const { setIsTasKUpdate } = useContext(VisibleContext)
    const { roomListTask, setRoomId } = useContext(RoomChatContext)

    const { setTask } = useContext(ProjectContext)

    const [maker, setMaker] = useState([])

    const { memberProjects } = useContext(ProjectContext)
    const [isShowlist, setIsShowlist] = useState(false)
    useEffect(() => {
        if (data) {
            const newMaker = data.maker.map(item => {
                return _.filter(memberProjects, o => o.uid === item)
            })
            const a = _.reduce(newMaker, function (obj, param) {
                obj.push(...param)
                return obj;
            }, []);
            setMaker(a)
        }
    }, [data, memberProjects])

    const handleCallTask = () => {
        const { id } = _.find(roomListTask, (item) => item.taskid === data.tid)
        setRoomId(id)
        setTask({ ...data, maker: maker })
        setIsTasKUpdate(true)
    }

    return (
        <>

            {
                data
                &&
                <>
                    <div className="task-header">
                        <span
                            style={{ cursor: "pointer" }}
                            onClick={handleCallTask}
                        >{data.name}</span>
                    </div>
                    <div className="task-body">
                        <div className={`task-body-make`}>
                            {
                                maker.length !== 0
                                &&
                                maker.map((item, index) => (
                                    <div key={index} style={{ marginRight: "10px", cursor: "pointer" }}
                                    >
                                        <Avatar src={item.photoURL} size={30} >
                                            {item.photoURL ? '' : item.displayName?.charAt(0)?.toUpperCase()}
                                        </Avatar>
                                    </div>
                                ))
                            }

                        </div>
                        <div className="task-body-dealine">
                            <span>
                                {
                                    data.dealine.length > 0 && data.dealine[0] !== '' && <span>{`Dealine ${data.dealine[1]}`}</span>
                                }
                            </span>
                            <div style={{ color: "green", cursor: "pointer" }}
                                onClick={() => setIsShowlist(!isShowlist)}
                            >
                                <NodeCollapseOutlined />
                            </div>
                        </div>

                    </div>
                    {
                        isShowlist &&
                        <div className="task-body-checklist">
                            <Timeline>
                                {
                                    data.checklistArray.map((item, index) => (
                                        <div key={index}>
                                            <Timeline.Item>{item.content}</Timeline.Item>
                                        </div>
                                    ))
                                }


                            </Timeline>
                        </div>
                    }

                </>
            }


        </>

    )
}
