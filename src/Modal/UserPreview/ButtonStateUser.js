import { useContext } from 'react'
import { Button } from "antd"
import { updateDocument, addDocument } from "../../firebase/services"
import { AuthContext } from '../../context/AuthProvider'
import _ from "lodash"
import { message } from 'antd'
const key = 'updatable';
export default function ButtonStateUser({ checkUser, setCheckUser, idUser, listFriensInvite, User }) {
    const { userCurrent: { uid, id, FriendInvite, friends } } = useContext(AuthContext)
    const handeleAddFriends = () => {

        message.loading({ content: 'Đang gửi lời mời kết bạn...', key });

        updateDocument('users', idUser, {
            FriendInvite: [...listFriensInvite, uid]
        })
        message.success({ content: 'Đã gửi lời mời kết bạn thành công!', key, duration: 2 });
        setCheckUser("Da gui loi moi")
    }

    const handleAccessFriend = () => {
        message.loading({ content: 'Đang gửi lời mời kết bạn...', key });

        var newFriendInvite = _.remove(FriendInvite, function (n) {
            return n !== User.uid
        });

        updateDocument('users', id, {
            FriendInvite: newFriendInvite,
            friends: [...friends, User.uid]
        })

        addDocument('rooms', {
            type: 'friend chat',
            members: [User.uid, uid],
            data: []
        })

        updateDocument('users', idUser, {
            friends: [...User.friends, uid]
        })
        setCheckUser("Ban be")
        message.success({ content: 'Hai người đã thành bạn bè !', key, duration: 2 });

    }

    return (
        <div style={{ marginTop: "10px" }}>
            {
                checkUser === 'Ban be'
                    ?
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            type="primary"
                        >Bạn Bè
                        </Button>


                    </div>
                    :
                    checkUser === 'Dong y'
                        ?
                        <Button
                            type="primary"
                            onClick={handleAccessFriend}
                        >Đồng ý kết bạn</Button>
                        :
                        checkUser === 'Da gui loi moi'
                            ?
                            <Button type="dashed">Đã gửi lời mời</Button>
                            :
                            <Button
                                type="primary"
                                onClick={handeleAddFriends}
                            >
                                Kết bạn
                            </Button>


            }

        </div>
    )
}
