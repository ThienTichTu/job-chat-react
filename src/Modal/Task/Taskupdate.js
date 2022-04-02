import "./taskupdate.scss"
import { useContext, useEffect, useState, useCallback } from 'react'
import { VisibleContext } from "../../context/VisibleProvider"
import { ProjectContext } from "../../context/ProjectProvider";
import { PlusOutlined } from "@ant-design/icons"
import { Drawer, Button, Space, Timeline, message, Input, Avatar, Modal } from 'antd';
import { deleteDocument, updateDocument, FieldValue } from "../../firebase/services"
import UploadFile from "./UploadFile";
import { openNotification } from "./service"
import { ExclamationCircleOutlined } from "@ant-design/icons"

import UpdateMember from "./UpdateMember"
import ChecklistFile from "./ChecklistFile"
const { TextArea } = Input;
const { confirm } = Modal;

export default function Taskupdate() {
    const { isTasKUpdate, setIsTasKUpdate } = useContext(VisibleContext)

    const [updateMemberVisible, setUpdateMemberVisible] = useState(false)
    const [uploadFileVisible, setUploadFileVisible] = useState(false)
    const [checklist, setCheckList] = useState([])
    const { task } = useContext(ProjectContext)
    const [file, setFile] = useState([])

    const [data, setData] = useState({})
    const [maker, setMaker] = useState([])

    useEffect(() => {
        setMaker(task.maker)
        setData(task)
        setFile(task.filedata)
        setCheckList(task.checklistArray)
        return () => {
            setMaker([])
            setData({})
            setCheckList([])
            setFile([])
        }
    }, [isTasKUpdate, task])
    const onClose = () => {
        setIsTasKUpdate(false)

    }


    const hanldeDelete = async () => {
        confirm({
            title: 'Bạn có chắc chắn muốn xóa tiến trình này không ?',
            icon: <ExclamationCircleOutlined />,
            content: 'Chọn Ok để xóa hoặc chọn Cancel để hủy',
            onOk() {
                deleteDocument("tasks", task.id)
                updateDocument("process", task.process, {
                    tasks: FieldValue.arrayRemove(task.tid)
                })
                updateDocument("projects", task.project, {
                    tasks: FieldValue.arrayRemove(task.tid)
                })
                setIsTasKUpdate(false)

            },
            width: 500
        });

    }

    const setFileCallBack = useCallback((data) => {
        if (data.length !== 0) {
            setFile(data)
            return
        }
    }, [isTasKUpdate])


    const updateMaker = useCallback((e, option) => {
        if (option === "remove") {
            const newMaker = [...maker]
            newMaker.splice(e, 1)
            setMaker(newMaker)
        } else {
            setMaker([...maker, e])
        }

    }, [isTasKUpdate, task, maker])
    const updateCheckList = useCallback((item, option) => {
        if (option === "add") {
            setCheckList([...checklist, item])
            return
        }
        if (option === "delete") {
            const newchecklist = [...checklist]

            newchecklist.splice(item, 1)


            setCheckList(newchecklist)
            return
        }
        if (option === "check") {
            const newchecklist = [...checklist]
            newchecklist[item].state = "checked"
            setCheckList(newchecklist)
            return
        }

    }, [checklist, task])

    const handleUpdateTasks = () => {
        console.log(file)
    }

    return (

        <Drawer
            title="Chi tiết công việc"
            placement="right"
            size="large"
            onClose={onClose}
            visible={isTasKUpdate}
            extra={
                <Space>
                    <Button danger onClick={hanldeDelete}> Xóa công việc</Button>
                    <Button type="dashed" danger onClick={() => setUploadFileVisible(true)}> File đính kèm</Button>
                    <Button type="primary" onClick={handleUpdateTasks}> Cập nhật</Button>
                </Space>
            }
        >
            <div className="task__update">
                <Input value={data.name}
                    placeholder="Tên công việc"
                    size="large"
                    allowClear onChange={(e) => setData({ ...data, name: e.target.value })} />
                <TextArea
                    placeholder="Mô tả công việc"
                    value={data.description}
                    allowClear onChange={e => setData({ ...data, description: e.target.value })}
                    size="large"
                    style={{ marginTop: "20px" }}
                />
                <div className="task__update-maker">
                    <span style={{ marginRight: "10px" }}>Người thực hiện : </span>
                    {
                        maker &&
                        maker.map((item, index) =>

                            <div key={index} className="avatar-item">
                                <Avatar src={item.photoURL} size={40}>
                                    {item.photoURL ? '' : item.displayName?.charAt(0)?.toUpperCase()}
                                </Avatar>
                            </div>
                        )
                    }
                    <div className="update-maker-add"
                        onClick={() => setUpdateMemberVisible(true)}
                    >
                        <PlusOutlined />
                    </div>
                </div>
                <ChecklistFile
                    data={checklist}
                    handleCheck={updateCheckList}
                />

            </div>
            <UpdateMember
                updateMemberVisible={updateMemberVisible}
                setUpdateMemberVisible={setUpdateMemberVisible}
                maker={maker}
                updateMaker={updateMaker}
            />
            <UploadFile
                uploadFileVisible={uploadFileVisible}
                setUploadFileVisible={setUploadFileVisible}
                file={file}
                setFileCallBack={setFileCallBack}
            />

        </Drawer>



    )
}
