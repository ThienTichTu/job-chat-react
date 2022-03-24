import { useState, useRef, useContext } from 'react'
import { SearchOutlined, CloseOutlined } from "@ant-design/icons"
import SearchNameItem from "./SearchNameItem"
import { FindUserWithName } from "../../../firebase/services"

import { VisibleContext } from '../../../context/VisibleProvider'
export default function FriendWindowSearchName() {

    const {
        setIsPreviewUserVisible,
        setIdUserPreview
    } = useContext(VisibleContext)

    const timeoutRef = useRef(null)

    const [key, setKey] = useState("")
    const [userRs, setUserRs] = useState([])
    const handleOnChange = (e, reset) => {
        if (reset) {
            setUserRs([])
            setKey("")

        } else {
            const value = e.target.value
            setKey(e.target.value)
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
            timeoutRef.current = setTimeout(async () => {
                const user = await FindUserWithName(value)
                setUserRs([...user])

            }, 600)
        }


    }

    return (
        <>
            <span>Tìm kiếm bạn bè:</span>

            <div className="search-name">
                <input
                    type="text"
                    placeholder="Nhập tên vào đây..."
                    value={key}
                    onChange={handleOnChange}

                />
                <div className="search-name-icon">
                    {
                        key === ""
                            ?
                            <SearchOutlined />
                            :
                            <CloseOutlined onClick={(e) => handleOnChange(e, 'reset')} />
                    }
                </div>

            </div>
            <div className="search-name-list">
                {
                    userRs.map((user, index) =>
                        <div key={index} className="search-name-list-item"
                            onClick={() => {
                                setIsPreviewUserVisible(true)
                                setIdUserPreview(user.id)
                            }}
                        >
                            <SearchNameItem
                                user={user}
                            />
                        </div>
                    )
                }


            </div>

        </>
    )
}
