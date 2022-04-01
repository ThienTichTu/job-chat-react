import React from 'react'




export default function GroupChatItem({ data }) {

    return (
        <>
            <span style={{ fontWeight: "bold", marginLeft: "10px", fontSize: "18px" }}>
                {data.name}
            </span>
        </>
    )
}
