import React, { useContext, useEffect, useState } from 'react'
import "./profilemodal.scss"
import AvatarProfile from "./AvatarProfile"
import FormProfile from "./FormProfile"
import { Modal, Button, message } from "antd"
import { VisibleContext } from "../../context/VisibleProvider"
import { AuthContext } from "../../context/AuthProvider"
import { updateDocument, generateKeywords } from "../../firebase/services"
import { ref, getDownloadURL, uploadBytesResumable } from "@firebase/storage"
import { storage } from "../../firebase/config"

const key = 'updatable';
export default function ProfileModal() {

    const { isProfileVisible, setIsProfileVisible } = useContext(VisibleContext)
    const { userCurrent: {
        displayName, email, id, photoURL, uid, phone,
        address, linkTwitter, linkInstagram, linkFace
    } } = useContext(AuthContext)


    const [image, setImage] = useState()
    const [preview, setPreview] = useState()

    const [data, setData] = useState({})
    const [getUrlErr, setGetUrlErr] = React.useState("");

    useEffect(() => {

        setPreview(photoURL)
        setData({
            displayName, email, phone,
            address, linkTwitter, linkInstagram, linkFace
        })
        return () => {
            setData({})
            setImage()
        }
    }, [isProfileVisible])

    useEffect(() => {
        return () => {
            preview && URL.revokeObjectURL(preview)
        }
    }, [preview])

    React.useEffect(() => {
        if (getUrlErr !== "") {
            const storageRef = ref(storage, getUrlErr);
            const keywords = generateKeywords(data.displayName)

            getDownloadURL(storageRef).then((downloadURL) => {

                message.loading({ content: 'Cập nhật...', key });
                updateDocument("users", id, { ...data, photoURL: downloadURL, keywords })
                message.success({ content: 'Cập nhật thành công !', key, duration: 2 });
            });
        }
        return () => {
            setGetUrlErr("")
        }
    }, [getUrlErr])


    const handleOk = () => {
        if (image) {

            const nameIMG = Math.floor(Math.random() * 100000000000000);

            const storageRef = ref(storage, `avatar/${nameIMG}`);

            const uploadTask = uploadBytesResumable(storageRef, image);

            uploadTask.on('state_changed',
                (snapshot) => { },
                (error) => { setGetUrlErr(`avatar/${nameIMG}`) },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setGetUrlErr(`avatar/${nameIMG}`)
                    });
                }
            );


        } else {
            const keywords = generateKeywords(data.displayName)
            message.loading({ content: 'Cập nhật...', key });
            updateDocument("users", id, { ...data, keywords })
            message.success({ content: 'Cập nhật thành công !', key, duration: 2 });
        }
    }



    const handleCancel = () => {
        setIsProfileVisible(false)
    }

    const handleSetImg = (e) => {
        if (e.target.files[0]) {
            const a = URL.createObjectURL(e.target.files[0])
            setPreview(a)
            setImage(e.target.files[0])
        }
    }

    const handleSetData = (data) => {
        setData(data)
    }

    return (
        <>
            <Modal
                title="Thông tin cá nhân"
                visible={isProfileVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                width={800}
                footer={[
                    <Button key="back" type="primary" onClick={handleOk}>
                        Cập nhật
                    </Button>

                ]}

            >


                <AvatarProfile
                    displayName={displayName}
                    photoURL={preview}
                    onPreview={handleSetImg}

                />



                <FormProfile
                    data={data}
                    handleSetData={handleSetData}
                />


            </Modal>
        </>
    )
}
