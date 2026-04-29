// src/utils/projectImages.js
import rapidImg from "../assets/rapid.png";
import molaveImg from "../assets/molave.png";
import flowerShopImg from "../assets/flowershop.png";
import ecBookstoreImg from "../assets/ecbookstore.jpg";
import clothingImg from "../assets/clothing.png";
import school1Img from "../assets/school1.png";
import school2Img from "../assets/school2.png";
import intraImg from "../assets/intra.png";
import scienceImg from "../assets/science.png";
import biniImg from "../assets/bini.png";

// Mapping berdasarkan Title project
export const getProjectImage = (title) => {
  const imageMap = {
    "Molave Street Barbers (Capstone Project)": molaveImg,
    "Rapid Solutions Website (Commission)": rapidImg,
    "Flower Shop Website": flowerShopImg,
    "E-Commerce Web App": ecBookstoreImg,
    "Clothing Website (Commision)": clothingImg,
    "School Website 1 (Commision)": school1Img,
    "School Website 2 (Commision)": school2Img,
    "Intramuros Cultural Website (Commision)": intraImg,
    "Science Lesson Website (Commision)": scienceImg,
    "Bini Redesign": biniImg,
  };
  
  return imageMap[title] || molaveImg; // default fallback
};
