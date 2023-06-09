module.exports = (db) => {
  const express = require("express");
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const showRef = db.collection("show");
      const querySnapshot = await showRef.get();
      const docs = querySnapshot.docs;
      const randomIndex = Math.floor(Math.random() * docs.length);
      const randomDoc = docs[randomIndex];
      const randomShowData = randomDoc.data();
      const randomShow = {
        id: randomDoc.id,
        img: randomShowData.img,
        info: randomShowData.info,
        tags: randomShowData.tags,
      };
      res.status(200).json(randomShow);
    } catch (error) {
      console.error("Error retrieving Firestore data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  return router;
};
