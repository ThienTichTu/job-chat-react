import { useState, useContext, useEffect } from 'react'
import { Drawer, Button, Input, Space, message } from 'antd';
import { addDocument, updateDocument, FieldValue } from "../../../../firebase/services"
import { ProjectContext } from "../../../../context/ProjectProvider"
import { v4 } from "uuid";

const { TextArea } = Input;
const key = 'updatable';
export default function AddProcess({ setAddprocessVisible, addprocessVisible }) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const { selectedProject,
    projectId, } = useContext(ProjectContext)
  const onClose = () => {
    setAddprocessVisible(false);
  };
  useEffect(() => {
    return () => {
      setName("")
      setDescription("")
    }
  }, [addprocessVisible])


  const handleCreateProcess = () => {
    message.loading({ content: 'Đang tạo tiến trình...', key });
    if (name === "") {
      message.warning({ content: "Tên tiến trình không được để trống", key, duration: 2 });
      return;
    }
    const data = {
      pid: v4(),
      name: name,
      description: description,
      tasks: [],
      project: projectId
    }
    addDocument("process", data)
    updateDocument("projects", projectId, {
      process: FieldValue.arrayUnion(data.pid)
    })
    message.success({ content: 'Tạo thành công ', key, duration: 2 });
    setAddprocessVisible(false);

  }

  const handleOnclick = () => {
    handleCreateProcess()
  }
  return (
    <Drawer
      title="Tạo tiến trình mới"
      placement="bottom"
      onClose={onClose}
      visible={addprocessVisible}
      extra={
        <Space align="start">
          <Button type="primary" onClick={handleOnclick}>
            Hoàn thành
          </Button>
        </Space>
      }
    >

      <Input
        tyle={{ marginBottom: "20px" }}
        placeholder="Tên tiến trình"
        allowClear
        onChange={(e) => setName(e.target.value)}
        value={name}
        size="large"
        style={{ marginBottom: "20px" }}
      />
      <TextArea
        placeholder="Mô tả (không bắt buộc)"
        showCount maxLength={100}
        style={{ height: 120 }}
        size="large"
        value={description}
        onChange={(e) => setDescription(e.target.value)}

      />


    </Drawer>
  )
}
