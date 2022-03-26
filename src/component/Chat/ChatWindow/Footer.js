import { useState, useRef, useContext, useEffect } from 'react'
import UploadImg from "./UploadImg"
import { CloseOutlined, FileAddFilled, RightCircleFilled } from "@ant-design/icons"
import InputEmoji from 'react-input-emoji'
import { message } from "antd"
import { RoomChatContext } from "../../../context/RoomChatProvider"
import { AuthContext } from "../../../context/AuthProvider"
import { updateDocument, getTime } from "../../../firebase/services"
import firebase, { storage } from '../../../firebase/config'
import { ref, getDownloadURL, uploadBytesResumable } from "@firebase/storage"
const key = 'updatable';

export default function Footer() {
    const { roomId } = useContext(RoomChatContext)
    const { userCurrent: { uid } } = useContext(AuthContext)

    const inputRef = useRef()

    const [text, setText] = useState('')

    const [getUrlErr, setGetUrlErr] = useState("");

    const [img, setImg] = useState()

    useEffect(() => {

        return () => {

            if (img) {
                img.preview && URL.revokeObjectURL(img.preview)
            }

        }
    }, [img])



    const updateDataChat = () => {
        if (img) {
            message.loading({ content: 'Đang tải ảnh...', key });

            const nameIMG = Math.floor(Math.random() * 100000000000000);

            const storageRef = ref(storage, `chat/${nameIMG}`);

            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on('state_changed',
                (snapshot) => { },
                (error) => { setGetUrlErr(`chat/${nameIMG}`) },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setGetUrlErr(`chat/${nameIMG}`)
                    });
                }
            );
        } else {
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

    useEffect(() => {
        if (getUrlErr !== "") {
            const storageRef = ref(storage, getUrlErr);
            getDownloadURL(storageRef).then((downloadURL) => {
                const dataChat = {
                    type: 'img',
                    idSend: uid,
                    content: text,
                    img: downloadURL,
                    time: getTime()
                }
                updateDocument('rooms', roomId, {
                    data: firebase.firestore.FieldValue.arrayUnion(dataChat)
                })
                message.success({ content: 'Đã tải ảnh xong !', key, duration: 2 });
                if (img) {

                    img.preview && URL.revokeObjectURL(img.preview)
                    setImg(null)

                }

            });
        }
        return () => {
            setGetUrlErr("")
        }
    }, [getUrlErr])




    function handleOnEnter() {
        console.log("hello")
        updateDataChat()
    }

    function handleOnClick() {
        updateDataChat()
        setText("")
        inputRef.current.focus()
    }



    const handleSetImg = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0]
            const a = URL.createObjectURL(e.target.files[0])
            file.preview = a
            setImg(file)
        }
    }



    return (
        <>
            <div className="footer__input-header" >
                {
                    img && <div className="previewimg">
                        <CloseOutlined
                            style={{ position: 'absolute', right: "5px", top: "5px", color: "#fff", cursor: 'pointer' }}
                            onClick={() => setImg(null)}
                        />
                        <img src={img.preview} alt="" />
                    </div>
                }
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
