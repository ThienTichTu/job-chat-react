import React from 'react'

export default function ProjectModalDescription({ description, setDescription }) {
    return (
        <div className="project__modal-row">
            <span>
                Mô tả:
            </span>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
        </div>
    )
}
