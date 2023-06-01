module.exports = (db) => {
  const express = require("express");
  const router = express.Router();

  router.get("/:id", async (req, res) => {
    try {
      const showId = req.params.id;
      const showRef = db.collection("show").doc(showId);
      const docSnapshot = await showRef.get();

      const showData = docSnapshot.data();
      const show = { id: docSnapshot.id, ...showData };
      res.status(200).json(show);
    } catch (error) {
      console.error("Error retrieving Firestore data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  return router;
};
