import { useEffect, useContext, useState } from 'react'
import "./myjob.scss"
import { Menu, Switch, Avatar } from 'antd';
import { OrderedListOutlined } from '@ant-design/icons';
import { ProjectContext } from "../../context/ProjectProvider"
import { RoomChatContext } from "../../context/RoomChatProvider"
import { VisibleContext } from "../../context/VisibleProvider"
import _ from "lodash";
const { SubMenu } = Menu;
export default function Myjob() {
    const { projects, TasksAll, memberProjects, setTask } = useContext(ProjectContext)
    const { roomListTask, setRoomId } = useContext(RoomChatContext)
    const { setIsTasKUpdate } = useContext(VisibleContext)

    const [dataSource, setDataSource] = useState([])
    const [defaultOpen, setDefault] = useState([])
    const handleClick = e => {
        console.log('click ', e);
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
        const { id } = _.find(roomListTask, (item) => item.taskid === data.tid)
        setRoomId(id)
        setTask(data)
        setIsTasKUpdate(true)
    }

    useEffect(() => {
        const data = projects.map((project, index) => {
            const newtasks = TasksAll.filter((task) => task.project === project.id)
            const maker = newtasks.map((task) => {
                const a = task.maker.map(i => {
                    return _.find(memberProjects, o => o.uid === i)
                })
                return {
                    ...task,
                    maker: a
                }
            })
            return {
                ...project,
                tasks: maker,
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
                defaultOpenKeys={['sub0', 'sub1', 'sub2', 'sub3']}
                mode="inline"
                theme={theme}
            >
                {
                    dataSource.map((item) =>

                        <SubMenu key={item.key} icon={<Avatar src={item.background}
                            className="myjob-projectIcon" size={30} >T</Avatar>}
                            title={item.name}>

                            {
                                item.tasks.map((data) =>
                                    <Menu.Item danger={data.dealine.length !== 0 && data.dealine[0] !== ''} key={data.id}>
                                        <span onClick={() => handleCallTask(data)}>
                                            {data.name}
                                        </span>
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
