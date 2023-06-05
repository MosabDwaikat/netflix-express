module.exports = (auth) => {
  const express = require("express");
  const router = express.Router();

  router.use(express.json());

  router.get("/", async (req, res) => {
    const { signOut } = require("@firebase/auth");

    try {
      await signOut(auth);
      res.status(200).json({
        message: "User Signed out successfully",
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(400).send(error.code);
    }
  });

  return router;
};
