module.exports = (db) => {
  const express = require("express");
  const router = express.Router();

  const middleware = async function (req, res, next) {
    try {
      const showId = req.params.id; // Get the show ID from the request parameters
      const showRef = db.collection("show").doc(showId); // Get a reference to the specific show document
      const docSnapshot = await showRef.get(); // Retrieve the show document

      if (!docSnapshot.exists) {
        console.log("ID does not exist");
        res.status(404); // Not found
        res.send("ID does not exist");
      } else {
        console.log("ID exists");
        next();
      }
    } catch (error) {
      console.error("Error checking ID existence:", error);
      res.status(500).send("Internal Server Error");
    }
  };

  // router.all("/:id", middleware);

  return router;
};
