module.exports = (auth) => {
  const express = require("express");
  const router = express.Router();
  router.use(express.json());

  router.post("/", async (req, res) => {
    const { email } = req.body;
    const { fetchSignInMethodsForEmail } = require("@firebase/auth");

    fetchSignInMethodsForEmail(auth, email)
      .then((signInMethods) => {
        if (signInMethods.length > 0) {
          console.log("Email exists");
          res.status(200).json({ message: "email exists" });
        } else {
          console.log("Email does not exist");
          res.status(404).json({ message: "email does not exist" });
        }
      })
      .catch((error) => {
        console.error("Error fetching sign-in methods:", error);
        res.status(500).json({ message: "internal server error" });
      });
  });

  return router;
};
