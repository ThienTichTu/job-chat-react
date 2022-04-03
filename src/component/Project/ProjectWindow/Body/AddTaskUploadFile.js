import { useState, useEffect, memo } from 'react'
import { Drawer, Button, Space, Upload } from 'antd';
import { UploadOutlined, DeleteFilled, FileFilled } from '@ant-design/icons';
import { storage } from '../../../../firebase/config'
import _ from "lodash";
import { ref, getDownloadURL, uploadBytesResumable } from "@firebase/storage"
import { v4 } from "uuid"
const customName = (name) => {
    const name1 = name.split('.')[0];
    const name2 = name.split('.')[1];
    return `${name1}${Math.floor(Math.random() * 3)}.${name2}`

}
function AddTaskUploadFile({ uploadfileVisible, setUploadfileVisible, setFileCallBack }) {
    const [uploading, setUploading] = useState(false)
    const [filelist, setFilelist] = useState([])
    const [indexURL, setIndexURL] = useState()
    const onClose = () => {
        const newFile = filelist.filter(item => item.status === "done").map(item => {
            const { file, ...data } = item
            return data
        })
        setFileCallBack(newFile)
        setUploadfileVisible(false)
    }
    const handleUploadImg = () => {
        filelist.forEach((item, index) => {
            const storageRef = ref(storage, item.ref);

            const uploadTask = uploadBytesResumable(storageRef, item.file);

            uploadTask.on('state_changed',
                (snapshot) => { },
                (error) => { setIndexURL(index) },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setIndexURL(index)
                    });
                }
            );
        })


    }

    useEffect(() => {
        if (indexURL === 0 || indexURL !== null) {
            if (filelist[indexURL]?.ref) {
                const storageRef = ref(storage, filelist[indexURL].ref);
                getDownloadURL(storageRef).then((downloadURL) => {
                    const a = [...filelist]
                    a[indexURL].url = downloadURL
                    a[indexURL].status = "done"
                    setFilelist(a)
                });
            }
        }
    }, [indexURL])

    useEffect(() => {
        return () => {
            filelist.forEach(item => {
                item?.url && URL.revokeObjectURL(item.url)
            })
            setFilelist([])
            setIndexURL(null)
        }
    }, [uploadfileVisible])
    const handleUploadFile = (e) => {
        const list = _.reduce(e.target.files, (obj, param) => {
            const a = {
                name: param.name,
                type: param.type,
                ref: `tasks/${customName(param.name)}`,
                url: URL.createObjectURL(param),
                status: "wait",
                file: param
            }
            obj.push(a)
            return obj
        }, [])
        setFilelist(list)

    }

    const handleRemove = (index) => {
        const newlist = [...filelist]
        URL.revokeObjectURL(newlist[index].url)
        newlist.splice(index, 1)
        setFilelist(newlist)
    }


    return (

        <Drawer
            title="Upload file"
            placement="right"
            width={500}
            onClose={onClose}
            visible={uploadfileVisible}
            extra={
                <Space>
                    <Button
                        type="primary"
                        style={{ width: "100px" }}
                        onClick={handleUploadImg}
                    // loading={uploading}
                    >
                        {uploading ? 'Đang lưu file' : 'Upload'}
                    </Button>
                </Space>
            }

        >
            <div className="task__upload">
                <input type="file" id="taskupload" accept='.doc,.pdf,.png,.jpg,.ai' multiple onChange={handleUploadFile} />

                <label htmlFor="taskupload" className="btn-upload">
                    <UploadOutlined />
                    <span style={{ fontSize: "18px" }}>Tải file lên</span>
                </label>
                <div className="task__upload-list">
                    {
                        filelist.map((item, index) => {
                            const isImg = item.type.split("/")[0]

                            return (
                                <div key={index} className={`uploadlist-item ${item.status === "done" && "uploaddone"}`}>
                                    {
                                        isImg === 'image'
                                            ? <div className="uploadlist-iconimg">
                                                <img src={item.url} alt="" />

                                            </div>
                                            :
                                            <div className="uploadlist-icon">
                                                <FileFilled />

                                            </div>
                                    }


                                    <span className="uploadlist-name">
                                        {item.name}
                                    </span>
                                    <div className="uploadlist-delete"
                                        onClick={() => handleRemove(index)}
                                    >
                                        <DeleteFilled />
                                    </div>
                                </div>
                            )
                        })
                    }

                    {/* <div className="uploadlist-item">
                        <div className="uploadlist-iconimg">
                            <img src={link} alt="" />

                        </div>

                        <span className="uploadlist-name">
                            XXX.png
                        </span>
                        <div className="uploadlist-delete">
                            <DeleteFilled />
                        </div>
                    </div> */}
                </div>

            </div>


        </Drawer>

    )
}
export default memo(AddTaskUploadFile)