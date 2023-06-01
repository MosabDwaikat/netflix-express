module.exports = (auth) => {
  const express = require("express");
  const router = express.Router();

  router.use(express.json());

  router.post("/", async (req, res) => {
    const { email, password } = req.body;
    const { signInWithEmailAndPassword } = require("@firebase/auth");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const token = await user.getIdToken();

      res.status(201).json({
        message: "User logged successfully",
        token: token,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(400).send(error.code);
    }
  });

  return router;
};
