import React from 'react'
import { Avatar } from "antd"
export default function SearchNameItem({ user }) {
    return (
        <>
            <Avatar size={40} src={user.photoURL} >

                {user.photoURL ? '' : user.displayName?.charAt(0)?.toUpperCase()}

            </Avatar>
            <span className="ml-10">
                {user.displayName}
            </span>
        </>

    )
}
