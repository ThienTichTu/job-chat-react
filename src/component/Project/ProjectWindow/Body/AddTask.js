import { useState, useContext, useEffect, useCallback } from 'react'
import { Drawer, Button, Space, List, message } from 'antd';
import { Input, DatePicker } from 'antd';
import { ProjectContext } from "../../../../context/ProjectProvider"
import { v4 } from "uuid";
import SelectedUser from "../Service/SelectedUser"
import { PlusOutlined, CheckOutlined, CheckCircleFilled } from "@ant-design/icons"
import { getTime, addDocument, updateDocument, FieldValue } from "../../../../firebase/services"
import AddTaskUploadFile from "./AddTaskUploadFile"

const dateFormat = 'DD/MM/YYYY';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const key = 'updatable';
export default function AddTask({ addTaskVisible, setAddTaskVisible, data }) {
    const { selectedProject } = useContext(ProjectContext)

    const [name, setName] = useState("")

    const [description, setDescription] = useState("")

    const [checklistValue, setChecklistValue] = useState("")

    const [checklistArray, setCheckListArray] = useState([])

    const [uploadfileVisible, setUploadfileVisible] = useState(false)

    const [dealine, setDealine] = useState([])

    const [maker, setMaker] = useState([])

    const [filedata, setFileData] = useState([])
    useEffect(() => {
        return () => {
            setName("")
            setDescription("")
            setChecklistValue("")
            setCheckListArray([])
            setFileData([])
        }
    }, [addTaskVisible])

    const onClose = () => {
        setAddTaskVisible(false)
    }

    const handleAddTask = async () => {
        if (name === "") {
            message.warning("Tên công việc không được để trống!!")
            return
        }
        message.loading({ content: 'đang tạo công việc...', key });
        const task = {
            name,
            description,
            maker,
            checklistArray,
            filedata,
            dealine,
            time: getTime(),
            process: data.id,
            project: selectedProject.id,
            tid: v4()
        }
        addDocument('tasks', task)
        updateDocument('process', data.id, {
            tasks: FieldValue.arrayUnion(task.tid)
        })
        updateDocument('projects', selectedProject.id, {
            tasks: FieldValue.arrayUnion(task.tid)
        })
        message.success({ content: 'Tạo công việc thành công!', key, duration: 2 });
        addDocument('rooms', {
            type: 'taskchat',
            members: [...selectedProject.allmember],
            data: [],
            taskid: task.tid
        })

        setAddTaskVisible(false)


    }

    const handleChangeSelectUser = (e) => {
        setMaker(e)
    }

    const handleChangeTime = (e, str) => {
        setDealine(str)

    }

    const setFileCallBack = useCallback((data) => {
        if (data.length !== 0) {
            setFileData(data)
            return
        }
    }, [addTaskVisible])
    return (
        <Drawer
            title="Thêm công việc"
            placement="right"
            size="large"
            onClose={onClose}
            visible={addTaskVisible}
            extra={
                <Space>

                </Space>
            }
        >
            <div className="addtask">
                <span className="addtask-title">{`Dự án : ${selectedProject.name}`}</span>
                <span className="addtask-title mb-20 ">{`Tên tiến trình : ${data.name}`}</span>
                <Input

                    placeholder="Tên công việc" value={name} allowClear onChange={(e) => setName(e.target.value)}
                    size="large" style={{ marginBottom: "15px" }}
                />
                <TextArea placeholder="Mô tả công việc"
                    value={description} allowClear
                    onChange={(e) => setDescription(e.target.value)}
                    size="large"
                />
                <span className="addtask-title2 mb-20 ">Người thực hiện:</span>
                <SelectedUser
                    handleChange={handleChangeSelectUser}
                    addTaskVisible={addTaskVisible}
                />
                <span className="addtask-title2 mb-20 ">Thời hạn:</span>
                <RangePicker
                    dateRender={current => {
                        const style = {};
                        if (current.date() === 1) {
                            style.border = '1px solid #1890ff';
                            style.borderRadius = '50%';
                        }
                        return (
                            <div className="ant-picker-cell-inner" style={style}>
                                {current.date()}
                            </div>
                        );
                    }}
                    onChange={(e, str) => handleChangeTime(e, str)}
                    format={dateFormat}
                />
                <span className="addtask-title2 ">Liệt kê các công việc cần phải làm:</span>
                <div style={{ display: 'flex', width: "100%" }}>
                    <Input

                        placeholder="Tên công việc" value={checklistValue} allowClear onChange={(e) => setChecklistValue(e.target.value)}
                        size="large"
                    />
                    <div className="checkList_icon"
                        onClick={() => {
                            const item = {
                                content: checklistValue,
                                state: "unchecked",
                            }
                            setCheckListArray([...checklistArray, item])
                            setChecklistValue("")
                        }}
                    >
                        <PlusOutlined />
                    </div>
                </div>
                <div className="addtask-checklist">
                    <List
                        itemLayout="horizontal"
                        dataSource={checklistArray}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={item.state === "checked"
                                        ? <CheckOutlined style={{ marginLeft: "10px" }} />
                                        : <CheckCircleFilled style={{ marginLeft: "10px", color: "green" }} />}
                                    title={
                                        <span >
                                            {item.content}
                                        </span>
                                    }
                                // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                />
                            </List.Item>
                        )}
                    />
                </div>
                <Button
                    danger type="dashed" style={{ marginTop: "20px", width: "100%", fontSize: "18px", height: "40px" }}
                    onClick={() => setUploadfileVisible(true)}
                >

                    Thêm file đính kèm
                </Button>
                <Button type="primary" onClick={handleAddTask} style={{ marginTop: "10px", width: "100%", height: "50px", fontSize: "20px", fontWeight: "bold" }}>
                    Tạo công việc
                </Button>
            </div>
            <AddTaskUploadFile
                uploadfileVisible={uploadfileVisible}
                setUploadfileVisible={setUploadfileVisible}
                setFileCallBack={setFileCallBack}
            />

        </Drawer>
    )
}
