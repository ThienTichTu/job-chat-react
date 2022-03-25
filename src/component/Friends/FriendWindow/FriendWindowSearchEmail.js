import { useRef, useState, useContext } from 'react'
import { Avatar } from "antd"
import { FindUserWithEmail } from "../../../firebase/services"
import { AuthContext } from "../../../context/AuthProvider"
export default function FriendWindowSearchEmail() {
    const { userCurrent: { id } } = useContext(AuthContext)
    const [email, setEmail] = useState("")
    const timeoutRef = useRef(null)
    const [userRs, setUserRs] = useState(false)
    const handleOnChange = (e) => {
        const value = e.target.value
        setEmail(e.target.value)
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(async () => {
            const user = await FindUserWithEmail(value)
            if (user[0] && user[0].id !== id) {
                setUserRs({ ...user[0] })
            } else {
                setUserRs(false)
            }
        }, 600)

    }

    return (

        <>
            <span
                style={{ height: "30px" }}
            >

                Kết bạn :</span>
            <input
                type="text"
                placeholder="Nhập email...."
                value={email}
                onChange={handleOnChange}
            />
            <div className="email-search-rs">
                {
                    userRs &&
                    <>
                        <Avatar src={userRs.photoURL} size={40}>
                            {userRs.photoURL ? '' : userRs.displayName?.charAt(0)?.toUpperCase()}
                        </Avatar>
                        <span className="email-search-rs-name">
                            {userRs.displayName}
                        </span>
                    </>
                }

            </div>
            <button className="search-btn">
                Gửi lời mời
            </button>
        </>
    )
}
