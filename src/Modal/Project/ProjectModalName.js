import React from 'react'

export default function ProjectModalName({ name, setName }) {
    return (
        <div className="project__modal-row">
            <span>
                Tên dự án:
            </span>
            <input
                value={name}
                type="text"
                onChange={(e => setName(e.target.value))}
            />

        </div>
    )
}
