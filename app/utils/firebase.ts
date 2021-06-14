import admin from "firebase-admin";

export const resetFirebase = async () => {
  try {
    let u = await admin.auth().listUsers();
    let usersID = u.users.map(u => u.uid);
    await admin.auth().deleteUsers(usersID);
    console.log("Firebase clean");
  } catch (err) {
    console.log(err);
  }
}
