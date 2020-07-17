window.addEventListener("load", e => {
  const pages = [...document.querySelectorAll(".page")];

  const handleStartTouch = e => {
    alert(e.target.classList)
    e.target.style.transition = "transform 0.1s linear";
    startX = e.touches[0].clientX;
  };

  const handleMoveTouch = e => {
    const touch = e.touches[0];
    const change = startX - touch.clientX;

    if (change < 0) {
      return;
    }
    e.target.style.transform = `translateX(${change * -1}px)`; 
  };

  const handleEndTouch = e => {
    e.target.style.transition = "transform 0.3s linear";
    const change = startX - e.changedTouches[0].clientX;
    const half = screen.width / 3;

    if (change < half) {
      e.target.style.transform = `translate(0)`;
    } else {
      e.target.style.transform = `translate(-100%)`;

      if (!e.target.nextElementSibling) {}
    }
  };

  pages.forEach(page => {
    let startX;
    page.addEventListener("touchstart", handleStartTouch, false);
    page.addEventListener("touchend", handleEndTouch, false);
    page.addEventListener("touchmove", handleMoveTouch, false);
  });
  full_screen_submit.addEventListener("click", async e => {
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
  });
});