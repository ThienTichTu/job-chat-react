import { useContext, useCallback, useRef, useEffect, useState, memo } from 'react'
import ChatItem from "./ChatItem"
import ChatItemImg from './ChatItemImg'
import { RoomChatContext } from "../../../context/RoomChatProvider"
import { AuthContext } from '../../../context/AuthProvider'
import { VisibleContext } from "../../../context/VisibleProvider"


import _ from 'lodash'


function Body() {

    const { selectedRoom: { data }, roomId } = useContext(RoomChatContext)
    const [scroll, setScroll] = useState(2)

    const { members } = useContext(RoomChatContext)

    const [datachat, setDataChat] = useState(false)

    const { userCurrent: { uid, id } } = useContext(AuthContext)

    const { setIsPreviewUserVisible, setIdUserPreview, setIsProfileVisible } = useContext(VisibleContext)

    const refScroll = useRef(null)


    useEffect(() => {
        if (data) {
            setDataChat(data)
        }

    }, [data])



    useEffect(() => {
        setTimeout(() => {
            if (refScroll.current) {
                refScroll.current.scrollTo(0, refScroll.current.scrollHeight)
            }
        }, 0)

    }, [data])



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
                datachat &&
                datachat.map((data, index) => {

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
                    if (data.type === 'file') {
                        const useSend = _.find(members, (member) => member.uid === data.idSend)

                        return (
                            <div key={index} className="body__chat-item">
                                <ChatItemImg
                                    isUser={data.idSend === uid ? "isUser" : ""}
                                    data={data}
                                    useSend={useSend}
                                    handleSetpreviews={handleSetpreviews}

                                />
                            </div>
                        )
                    }


                })
            }





        </div>
    )
}
export default memo(Body)