import { useEffect, useContext, useState } from 'react'
import "./myjob.scss"
import { Menu, Switch, Avatar } from 'antd';
import { OrderedListOutlined } from '@ant-design/icons';
import { ProjectContext } from "../../context/ProjectProvider"
import { RoomChatContext } from "../../context/RoomChatProvider"
import { VisibleContext } from "../../context/VisibleProvider"
import JobItem from "./JobItem"
import _ from "lodash";
import CheckableTag from 'antd/lib/tag/CheckableTag';
const { SubMenu } = Menu;
export default function Myjob() {
    const { projects, TasksAll, memberProjects, setTask, setProjectId } = useContext(ProjectContext)
    const { roomListTask, setRoomId } = useContext(RoomChatContext)
    const { setIsTasKUpdate } = useContext(VisibleContext)
    const [data, setData] = useState()
    const [dataSource, setDataSource] = useState([])
    const [defaultOpen, setDefault] = useState([])
    const handleClick = e => {

    };
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light'
    })
    const handleSetTheme = (checked, event) => {
        if (checked) {
            localStorage.setItem('theme', 'dark')
            setTheme('dark')
        } else {
            localStorage.setItem('theme', 'light')
            setTheme('light')

        }
    }

    const handleCallTask = (data) => {
        setProjectId(data.project)
        setData(data)
    }
    useEffect(() => {
        if (data) {
            const { id } = _.find(roomListTask, (item) => item.taskid === data.tid)
            const newData = { ...data }
            const maker1 = data.maker.map((user) => _.find(memberProjects, o => o.uid === user))
            newData.maker = maker1
            setRoomId(id)
            setTask(newData)
            setIsTasKUpdate(true)
        }
        return () => {
            setData(false)
        }
    }, [memberProjects, data])

    useEffect(() => {

        const data = projects.map((project, index) => {
            const newtasks = TasksAll.filter((task) => task.project === project.id)

            return {
                ...project,
                tasks: newtasks,
                key: `sub${index}`
            }
        })
        const d = data.map(item => item.key)
        setDefault(d)
        setDataSource(data)
    }, [projects, TasksAll, memberProjects])



    return (
        <div style={{ width: "100%", height: "calc(100% - 76px)", overflowY: "auto", overflowX: "hidden" }}>
            <div style={{ margin: "10px 15px", width: "100%", textAlign: "start" }}>
                <Switch onClick={handleSetTheme}
                    style={{ width: "100px" }}
                    checkedChildren="Tối" unCheckedChildren="Sáng" defaultChecked={localStorage.getItem('theme') === 'dark'} />

            </div>
            <Menu
                onClick={handleClick}
                style={{ width: "100%", fontSize: "20px" }}
                defaultSelectedKeys={['1']}
                mode="inline"
                theme={theme}
            >
                {
                    dataSource.map((item) =>

                        <SubMenu key={item.key} icon={<Avatar src={item.background}
                            className="myjob-projectIcon" size={30} >T</Avatar>}
                            title={item.name}
                        >

                            {
                                item.tasks.map((data) =>
                                    <Menu.Item danger={data.dealine.length !== 0 && data.dealine[0] !== ''} key={data.id}>
                                        <JobItem
                                            data={data}
                                            handleCallTask={handleCallTask}
                                        />
                                    </Menu.Item>
                                )
                            }

                        </SubMenu>
                    )
                }
            </Menu>
        </div>
    )
}
