import React from 'react'
import { db } from "../firebase/config"
const useFireStore = (colection, condition) => {
    const [document, setDocument] = React.useState([])
    React.useEffect(() => {

        let collectionRef = db.collection(colection).orderBy("createdAt");
        if (condition) {

            if (!condition.compareValue || !condition.compareValue.length) {
                setDocument([])
                return;
            }
            collectionRef = collectionRef.where(
                condition.fieldName,
                condition.operator,
                condition.compareValue
            );
        }

        const unsupcibed = collectionRef.onSnapshot(snapshot => {

            const document = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            setDocument(document)
        })

        return () => {
            unsupcibed()
        }


    }, [colection, condition])

    return document
}
export default useFireStore;