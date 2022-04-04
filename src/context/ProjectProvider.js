import { createContext, useContext, useState, useMemo, useEffect } from 'react'
import { AuthContext } from "./AuthProvider"
import useFireStore from "../hook/useFireStore"
import _ from "lodash"
import { db } from "../firebase/config"
export const ProjectContext = createContext()

export default function ProjectProvider({ children }) {
    const { userCurrent: { uid } } = useContext(AuthContext)

    const [projectId, setProjectId] = useState("")

    const [task, setTask] = useState({})
    const [processOBJ, setProcessOBJ] = useState({})
    const ProjectCondition = useMemo(() => {
        return {
            fieldName: 'allmember',
            operator: 'array-contains',
            compareValue: uid,
        }
    }, [uid])

    const projects = useFireStore('projects', ProjectCondition)

    const selectedProject = useMemo(() => {
        const projectSelect = _.find(projects, project => project.id === projectId)

        return projectSelect

    }, [projects, projectId])

    const memberProjectCondition = useMemo(() => {
        const value = selectedProject?.allmember ? selectedProject.allmember : []
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: value,
        };
    }, [selectedProject, projectId])

    const ProcessCondition = useMemo(() => {
        const value = selectedProject?.process ? selectedProject.process : []
        return {
            fieldName: 'pid',
            operator: 'in',
            compareValue: value,
        };
    }, [selectedProject, projectId, projects])


    const TaskCondition = useMemo(() => {
        return {
            fieldName: 'project',
            operator: '==',
            compareValue: projectId,
        };
    }, [selectedProject, projectId, projects])

    const tasks = useFireStore('tasks', TaskCondition)

    const process = useFireStore('process', ProcessCondition)

    const memberProjects = useFireStore('users', memberProjectCondition)

    const TaskAllCondition = useMemo(() => {
        return {
            fieldName: 'allmember',
            operator: 'array-contains',
            compareValue: uid,
        };
    }, [uid])

    const TasksAll = useFireStore('tasks', TaskAllCondition)

    useEffect(() => {
        const process2 = process.map(item => {
            const a = item.tasks.map(e => {
                const b = _.find(tasks, o => o.tid === e)
                return b
            })
            return {
                ...item,
                tasks: a
            }
        })
        const process1 = _.reduce(process2, function (obj, param) {
            obj[param.id] = { ...param }
            return obj;
        }, {});

        setProcessOBJ(process1)

    }, [selectedProject, process, tasks])

    return (
        <ProjectContext.Provider value={{
            projects,
            setProjectId,
            selectedProject,
            projectId,
            memberProjects,
            process,
            processOBJ,
            task, setTask,
            TasksAll
        }}>
            {children}
        </ProjectContext.Provider>
    )
}
