import { useState, useContext, useEffect } from 'react';
import "./updateproject.scss"
import { Drawer, Button, Space, Avatar, Select } from 'antd';
import { ProjectContext } from '../../../../context/ProjectProvider';
import { PlusOutlined, CloseOutlined } from "@ant-design/icons"
import { AuthContext } from '../../../../context/AuthProvider';
import { MemberContext } from '../../../../context/MemberProvider'
import { VisibleContext } from '../../../../context/VisibleProvider';
import { updateDocument } from '../../../../firebase/services'
import _ from "lodash";
const { Option } = Select;
export default function UpdateProject({ updateProjectVisible, setUpdateProjectVisible }) {
    const { selectedProject, memberProjects } = useContext(ProjectContext)
    const { userCurrent: { id }, userCurrent } = useContext(AuthContext)
    const { setIsPreviewUserVisible,
        setIdUserPreview, setIsProfileVisible } = useContext(VisibleContext)
    const [member, setMember] = useState([])
    const { friendsList } = useContext(MemberContext)

    const [name, setName] = useState("")
    const [des, setDescription] = useState("")
    const [isAddMember, setIsAddMember] = useState(false)
    const onClose = () => {
        setUpdateProjectVisible(false)
    }
    useEffect(() => {
        setName(selectedProject.name)
        setDescription(selectedProject.description)
        const isUser = { ...userCurrent }
        if (selectedProject.admin.includes(userCurrent.uid)) {
            isUser.role = "admin"
        } else {
            isUser.role = "member"
        }

        const newMember = friendsList.map(item => {
            if (selectedProject.allmember.includes(item.uid)) {
                if (selectedProject.admin.includes(item.uid)) {
                    return {
                        ...item,
                        role: 'admin'
                    }
                } else {
                    return {
                        ...item,
                        role: 'member'
                    }
                }

            } else {
                return {
                    ...item,
                    role: 'unmember'
                }
            }
        }
        )
        newMember.unshift(isUser)
        setMember(newMember)
        return () => {
            setDescription('')
            setName('')

        }
    }, [updateProjectVisible])
    const handlePreviesUser = (id1) => {

        if (id1 === id) {
            setIsProfileVisible(true)


        } else {
            setIdUserPreview(id1)
            setIsPreviewUserVisible(true)
        }
    }
    const handleAddMember = (item, index) => {
        const newData = [...member]
        newData[index].role = 'member'
        setMember(newData)

    }
    const handleSelectMember = (value) => {
        const Data = value.split(" ")

        const newMember = [...member]
        newMember[Data[2]].role = Data[1]
        setMember(newMember)
    }
    const handleUpdate = () => {
        if (name !== '') {
            const allmember = member.filter(item => item.role !== 'unmember').map(item2 => item2.uid)
            const admin = member.filter(item => item.role === 'admin').map(item2 => item2.uid)
            const member1 = member.filter(item => item.role === 'member').map(item2 => item2.uid)
            const data = {
                admin,
                member: member1,
                allmember,
                name,
                description: des
            }
            updateDocument('projects', selectedProject.id, data)
            setUpdateProjectVisible(false)

        }




    }
    return (
        <Drawer
            title="Cập nhât dự án" placement="top" onClose={onClose}
            visible={updateProjectVisible}
            height={700}
            extra={
                <Space>
                    <Button type="danger" onClick={onClose}>
                        Xóa dự án
                    </Button>
                    <Button onClick={handleUpdate} type="primary">
                        Cập nhật
                    </Button>
                </Space>
            }
            zIndex={999}
        >

            <div className="update__project">
                <div className="update__project-infor">
                    <input type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="update__project-infor">
                    <textarea type="text"
                        value={des}
                        onChange={(e) => setDescription(e.target.value)} >
                    </textarea>
                </div>
                <div className="update__project-member">
                    <span className="projectmember__header">
                        Thành viên của dự án:
                    </span>
                    <div className="projectmember__list">
                        {
                            member.map((item, index) =>
                                <div key={index} className="projectmember__list-item"
                                    onClick={() => handlePreviesUser(item.id)}
                                >
                                    <Avatar src={item.photoURL} size={40} >
                                        {item.photoURL ? '' : item.displayName?.charAt(0)?.toUpperCase()}
                                    </Avatar>
                                </div>
                            )
                        }

                        <div className="projectmember__list-item">
                            <div className="projectmember__list-add">
                                <span><PlusOutlined
                                    onClick={() => setIsAddMember(!isAddMember)}
                                /></span>
                            </div>
                        </div>
                    </div>
                    {
                        isAddMember &&
                        <div className="projectmember__listchoose">
                            {
                                member.map((item, index) =>
                                    <div key={index} className="listchoose-item">
                                        <div>
                                            <Avatar src={item.photoURL} size={40}
                                                style={{ marginRight: '10px' }}
                                            >
                                                {item?.photoURL ? '' : item.displayName?.charAt(0)?.toUpperCase()}
                                            </Avatar>
                                            <span>{item.displayName}</span>

                                        </div>
                                        {
                                            item.role !== "unmember"
                                                ? <>
                                                    <span className="listchoose-item-role">Đang thực hiện</span>
                                                    <Select
                                                        defaultValue={`${item.uid} ${item.role} ${index}`}
                                                        style={{ minWidth: 170, fontSize: "18px" }}
                                                        onChange={handleSelectMember}
                                                        disabled={item.id === id}
                                                    >
                                                        <Option value={`${item.uid} member ${index}`}>Thành viên</Option>
                                                        <Option value={`${item.uid} admin ${index}`}>Quản trị viên</Option>

                                                    </Select>
                                                </>
                                                : <PlusOutlined
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => handleAddMember(item, index)}
                                                />
                                        }


                                    </div>
                                )
                            }


                        </div>

                    }

                </div>
            </div>


        </Drawer>
    )
}
