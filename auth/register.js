module.exports = (db, auth) => {
  const express = require("express");
  const router = express.Router();
  const { createUserWithEmailAndPassword } = require("@firebase/auth");

  router.use(express.json());

  router.post("/", async (req, res) => {
    const { firstName, lastName, password, email } = req.body;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Create a new document in Firestore with the user's UID as the document ID
      const userDocRef = db.collection("users").doc(user.uid);
      await userDocRef.set({
        firstName,
        lastName,
        email,
        myList: [],
      });

      console.log("User document created successfully");
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error registering user:", error.message);
      res.status(400).send(error);
    }
  });

  return router;
};
