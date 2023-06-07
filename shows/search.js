module.exports = (db) => {
  const express = require("express");
  const router = express.Router();

  router.get("/:keyword", async (req, res) => {
    try {
      const keyword = req.params.keyword.toLowerCase();
      const showsRef = db.collection("show");
      const snapshot = await showsRef.get();

      const shows = [];
      snapshot.forEach((doc) => {
        const showData = doc.data();
        const title = showData.title.toLowerCase();
        if (title.includes(keyword)) {
          const { id, img, info, tags } = showData; // Destructure the desired properties
          const show = { id, img, info, tags }; // Create a new show object with the desired properties
          shows.push(show);
        }
      });

      res.status(200).json(shows);
    } catch (error) {
      console.error("Error retrieving Firestore data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  return router;
};
