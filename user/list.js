const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.put("/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const uid = req.user.uid;
      const userRef = db.collection("users").doc(uid);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        throw new Error("User not found");
      }

      const myList = userDoc.data().myList || [];

      if (myList.includes(id)) {
        throw new Error("ID already exists in the list");
      } else {
        myList.push(id);
        await userRef.update({ myList: myList });
        res.status(200).json({ message: "Success", newList: myList });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "An error occurred", error: error.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const uid = req.user.uid;
      const userRef = db.collection("users").doc(uid);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        throw new Error("User not found");
      }

      const myList = userDoc.data().myList || [];

      if (!myList.includes(id)) {
        throw new Error("ID does not exist in the list");
      } else {
        const updatedList = myList.filter((item) => item !== id);
        await userRef.update({ myList: updatedList });
        res.status(200).json({ message: "Success", newList: updatedList });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "An error occurred", error: error.message });
    }
  });

  router.get("/content", async (req, res) => {
    try {
      const List = { title: "My List", content: [] };
      const uid = req.user.uid;

      // 1 - Query the user to get the shows in myList
      const userDoc = await db.collection("users").doc(uid).get();
      const myList = userDoc.data().myList;
      const allShows = await db.collection("show").get();
      const shows = allShows.docs.map((doc) => doc.data());

      const showData = shows.filter((e) => {
        return myList.includes(e.id);
      });
      List.content = showData;

      res.status(200).json(List);
    } catch (error) {
      res.status(500).json("error");
    }
  });

  router.get("/", async (req, res) => {
    try {
      const uid = req.user.uid;
      const userDoc = await db.collection("users").doc(uid).get();
      const myList = userDoc.data().myList;
      res.status(200).json(myList);
    } catch (error) {
      res.status(500).json("error");
    }
  });

  return router;
};
