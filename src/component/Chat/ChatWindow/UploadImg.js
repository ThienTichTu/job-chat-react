import { memo, useState } from 'react'
import { FileImageOutlined } from "@ant-design/icons"
function UploadImg({ onSetImg }) {

    return (
        <div className="header-icon">
            <input type="file" id="upload_imgChat" onChange={(e) => onSetImg(e)} style={{ display: "none" }} />
            <label htmlFor="upload_imgChat">
                <FileImageOutlined
                    style={{ cursor: "pointer" }}
                />
            </label>
        </div>
    )
}
export default UploadImg