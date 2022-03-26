import { useContext } from 'react'
import Header from "./Header"
import Body from "./Body"
import Footer from "./Footer"
import { Alert } from "antd"
import { RoomChatContext } from "../../../context/RoomChatProvider"
const isRenderChatRoom = WrappedComponent => props => { // curry
    const { roomId, selectedRoom } = useContext(RoomChatContext)
    return (
        <>
            {
                roomId && selectedRoom
                    ?
                    <WrappedComponent
                        {...props}
                    />
                    :
                    (
                        <Alert
                            message='Hãy chọn phòng'
                            type='info'
                            showIcon
                            style={{ margin: 5, width: '99%' }}
                            closable
                        />
                    )
            }
        </>

    );
};

function Chatwindow() {
    return (
        <>
            <div className="chat__windown-header">
                <Header />
            </div>
            <div className="chat__windown-body">
                <Body />
            </div>
            <div className="chat__windown-footer">
                <Footer />
            </div>
        </>
    )
}
export default isRenderChatRoom(Chatwindow)