import React from 'react'

export default function JobItem({ data, handleCallTask }) {
    return (
        <div className="jobitem">
            <span className="jobitem-name" onClick={() => handleCallTask(data)}>
                {data.name}
            </span>

            <span className="jobitem-time">
                Thời gian tạo: {data.time}
            </span>
        </div>
    )
}
