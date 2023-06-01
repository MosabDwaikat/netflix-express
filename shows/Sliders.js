const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", async (req, res) => {
    try {
      const sliders = [];

      // First Slider
      const firstSliderRef = db.collection("show").where("id", ">", 0);
      const firstSliderSnapshot = await firstSliderRef.get();
      const firstSliderData = firstSliderSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      const firstSlider = {
        title: "First Slider",
        content: firstSliderData,
      };
      sliders.push(firstSlider);

      // Second Slider
      const secondSliderRef = db.collection("show").where("id", ">", 0);
      const secondSliderSnapshot = await secondSliderRef.get();
      const secondSliderData = secondSliderSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      const secondSlider = {
        title: "Second Slider",
        content: secondSliderData,
      };
      sliders.push(secondSlider);

      // Third Slider
      const thirdSliderRef = db.collection("show").where("id", ">", 0);
      const thirdSliderSnapshot = await thirdSliderRef.get();
      const thirdSliderData = thirdSliderSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      const thirdSlider = {
        title: "Third Slider",
        content: thirdSliderData,
      };
      sliders.push(thirdSlider);

      res.status(200).json(sliders);
    } catch (error) {
      console.error("Error retrieving Firestore data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  return router;
};
