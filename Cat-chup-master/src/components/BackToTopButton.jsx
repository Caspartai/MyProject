import React from "react";
import backToTopIcon from "../img/backToTopIcon.png";

const BackToTopButton = () => {
  //toggle visibility of scroll
  const scrollDiv = document.getElementsByClassName("Scrolllable");
  //console.log("this is the DOM:", scrollDiv[0]);

  

  const checkScrollTop = () => {
    // if (!showScroll && scrollDiv[0].pageYOffset > 50) {
    //     setShowScroll(true)
    // } else if (showScroll && scrollDiv[0].pageYOffset <= 50) {
    //     setShowScroll(false)
    // }
  };

  const scrollTop = () => {
    scrollDiv[0].scrollTo({ top: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", checkScrollTop);
  return (
    <img
      className="ScrollToTopButton"
      onClick={scrollTop}
      style={{ display:  "flex" }}
      src={backToTopIcon}
      alt="backToTop button"
    ></img>
  );
};


export default BackToTopButton;
