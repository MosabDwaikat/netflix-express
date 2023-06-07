const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", async (req, res) => {
    try {
      const sliders = [];
      // const myList = { title: "My List", content: [] };
      // const uid = req.user.uid;

      // 1 - Query the user to get the shows in myList
      // const userDoc = await db.collection("users").doc(uid).get();
      // const myListShows = userDoc.data().myList;
      const allShows = await db.collection("show").get();
      const shows = allShows.docs.map((doc) => doc.data());

      // const showData = shows.filter((e) => {
      //   return myListShows.includes(e.id);
      // });
      // myList.content = showData;
      // sliders.push(myList);

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
