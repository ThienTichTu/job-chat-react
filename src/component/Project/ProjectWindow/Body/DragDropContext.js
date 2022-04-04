import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import Task from "./Task"
import AddTask from "./AddTask"
import { Menu, Dropdown, Modal } from 'antd';
import { EllipsisOutlined, ExclamationCircleOutlined } from "@ant-design/icons"
import { updateDocument, deleteDocument } from "../../../../firebase/services"
import UpdateProcess from "./UpdateProcess"
import _ from "lodash"
const { confirm } = Modal;
export default function DragDropContextDashboard({ handlePropEnd, projects, setProjects, selectedProject }) {
    const [updateProcessVisible, setUpdateProcessVisible] = useState(false)
    const [addTaskVisible, setAddTaskVisible] = useState(false)
    const [dataProcessUpdate, setDataProcessUpdate] = useState({})
    const handleRemove = (id, pid) => {
        confirm({
            title: 'Bạn có chắc chắn muốn xóa tiến trình này không ?',
            icon: <ExclamationCircleOutlined />,
            content: 'Chọn Ok để xóa hoặc chọn Cancel để hủy',
            onOk() {
                const newProjects = { ...projects }
                delete newProjects[id]
                setProjects(newProjects)
                deleteDocument('process', id)
                const newProcess = selectedProject.process.filter(item => item !== pid)
                updateDocument("projects", selectedProject.id, {
                    process: newProcess
                })

            },
            width: 500
        });
    }

    return (
        <>
            <UpdateProcess
                updateProcessVisible={updateProcessVisible}
                setUpdateProcessVisible={setUpdateProcessVisible}
                data={dataProcessUpdate}

            />
            <AddTask
                addTaskVisible={addTaskVisible}
                setAddTaskVisible={setAddTaskVisible}
                data={dataProcessUpdate}
            />
            <DragDropContext onDragEnd={result => handlePropEnd(result, projects, setProjects)}>
                {_.map(projects, (data, key) => {
                    return (
                        <div key={key} className={"column"}>
                            <div className="column-title">
                                <span>
                                    {data.name}
                                </span>
                                <div className="column-title-icon">
                                    <Dropdown trigger="click" overlay={
                                        <Menu style={{ width: "200px" }}>
                                            <Menu.Item key={`1`}
                                                onClick={() => {
                                                    setDataProcessUpdate(data)
                                                    setAddTaskVisible(true)
                                                }}
                                            >
                                                <span>
                                                    Thêm công việc
                                                </span>
                                            </Menu.Item>
                                            <Menu.Item key={`2`}
                                                onClick={() => {
                                                    setDataProcessUpdate(data)
                                                    setUpdateProcessVisible(true)
                                                }}
                                            >
                                                <span style={{ color: "green" }}  >
                                                    Cập nhật tiến trình
                                                </span>
                                            </Menu.Item>
                                            <Menu.Item key={`3`}
                                                onClick={() => handleRemove(key, data.pid)}
                                            >
                                                <span style={{ color: "red" }}
                                                >
                                                    Xóa tiến trình
                                                </span>
                                            </Menu.Item>


                                        </Menu>
                                    }>
                                        <EllipsisOutlined />
                                    </Dropdown>

                                </div>
                            </div>
                            <Droppable droppableId={key}>
                                {
                                    (provided) => {
                                        return (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                                className={"droppable-col"}
                                            >
                                                {
                                                    data.tasks.map((item, index) => {

                                                        return (
                                                            <Draggable key={item?.tid && item.tid} index={index} draggableId={item?.tid && item.tid}>
                                                                {(provided, snapshot) => {
                                                                    return (
                                                                        <div
                                                                            ref={provided.innerRef}
                                                                            {...provided.dragHandleProps}
                                                                            {...provided.draggableProps}
                                                                            className="task"
                                                                        >
                                                                            <Task
                                                                                data={item}

                                                                            />
                                                                        </div>
                                                                    )
                                                                }}
                                                            </Draggable>
                                                        )
                                                    })
                                                }
                                                {provided.placeholder}

                                            </div>
                                        )
                                    }
                                }
                            </Droppable>
                        </div>
                    )
                })}
            </DragDropContext>
        </>
    )
}
