const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", async (req, res) => {
    try {
      const uid = req.user.uid;
      const userDoc = await db.collection("users").doc(uid).get();
      const myListShows = userDoc.data().myList;
      res.status(200).json(myListShows);
    } catch (error) {
      res.status(500).json("error");
    }
  });
  return router;
};
