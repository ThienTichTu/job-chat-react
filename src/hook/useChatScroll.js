import { useEffect, useRef, useState } from 'react'

export default function useChatScroll(message) {
    const messageEl = useRef();
    const [preRender, setPreRender] = useState(1)
    useEffect(() => {
        messageEl.current.scrollIntoView()
    }, [message])
    return messageEl;
}
