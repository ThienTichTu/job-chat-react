import { useState, useRef, useContext, useEffect } from 'react'
import UploadImg from "./UploadImg"
import { CloseOutlined, FileAddFilled, RightCircleFilled } from "@ant-design/icons"
import InputEmoji from 'react-input-emoji'
import { message } from "antd"
import { RoomChatContext } from "../../../context/RoomChatProvider"
import { AuthContext } from "../../../context/AuthProvider"
import { updateDocument, getTime, FieldValue } from "../../../firebase/services"
import firebase, { storage } from '../../../firebase/config'
import { ref, getDownloadURL, uploadBytesResumable } from "@firebase/storage"
const key = 'updatable';
const customName = (name) => {
    const name1 = name.split('.')[0];
    const name2 = name.split('.')[1];
    return `${name1}${Math.floor(Math.random() * 3)}.${name2}`

}
export default function Footer() {
    const { selectedRoom: { id }, roomId } = useContext(RoomChatContext)
    const { userCurrent: { uid } } = useContext(AuthContext)

    const inputRef = useRef()

    const [text, setText] = useState('')
    const [fileSend, setFileSend] = useState({})

    const [img, setImg] = useState()

    useEffect(() => {

        return () => {

            if (img) {
                img.preview && URL.revokeObjectURL(img.preview)
            }

        }
    }, [img])



    const updateDataChat = () => {
        if (text !== "") {
            const dataChat = {
                type: 'text',
                idSend: uid,
                content: text,
                time: getTime()
            }
            updateDocument('rooms', roomId, {
                data: firebase.firestore.FieldValue.arrayUnion(dataChat)
            })
        }

    }






    function handleOnEnter() {

        updateDataChat()
    }

    function handleOnClick() {
        updateDataChat()

        inputRef.current.focus()
    }



    const handleSetImg = (e) => {
        message.loading({ content: 'Đang gửi file...', key });
        const file = e.target.files[0]
        const typefile = file.type.split('/')[0]
        const data = {
            type: 'file',
            typeofFile: typefile,
            name: file.name,
            ref: `chat/${customName(file.name)}`,
            url: ""
        }
        console.log(data)
        const storageRef = ref(storage, data.ref);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => { },
            (error) => { setFileSend(data) },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setFileSend(data)
                });
            }
        );
    }

    useEffect(() => {
        if (fileSend?.ref) {
            const storageRef = ref(storage, fileSend.ref);
            getDownloadURL(storageRef).then((downloadURL) => {
                const data1 = {
                    type: 'file',
                    idSend: uid,
                    time: getTime(),
                    fileOfType: fileSend.typeofFile,
                    content: {
                        name: fileSend.name,
                        ref: fileSend.ref,
                        url: downloadURL
                    },
                }
                updateDocument('rooms', id, {
                    data: FieldValue.arrayUnion(data1)
                })
                message.success({ content: 'Gửi thành công!', key, duration: 2 });
            });
        }
    }, [fileSend])




    return (
        <>
            <div className="footer__input-header" >

                <div className="header-icon">
                    <FileAddFilled />
                </div>
                <UploadImg
                    onSetImg={handleSetImg}
                />
            </div>
            <div className="footer__input-bot">
                <div className="footer__send">

                    <InputEmoji
                        value={text}
                        onChange={setText}
                        cleanOnEnter
                        onEnter={handleOnEnter}
                        placeholder="Nhập tin nhắn ..."
                        ref={inputRef}
                    />
                </div>
                <div className="footer__send-icon">
                    <RightCircleFilled
                        onClick={handleOnClick}
                    />
                </div>
            </div>
        </>
    )
}
