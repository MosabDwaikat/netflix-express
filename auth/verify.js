module.exports = (admin) => {
  const express = require("express");
  const router = express.Router();

  router.use(express.json());

  router.post("/", async (req, res) => {
    try {
      //   const {v} = require("@firebase/");
      const { token } = req.body;
      await admin.auth().verifyIdToken(token);

      console.log("Token verified");
      res.status(200).send({ valid: true });
    } catch (error) {
      // Token verification failed
      console.log("Token verification failed");
      res.status(400).send({ valid: false });
    }
  });

  return router;
};
