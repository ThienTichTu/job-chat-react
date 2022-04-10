import { useState, useEffect, memo } from 'react'
import { Drawer, Button, Input, Space, message } from 'antd';
import { updateDocument } from "../../../../firebase/services"
const key = 'updatable';
const { TextArea } = Input;
function UpdateProcess({ updateProcessVisible, setUpdateProcessVisible, data }) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    useEffect(() => {
        setName(data.name)
        setDescription(data.description)
        return () => {
            setName("")
            setDescription("")
        }
    }, [data])
    const onClose = () => {
        setUpdateProcessVisible(false)
    }
    const handleOnclick = () => {
        message.loading({ content: 'Đang cập nhật tiến trình...', key });
        if (name !== "") {
            updateDocument('process', data.id, {
                name: name,
                description: description,
            })
            message.success({ content: 'Tạo thành công ', key, duration: 2 });
            return;
        }
        message.warning({ content: "Tên tiến trình không được để trống", key, duration: 2 });
    }
    return (
        <Drawer
            title="Tạo tiến trình mới"
            placement="bottom"
            onClose={onClose}
            visible={updateProcessVisible}
            height={500}
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
export default memo(UpdateProcess)