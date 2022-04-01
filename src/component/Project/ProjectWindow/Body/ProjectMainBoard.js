import { useState, useContext, useEffect } from 'react'
import AddProcess from "./AddProcess"
import _ from "lodash"
import { v4 } from "uuid";
import DragDropContextDashboard from "./DragDropContext"
import { ProjectContext } from "../../../../context/ProjectProvider"
import { updateDocument, FieldValue } from '../../../../firebase/services';
const item = {
    id: v4(),
    name: "Clean the house"
}

const item2 = {
    id: v4(),
    name: "Wash the car"
}

export default function ProjectMainBoard() {
    const [addprocessVisible, setAddprocessVisible] = useState(false)
    const { processOBJ, selectedProject } = useContext(ProjectContext)
    const [projectData, setProjectData] = useState({})
    const [projectCurent, setProjectCurent] = useState({})
    useEffect(() => {
        setProjectData(processOBJ)
        setProjectCurent(selectedProject)
    }, [processOBJ])

    const handlePropEnd = (data, projects, setProjects) => {
        const { source, destination } = data;
        if (!destination) {
            return
        }
        if (source.droppableId !== destination.droppableId) {
            const column = projects[destination.droppableId]
            const coppieitem = column.tasks
            const columnSource = projects[source.droppableId]
            const coppiesItemSource = columnSource.tasks
            const [remove] = coppiesItemSource.splice(source.index, 1)
            coppieitem.splice(destination.index, 0, remove)
            updateDocument('process', source.droppableId, {
                tasks: FieldValue.arrayRemove(remove)
            })
            updateDocument('process', destination.droppableId, {
                tasks: FieldValue.arrayRemove(remove)
            })
            updateDocument('tasks', remove.id, {
                process: destination.droppableId
            })

        } else {
            const column = projects[source.droppableId]
            const coppiesItem = column.tasks
            const [remove] = coppiesItem.splice(source.index, 1)
            coppiesItem.splice(destination.index, 0, remove)

            setProjects({
                ...projects,
                [source.droppableId]: {
                    ...column,
                    tasks: coppiesItem
                }
            })
        }
    }
    return (
        <div className="dragdropcontext">
            <div className="dragdropcontext-container">
                <DragDropContextDashboard
                    handlePropEnd={handlePropEnd}
                    projects={projectData}
                    setProjects={setProjectData}
                    selectedProject={projectCurent}
                />
                <div className="column">
                    <div className="column-addprocess"
                        onClick={() => setAddprocessVisible(true)}
                    >
                        Thêm tiến trình
                    </div>

                </div>
            </div>
            <AddProcess
                addprocessVisible={addprocessVisible}
                setAddprocessVisible={setAddprocessVisible}
            />
        </div>
    )
}
