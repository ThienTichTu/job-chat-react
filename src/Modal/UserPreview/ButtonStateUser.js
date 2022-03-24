import React from 'react'
import { Button } from "antd"
export default function ButtonStateUser({ checkUser, setCheckUser }) {
    return (
        <div style={{ marginTop: "10px" }}>
            {
                checkUser === 'not friend'
                    ?
                    <Button
                        type="primary"
                        onClick={() => { setCheckUser("friend invite") }}
                    >Kết bạn</Button>
                    :
                    checkUser === 'friend invite'
                        ?
                        <Button type="dashed">đã gửi lời mời</Button>
                        :
                        <Button type="dashed">Bạn bè</Button>

            }

        </div>
    )
}
