window.addEventListener("load", (e) => {
  const pages = [...document.querySelectorAll(".page")];

  const handleStartTouch = (e) => (startX = e.touches[0].clientX);

  // const handleMoveTouch = (e) => {
  //   const touch = e.touches[0];
  //   const change = startX - touch.clientX;

  //   if (change < 0) {
  //     return;
  //   }
  //   e.target.style.transform = `translateX(${change * -1}px)`;
  // };

  const handleEndTouch = (e) => {
    const change = startX - e.changedTouches[0].clientX;
    const direction = change < 0 ? "right" : "left";
    const half = screen.width / 3;
    const visiblePage = e.target;
    switch (direction) {
      case "right":
        if (Math.abs(change) > half && visiblePage.previousElementSibling) {
          //to the right
          pages.forEach((page) => page.classList.remove("active"));
          visiblePage.addEventListener("transitionend",()=>{
            visiblePage.previousElementSibling.classList.add("active");
          },{
            once: true
          })
         
        }
        break;
      case "left":
        if (Math.abs(change) > half && visiblePage.nextElementSibling) {
          //to the left
          pages.forEach((page) => page.classList.remove("active"));
          visiblePage.addEventListener("transitionend",()=>{
            visiblePage.nextElementSibling.classList.add("active");
          },{
            once:true
          })
        }
        break;
        default:
          break
    }
  };

  pages.forEach((page) => {
    let startX;
    page.addEventListener("touchstart", handleStartTouch, false);
    page.addEventListener("touchend", handleEndTouch, false);
    // page.addEventListener("touchmove", handleMoveTouch, false);
  });

  full_screen_submit.addEventListener("click", async (e) => {
    try {
      document.querySelector("body").requestFullscreen();
      document.querySelector(".modal__container").classList.remove("active");
      document.querySelector(".loader").classList.add("play");
    } catch (err) {
      console.log(err);
    }
  });
  full_screen_cancel.addEventListener("click", () => {
    document.querySelector(".modal__container").classList.remove("active");
    document.querySelector(".loader").classList.add("play");
    document.querySelector(".loader").addEventListener("animationend", () => {
      pages[0].classList.add("active");
    });
  });
});
