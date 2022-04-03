import { useState, useContext, useEffect } from 'react'
import InputEmoji from 'react-input-emoji'
import { SendOutlined, FileAddFilled } from "@ant-design/icons"
import { RoomChatContext } from "../../../context/RoomChatProvider"
import { AuthContext } from "../../../context/AuthProvider"
import { message } from "antd"
import { updateDocument, getTime, FieldValue } from "../../../firebase/services"
import { ref, getDownloadURL, uploadBytesResumable } from "@firebase/storage"
import { storage } from '../../../firebase/config'
const customName = (name) => {
    const name1 = name.split('.')[0];
    const name2 = name.split('.')[1];
    return `${name1}${Math.floor(Math.random() * 3)}.${name2}`

}
const key = 'updatable';
export default function FooterTaskChat({ taskchatVisible }) {
    const { selectedRoom: { id } } = useContext(RoomChatContext)
    const { userCurrent: { uid } } = useContext(AuthContext)
    const [fileSend, setFileSend] = useState({})
    const [text, setText] = useState('')

    const send = () => {
        const data1 = {
            type: 'text',
            idSend: uid,
            time: getTime(),
            content: text,
        }
        updateDocument('rooms', id, {
            data: FieldValue.arrayUnion(data1)
        })

    }
    useEffect(() => {
        return () => {
            setFileSend({})
            setText("")
        }
    }, [taskchatVisible])
    const sendfile = (e) => {
        message.loading({ content: 'Đang gửi file...', key });
        const file = e.target.files[0]
        const typefile = file.type.split('/')[0]
        const data = {
            type: typefile,
            name: file.name,
            ref: `taskchat/${customName(file.name)}`,
            url: ""
        }
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
                    type: fileSend.type,
                    idSend: uid,
                    time: getTime(),
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

    const handleOnEnter = () => {
        send()
    }
    const handleOnclick = () => {
        if (text !== "") {
            send()
            setText("")
        }
    }
    return (
        <>
            <div className="footer-input">
                <InputEmoji
                    value={text}
                    onChange={setText}
                    cleanOnEnter
                    onEnter={handleOnEnter}
                    placeholder="Nhập tin nhắn ..."
                />
            </div>
            <div className="footer-send">
                <input type="file" id="taskchatfile" style={{ display: "none" }}
                    onChange={sendfile}
                />
                <label htmlFor="taskchatfile">
                    <FileAddFilled
                        style={{ cursor: "pointer" }}
                    />
                </label>
                <SendOutlined
                    onClick={handleOnclick}
                />
            </div>
        </>
    )
}
