import { useEffect, useState, memo } from 'react'
import { Space, Button, Drawer, message } from 'antd';
import { DeleteFilled, UploadOutlined, FileFilled } from '@ant-design/icons';
import { ref, getDownloadURL, uploadBytesResumable } from "@firebase/storage"
import { storage } from '../../firebase/config'
import _ from "lodash";
const customName = (name) => {
    console.log(name)
    const name1 = name.split('.')[0];
    const name2 = name.split('.')[1];
    return `${name1}${Math.floor(Math.random() * 3)}.${name2}`

}
function UploadFile({ uploadFileVisible, setUploadFileVisible, file, setFileCallBack }) {

    const [fileList, setFilelist] = useState([])
    const [indexURL, setIndexURL] = useState()

    useEffect(() => {

        setFilelist(file)

    }, [uploadFileVisible, file])

    useEffect(() => {
        return () => {
            fileList.forEach(item => {
                item?.url && URL.revokeObjectURL(item.url)
            })
            setFilelist([])
            setIndexURL(null)
        }
    }, [uploadFileVisible])

    const onClose = () => {
        const newFile = fileList.filter(item => item.status === "done").map(item => {
            const { file, ...data } = item
            return data
        })
        setFileCallBack(newFile)
        setUploadFileVisible(false)
    }
    const handleChange = (e) => {
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
        setFilelist([...fileList, ...list])

    }
    const handleUpload = () => {
        fileList.forEach((item, index) => {
            if (item.status === "wait") {

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
            }

        })

    }
    useEffect(() => {

        if (indexURL === 0 || indexURL !== null) {
            const storageRef = ref(storage, fileList[indexURL].ref);
            getDownloadURL(storageRef).then((downloadURL) => {
                const a = [...fileList]
                a[indexURL].url = downloadURL
                a[indexURL].status = "done"
                setFilelist(a)
            });

        }
    }, [indexURL])
    const handleRemove = (index) => {
        const newlist = [...fileList]
        URL.revokeObjectURL(newlist[index].url)
        newlist.splice(index, 1)
        setFilelist(newlist)
    }

    return (
        <Drawer
            title="Finh đính kèm" placement="right" width={500}
            onClose={onClose} visible={uploadFileVisible}
            extra={
                <Space>
                    <Button type="primary" onClick={handleUpload}> UpLoad</Button>

                </Space>
            }
        >

            <div className="uploadfile">
                <input type="file" id="taskupload1" accept='.doc,.pdf,.png,.jpg,.ai' multiple onChange={handleChange} />

                <label htmlFor="taskupload1" className="btn-upload">
                    <UploadOutlined />
                    <span style={{ fontSize: "18px" }}>Tải file lên</span>
                </label>

                <div className="uploadfile-body">
                    {

                        fileList &&
                        fileList.map((item, index) => {
                            const isImg = item?.type ? item.type.split("/")[0] : "type"
                            return (
                                <div key={index} className={`uploadfile-item ${item.status}`}>
                                    {
                                        isImg === 'image'
                                            ? <div className="uploadfile-icon">
                                                <img src={item.url} alt="" />
                                            </div>
                                            :
                                            <div className="uploadfile-iconfile">
                                                <FileFilled />
                                            </div>
                                    }


                                    <div className="uploadfile-link">
                                        <a href={item.url} target="_blank">
                                            {item.name}
                                        </a>
                                    </div>
                                    <div className="uploadfile-delete">
                                        <DeleteFilled
                                            onClick={() => handleRemove(index)}
                                        />
                                    </div>
                                </div>
                            )
                        })
                    }


                </div>

            </div>
        </Drawer>
    )
}
export default memo(UploadFile)