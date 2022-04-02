import { useState } from 'react'
import { Input, List, Avatar } from 'antd';
import { SubnodeOutlined, CheckOutlined, CheckCircleFilled, DeleteFilled } from "@ant-design/icons"
export default function ChecklistFile({ data, handleCheck }) {

    const [text, setText] = useState("")
    return (
        <div className="task__update-checklist">
            <span className="checklist-title">Liệt kê các công việc:</span>
            <div className="checklist-input">
                <Input
                    placeholder="Nhập tên công việc..."
                    allowClear
                    value={text}
                    onChange={(e) => setText(e.target.value)} />
                <div style={{ width: "50px", marginLeft: "10px", fontSize: "26px", cursor: "pointer" }}>
                    <SubnodeOutlined
                        onClick={() => {
                            const item = {
                                content: text,
                                state: "unchecked",
                            }
                            handleCheck(item, "add")
                            setText("")
                        }}
                    />
                </div>
            </div>
            <div className="checklist-content">
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item, index) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={item.state !== "checked"
                                    ? <CheckOutlined style={{ marginLeft: "10px" }} />
                                    : <CheckCircleFilled style={{ marginLeft: "10px", color: "green" }} />}
                                title={
                                    <div className="checklist-content-item">
                                        <span >
                                            {item.content}

                                        </span>
                                        <div className="checklist-content-icon">
                                            <CheckCircleFilled
                                                onClick={() => handleCheck(index, "check")}

                                            />
                                            <DeleteFilled
                                                onClick={() => handleCheck(index, "delete")}
                                            />
                                        </div>
                                    </div>
                                }
                            // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                        </List.Item>
                    )}
                />
            </div>
        </div>
    )
}
