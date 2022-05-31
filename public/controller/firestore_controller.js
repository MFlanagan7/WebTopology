import { getFirestore, onSnapshot, doc, addDoc, collection, query, where, getDoc, getDocs, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import * as Constant from "../model/constants.js";
import * as Utils from "../model/utils.js";

const db = getFirestore();

// export async function initFirestoreDocs() {
// 	await setDoc(doc(db, Constants.COLLECTION, Constants.DOCNAME_BUTTONS), Constants.docButtons);
// 	await setDoc(doc(db, Constants.COLLECTION, Constants.DOCNAME_LEDS), Constants.docLEDs);
// }

export async function updateRackDoc(rack, docid) {
	const docRef = doc(db, Constant.collectionNames.RACKS, docid);
	await updateDoc(docRef, rack);
}

export async function updateDeviceDoc(device, docid) {
	const docRef = doc(db, Constant.collectionNames.DEVICES, docid);
	await updateDoc(docRef, device);
}

export function attachRealtimeListener(collection, document, callback) {
	const unsubscribeListener = onSnapshot(doc(db, collection, document), callback);
	return unsubscribeListener;
}

export async function addRack(rack) {
    const ref = await addDoc(collection(db, Constant.collectionNames.RACKS), rack.serialize());
    return ref.id; // SQL => primary key
}

export async function addDevice(device) {
    const ref = await addDoc(collection(db, Constant.collectionNames.DEVICES), device.serialize());
    return ref.id; // SQL => primary key
}

export async function addConnection(connection) {
    const ref = await addDoc(collection(db, Constant.collectionNames.CONNECTIONS), connection.serialize());
    return ref.id; // SQL => primary key
}

export async function getRackList() {
    let rackList = [];
	const querySnapshot = await getDocs(collection(db, Constant.collectionNames.RACKS));
	querySnapshot.forEach( (doc) => {
		let newDoc = new Object;
		newDoc.id = doc.id;
		newDoc.data = doc.data();
		console.log(newDoc);
		rackList.push(newDoc);
	})
    return rackList.sort(Utils.compare);
}

export async function getDeviceList() {
    let deviceList = [];
	const querySnapshot = await getDocs(collection(db, Constant.collectionNames.DEVICES));
	querySnapshot.forEach( (doc) => {
		let newDoc = new Object;
		newDoc.id = doc.id;
		newDoc.data = doc.data();
		console.log(newDoc);
		deviceList.push(newDoc);
	})
	// console.log(deviceList)
    return deviceList.sort(Utils.compare);
	
}

// export async function getOneThread(threadId) {
//     const ref = await firebase.firestore().collection(Constant.collectionNames.THREADS).doc(threadId).get();
//     if (!ref.exists) return null;
//     const t = new Thread(ref.data());
//     t.docId = threadId;
//     return t;
// }

// export async function addReply(reply) {
//     const ref = await firebase.firestore().collection(Constant.collectionNames.REPLIES).add(reply.serialize());
//     return ref.id;
// }

// export async function getRepliyList(threadId) {
//     const snapShot = await firebase.firestore().collection(Constant.collectionNames.REPLIES)
//         .where('threadId', '==', threadId).orderBy('timestamp').get();
//     const replies = [];
//     snapShot.forEach(doc => {
//         const r = new Reply(doc.data());
//         r.docId = doc.id;
//         replies.push(r);
//     });

//     return replies;
// }

// export async function searchThreads(keywordsArray) {
//     const threadList = [];
//     const snapShot = await firebase.firestore().collection(Constant.collectionNames.THREADS)
//         .where('keywordsArray', 'array-contains-any', keywordsArray).orderBy('timestamp', 'desc').get();
//     snapShot.forEach(doc => {
//         const t = new Thread(doc.data());
//         t.docId = doc.id;
//         threadList.push(t);
//     });
//     return threadList;
// }

// export async function createAccount(email, password) {
//     await firebase.auth().createUserWithEmailAndPassword(email, password);
// }