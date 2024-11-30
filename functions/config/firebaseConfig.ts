import * as admin from "firebase-admin";
import * as serviceAccount from "./fir-1100-firebase-adminsdk-4yx33-44bb6abdc6.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: "https://fir-1100.firebaseio.com"
});
export const db = admin.firestore();
export const auth = admin.auth();