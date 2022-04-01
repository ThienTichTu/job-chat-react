import firebase, { db } from "./config"
import React from 'react'
export const FieldValue = firebase.firestore.FieldValue
export const addDocument = (colection, data) => {
    let query = db.collection(colection)

    query.add({
        ...data,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
}
export const deleteDocument = (colection, id) => {
    let query = db.collection(colection).doc(id)
    query.delete()
}
export const generateKeywords = (displayName) => {
    // liet ke tat cac hoan vi. vd: name = ["David", "Van", "Teo"]
    // => ["David", "Van", "Teo"], ["David", "Teo", "Van"], ["Teo", "David", "Van"],...
    const name = displayName.split(' ').filter((word) => word);

    const length = name.length;
    let flagArray = [];
    let result = [];
    let stringArray = [];

    /**
     * khoi tao mang flag false
     * dung de danh dau xem gia tri
     * tai vi tri nay da duoc su dung
     * hay chua
     **/
    for (let i = 0; i < length; i++) {
        flagArray[i] = false;
    }

    const createKeywords = (name) => {
        const arrName = [];
        let curName = '';
        name.split('').forEach((letter) => {
            curName += letter;
            arrName.push(curName);
        });
        return arrName;
    };

    function findPermutation(k) {
        for (let i = 0; i < length; i++) {
            if (!flagArray[i]) {
                flagArray[i] = true;
                result[k] = name[i];

                if (k === length - 1) {
                    stringArray.push(result.join(' '));
                }

                findPermutation(k + 1);
                flagArray[i] = false;
            }
        }
    }

    findPermutation(0);

    const keywords = stringArray.reduce((acc, cur) => {
        const words = createKeywords(cur);
        return [...acc, ...words];
    }, []);

    return keywords;
};

export const updateDocument = (collection, id, data) => {
    const query = db.collection(collection)
    query.doc(id).update(data)
}
export const createUser = (data) => {
    addDocument("users", {
        ...data,
        keywords: generateKeywords(data.displayName),
        address: "",
        linkFace: "",
        linkTwitter: "",
        linkInstagram: "",
        friends: [],
        phone: "",
        notification: [],
        FriendInvite: [],
    })

}
export const FindUserWithEmail = async (email) => {
    const query = db.collection('users')
    const snapshot = await query.where('email', "==", email).get()
    const user = snapshot.docs.map(doc => ({
        id: doc.id,
        displayName: doc.data().displayName,
        photoURL: doc.data().photoURL,
        uid: doc.data().uid
    }))
    return user

}
export const FindUserWithName = async (name) => {
    const query = db.collection('users')
    const snapshot = await query.where('keywords', 'array-contains', name).get()
    const user = snapshot.docs.map(doc => ({
        id: doc.id,
        displayName: doc.data().displayName,
        photoURL: doc.data().photoURL,
        uid: doc.data().uid
    }))
    return user

}

export const FindUserWithId = async (id) => {
    const query = db.collection('users')
    const user = await query.doc(id).get()
    return user.data()
}

export const getTime = () => {
    const date = new Date().getTime();
    const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    };


    return new Intl.DateTimeFormat("en-US", options).format(date); //"7/22/2018, 7:22:13 AM"
}

