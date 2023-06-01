const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", async (req, res) => {
    try {
      const showRef = db.collection("show");
      const querySnapshot = await showRef.get();
      const data = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      res.status(200).json(data);
    } catch (error) {
      console.error("Error retrieving Firestore data:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  const verifyID = require("./VerifyID")(db);
  router.all("/:id", verifyID);
  const ShowByID = require("./ShowByID")(db);
  router.get("/:id", ShowByID);

  return router;
};
