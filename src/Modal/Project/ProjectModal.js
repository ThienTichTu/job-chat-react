import "./projectModal.scss"
import { useContext, useState, useEffect } from 'react'
import { Modal, Button, Steps, message } from 'antd';
import { VisibleContext } from "../../context/VisibleProvider"
import { AuthContext } from "../../context/AuthProvider"
import ProjectModalName from "./ProjectModalName"
import SelectFriend from "../ChatGroupModal/SelectFriend";
import ProjectModalDescription from "./ProjectModalDescription"
import ProjectModal_list from "./ProjectModal_list"
import { MemberContext } from "../../context/MemberProvider";
import { addDocument, getTime } from "../../firebase/services"
import _ from "lodash"
import RamdomBackground from "../../asset/backgroud"
import { OrderedListOutlined, SolutionOutlined, CheckCircleOutlined } from '@ant-design/icons';
const { Step } = Steps;
const key = 'updatable';

export default function ProjectModal() {
    const { friendsList } = useContext(MemberContext)
    const { userCurrent: { uid, photoURL, displayName } } = useContext(AuthContext)
    const [selectedItems, setSelectedItems] = useState([])

    const [name, setName] = useState("")

    const [description, setDescription] = useState("")

    const [members, setMember] = useState([])



    const [steps, setSteps] = useState("create")

    const { isProjectModal,
        setIsProjectModal } = useContext(VisibleContext)

    useEffect(() => {
        return () => {
            setMember([])
            setDescription("")
            setName("")
            setSelectedItems([])
            setSteps("create")
        }
    }, [isProjectModal])

    const handleOk = () => {
        message.loading({ content: 'Đang tạo dự án...', key });
        const admin = _.filter(members, (member) => member.role === "admin").map(member => member.uid)
        const member = _.filter(members, (member) => member.role === "member").map(member => member.uid)
        const allmember = _.concat(admin, member)
        const data = {
            name,
            description,
            admin,
            member,
            allmember,
            process: [],
            tasks: [],
            time: getTime(),
            background: RamdomBackground()
        }
        addDocument("projects", data)
        message.success({ content: 'Đã tạo dự án thành công!', key, duration: 2 });
        setIsProjectModal(false)

    }

    const handleCancel = () => {
        setIsProjectModal(false)
    }


    const handleChange = (selectedItems) => {
        setSelectedItems(selectedItems)
    }

    const ChangeMember = (value) => {
        const Data = value.split(" ")

        const newMember = [...members]
        newMember[Data[2]].role = Data[1]

    }

    useEffect(() => {
        if (name !== "" && description !== "" && selectedItems.length > 0) {
            setSteps("role")
        }
        if (name === "" || description === "" || selectedItems.length === 0) {
            setSteps("create")

        }
    }, [name, description, selectedItems])

    useEffect(() => {
        if (steps === "role") {
            const MemberList = _.filter(friendsList, o => selectedItems.includes(o.uid))
            const newMemberList = MemberList.map(item => ({
                ...item,
                role: 'member'
            }))
            newMemberList.unshift({ uid, photoURL, displayName, role: "admin" })
            setMember(newMemberList)
        }
    }, [steps, selectedItems])

    return (
        <Modal
            title={
                <Steps style={{ width: "90%" }}>
                    <Step status={steps === "create" ? "process" : "done"} title="Thông tin" icon={<OrderedListOutlined />} />
                    <Step status={steps === "role" ? "process" : "wait"} title="Phân quyền" icon={<SolutionOutlined />} />
                    <Step status="wait" title="Hoàn thành" icon={<CheckCircleOutlined />} />

                </Steps>
            }
            visible={isProjectModal}
            onOk={handleOk}
            onCancel={handleCancel}
            width={700}
            footer={null}
        >

            <ProjectModalName
                name={name}
                setName={setName}
            />
            <ProjectModalDescription
                description={description}
                setDescription={setDescription}
            />
            <div className="project__modal-select ">
                <SelectFriend
                    title="Thêm Thành viên vào project"
                    selectedItems={selectedItems}
                    handleChange={handleChange}
                />
            </div>


            {steps === "role" &&
                <ProjectModal_list
                    members={members}
                    ChangeMember={ChangeMember}
                />

            }

            <div className="project__modal-button">
                {
                    steps === "create"
                        ? <Button disabled type="primary"> Tạo dự án </Button>
                        : <Button type="primary"
                            onClick={handleOk}
                        > Tạo dự án </Button>
                }

            </div>
            <img src="../../../" alt="" />
        </Modal>
    )
}
