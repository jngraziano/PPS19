export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCT73t0Wmw7mMmwyRZoAOV4XFZ_xz3INMQ",
  authDomain: "aplicacionesentregadb.firebaseapp.com",
  databaseURL: "https://aplicacionesentregadb.firebaseio.com",
  projectId: "aplicacionesentregadb",
  storageBucket: "aplicacionesentregadb.appspot.com",
  messagingSenderId: "44730010403",
  appId: "1:44730010403:web:390231128ef8fc85"
};

export const snapshotToArray = snapshot => {
  let returnArray = [];
  snapshot.forEach(element => {
    let item = element.val();
    item.key = element.key;
    returnArray.push(item);
  });

  return returnArray;
}