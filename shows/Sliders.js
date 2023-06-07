const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", async (req, res) => {
    try {
      const sliders = [];

      const allShows = await db.collection("show").get();
      const shows = allShows.docs.map((doc) => {
        const { id, img, info, tags } = doc.data();
        return { id, img, info, tags };
      });

      const slidersDoc = await db.collection("sliders").get();
      const slidersInfo = slidersDoc.docs.map((doc) => doc.data());

      for (let i = 0; i < slidersInfo.length; i++) {
        const slider = slidersInfo[i];
        const content = shows.filter((e) => {
          return slider.content.includes(e.id);
        });

        sliders.push({ title: slider.title, content: content });
      }

      res.status(200).json(sliders);
    } catch (error) {
      console.error("Error retrieving Firestore data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  return router;
};
