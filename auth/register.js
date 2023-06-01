module.exports = (db, auth) => {
  const express = require("express");
  const router = express.Router();
  const { createUserWithEmailAndPassword } = require("@firebase/auth");
  router.use(express.json());

  router.post("/", async (req, res) => {
    const { firstName, lastName, password, email } = req.body;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user;
        console.log("success");
        res.status(201).json({ message: "User registered successfully" });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error("Error registering user:", error.message);
        res.status(400).send(error);
      });
  });

  return router;
};
