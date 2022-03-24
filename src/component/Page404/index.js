import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { message } from "antd"
const key = 'updatable';
export default function Page404() {
    const navigate = useNavigate()
    useEffect(() => {
        message.loading({ content: 'Loading...', key });
        setTimeout(() => {
            navigate("/")
            message.error({ content: 'Trang không tồn tại!', key, duration: 2 });

        }, 1000);
    }, [])
    return (
        <div className="container">

        </div>
    )
}
