const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.static("public"));

const { initializeApp } = require("@firebase/app");
const admin = require("firebase-admin");
const serviceAccount = require("./netflix-clone-6c75f-10a449e44d15.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
const firebaseConfig = {
  apiKey: "AIzaSyATew9ZoqyHlYSCRv53HWQx-E2GMHSYXlo",
  authDomain: "netflix-clone-6c75f.firebaseapp.com",
  projectId: "netflix-clone-6c75f",
  storageBucket: "netflix-clone-6c75f.appspot.com",
  messagingSenderId: "35074417577",
  appId: "1:35074417577:web:f3e9cb8aaf2ca6b2495ab8",
  measurementId: "G-372LRWDJ68",
};

initializeApp(firebaseConfig);
const { getAuth } = require("@firebase/auth");
const auth = getAuth();

//***************************************** */
const shows = require("./shows/shows")(db);
const sliders = require("./shows/Sliders")(db);
const register = require("./auth/register")(db, auth);
const validateEmail = require("./auth/validateEmail")(auth);
const login = require("./auth/login")(auth);
const logout = require("./auth/logout")(auth);

app.use("/shows", shows);
app.use("/sliders", sliders);
app.use("/register", register);
app.use("/auth/validateEmail", validateEmail);
app.use("/auth/Login", login);
app.use("/auth/logout", logout);

app.get("/", async (req, res) => {
  try {
    const showRef = db.collection("show");
    const querySnapshot = await showRef.get();
    const docs = querySnapshot.docs;
    const randomIndex = Math.floor(Math.random() * docs.length);
    const randomDoc = docs[randomIndex];
    const randomShow = {
      id: randomDoc.id,
      ...randomDoc.data(),
    };
    res.status(200).json(randomShow);
  } catch (error) {
    console.error("Error retrieving Firestore data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
