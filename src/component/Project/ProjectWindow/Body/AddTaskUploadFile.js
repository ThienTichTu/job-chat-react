import { useState, useEffect, memo } from 'react'
import { Drawer, Button, Space, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { storage } from '../../../../firebase/config'
import { ref, getDownloadURL, uploadBytesResumable } from "@firebase/storage"
const customName = (name) => {
    const name1 = name.split('.')[0];
    const name2 = name.split('.')[1];
    return `${name1}${Math.floor(Math.random() * 3)}.${name2}`

}
function AddTaskUploadFile({ uploadfileVisible, setUploadfileVisible, setFileCallBack }) {

    const [file, setFile] = useState([])
    const [handleFile, setHandleFile] = useState([])
    const [uploading, setUploading] = useState(false)
    const [dataFile, setDataFile] = useState([])
    const onClose = () => {
        setUploadfileVisible(false)
    }

    const handleSetImg = (item) => {

        setFile(preState => [...preState, item])
        return false
    }
    const handleUploadImg = () => {
        setUploading(true)

        const cusTomFile = file.map(item => ({
            type: item.type,
            name: customName(item.name),
            data: item

        }))
        const setRef = cusTomFile.map((item) => {
            const { name, type } = item
            const storageRef = ref(storage, `tasks/${item.name}`);

            const uploadTask = uploadBytesResumable(storageRef, item.data);
            uploadTask.on('state_changed',
                (snapshot) => { },
                (error) => {
                    setHandleFile({
                        name,
                        type,
                        ref: `tasks/${item.name}`
                    })

                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setHandleFile({
                            name,
                            type,
                            ref: `tasks/${item.name}`
                        })
                    });
                }
            );
        })

        setHandleFile(setRef)

    }

    useEffect(() => {
        return () => {
            setFile([])
            setHandleFile([])
            setDataFile([])
            setUploading(false)
        }
    }, [uploadfileVisible])



    useEffect(() => {
        if (handleFile?.ref) {
            const storageRef = ref(storage, handleFile.ref);
            getDownloadURL(storageRef)
                .then((downloadURL) => {
                    setDataFile(preState => [...preState, {
                        ...handleFile,
                        photoURL: downloadURL
                    }])

                })
        }
    }, [handleFile])

    useEffect(() => {

        if (file.length === dataFile.length) {
            setFileCallBack(dataFile)
            setUploading(false)
        }

    }, [dataFile])


    const handleRemove = (e) => {
        const newFile = file.filter(item => item.uid !== e.uid)
        setFile([...newFile])
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
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="primary" onClick={onClose}>
                        OK
                    </Button>
                </Space>
            }

        >
            <div className="task__upload">

                <Upload.Dragger
                    action="http://localhost:4000"
                    multiple
                    listType='picture'
                    beforeUpload={handleSetImg}
                    onRemove={handleRemove}
                >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload.Dragger>
            </div>
            <Button
                type="primary"
                style={{ marginTop: 16 }}
                onClick={handleUploadImg}
                loading={uploading}
            >
                {uploading ? 'Đang lưu file' : 'Upload'}
            </Button>

        </Drawer>

    )
}
export default memo(AddTaskUploadFile)