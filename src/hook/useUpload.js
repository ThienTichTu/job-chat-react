import { useState, useEffect } from 'react'
import firebase, { storage } from '../firebase/config'
import { ref, getDownloadURL, uploadBytesResumable } from "@firebase/storage"
export default function useUpload(file) {
    const [document, setDocument] = useState([])
    const [storeRef, setStoreRef] = useState([])
    useEffect(() => {

        // const fileName = file.map(item => item.name)
        setDocument(file)

    }, [file])
    return document
}
