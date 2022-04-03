import "./taskupdate.scss"
import { useContext, useEffect, useState, useCallback } from 'react'
import { VisibleContext } from "../../context/VisibleProvider"
import { ProjectContext } from "../../context/ProjectProvider";
import { PlusOutlined } from "@ant-design/icons"
import { Drawer, Button, Space, DatePicker, message, Input, Avatar, Modal } from 'antd';
import { deleteDocument, updateDocument, FieldValue } from "../../firebase/services"
import UploadFile from "./UploadFile";
import { RoomChatContext } from "../../context/RoomChatProvider"
import { ExclamationCircleOutlined, SwapRightOutlined } from "@ant-design/icons"
import moment from 'moment';
import UpdateMember from "./UpdateMember"
import ChecklistFile from "./ChecklistFile"
const { TextArea } = Input;
const { confirm } = Modal;
const dateFormat = 'DD/MM/YYYY';
const { RangePicker } = DatePicker;
export default function Taskupdate() {
    const { isTasKUpdate, setIsTasKUpdate, setIsTasKChat } = useContext(VisibleContext)
    const { setRoomId } = useContext(RoomChatContext)
    const [dealine, setDealine] = useState(['', ''])
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
        if (task.dealine && task.dealine.length > 0) {
            setDealine(task.dealine)
        } else {
            setDealine(['', ''])
        }

        return () => {
            setDealine(['', ''])
            setMaker([])
            setData({})
            setCheckList([])
            setFile([])
        }
    }, [isTasKUpdate, task])
    const onClose = () => {
        setIsTasKUpdate(false)
        setRoomId("")
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
            if (newchecklist[item].state === "checked") {
                newchecklist[item].state = "unchecked"
            } else {
                newchecklist[item].state = "checked"
            }
            setCheckList(newchecklist)
            return
        }

    }, [checklist, task])

    const handleChangeTime = (e, str) => {
        setDealine(str)

    }

    const handleUpdateTasks = () => {
        if (data.name === "") {
            message.warning("Tên công việc không được để trống...")
            return
        }
        const a = maker.map(item => item.uid)
        const b = dealine[0] && dealine[0] === "" ? [] : dealine
        data.filedata = file
        data.dealine = b
        data.maker = a
        data.checklistArray = checklist
        updateDocument('tasks', data.id, data)
        message.success("Cập nhật thành công...")
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
                    <Button type="primary" ghost onClick={() => setIsTasKChat(true)}  > Tin nhắn </Button>
                    <Button danger onClick={hanldeDelete}> Xóa công việc</Button>
                    <Button type="dashed" danger onClick={() => setUploadFileVisible(true)}> File đính kèm</Button>
                    <Button type="primary" onClick={handleUpdateTasks}> Cập nhật</Button>
                </Space>
            }
        >
            <div className="task__update">
                <Input
                    value={data.name}
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
                <div className="task__update-deadline">
                    <span>Thời hạn: </span>
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
                    {
                        dealine && dealine[0] &&
                        <div className="task-dealine-show">
                            <span>{dealine[0]}</span>
                            <SwapRightOutlined />
                            <span
                                style={{ color: "red" }}
                            >{dealine[1]}</span>
                        </div>
                    }
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
