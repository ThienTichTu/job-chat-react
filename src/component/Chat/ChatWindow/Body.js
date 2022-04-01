import { useContext, useCallback, useRef, useEffect } from 'react'
import ChatItem from "./ChatItem"
import ChatItemImg from './ChatItemImg'
import { RoomChatContext } from "../../../context/RoomChatProvider"
import { AuthContext } from '../../../context/AuthProvider'
import { VisibleContext } from "../../../context/VisibleProvider"


import _ from 'lodash'


export default function Body() {

    const { selectedRoom, roomId } = useContext(RoomChatContext)

    const { members } = useContext(RoomChatContext)

    const { userCurrent: { uid, id } } = useContext(AuthContext)

    const { setIsPreviewUserVisible, setIdUserPreview, setIsProfileVisible } = useContext(VisibleContext)

    const refScroll = useRef(null)

    useEffect(() => {
        refScroll.current.scrollTo(0, refScroll.current.scrollHeight);

    }, [selectedRoom.data])


    const handleSetpreviews = useCallback((userid) => {

        if (userid === id) {

            setIsProfileVisible(true)
        } else {
            setIsPreviewUserVisible(true)
            setIdUserPreview(userid)
        }

    }, [])

    return (
        <div className="body__container" ref={refScroll}>

            {
                selectedRoom.data.map((data, index) => {
                    if (data.type === 'text') {
                        const useSend = _.find(members, (member) => member.uid === data.idSend)

                        return (
                            <div key={index} className="body__chat-item">
                                <ChatItem
                                    isUser={data.idSend === uid ? "isUser" : ""}
                                    data={data}
                                    useSend={useSend}
                                    handleSetpreviews={handleSetpreviews}
                                />
                            </div>
                        )
                    }
                    if (data.type === 'img') {
                        return (
                            <div key={index} className="body__chat-item">
                                <ChatItemImg
                                    isUser={data.idSend === uid ? "isUser" : ""}
                                    data={data}
                                />
                            </div>
                        )
                    }


                })
            }





        </div>
    )
}
