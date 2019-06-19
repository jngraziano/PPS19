export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyD4EV28tAjiq_k2sqf_lYzjP7elor5eqOE",
  authDomain: "ppslogindata.firebaseapp.com",
  databaseURL: "https://ppslogindata.firebaseio.com",
  projectId: "ppslogindata",
  storageBucket: "ppslogindata.appspot.com",
  messagingSenderId: "794910733526",
  appId: "1:794910733526:web:852b9525ee69fdee"
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