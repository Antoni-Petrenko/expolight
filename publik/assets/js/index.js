window.addEventListener("load", (e) => {
  const pages = [...document.querySelectorAll(".page")];
  const madal= document.querySelector(".modal__container");
  const loader = document.querySelector(".loader");
  const handleStartTouch = (e) => (startX = e.touches[0].clientX);

  const handleEndTouch = (limit) => {
    let inThrottle;
    return function (e) {
      if (!inThrottle) {
        inThrottle = true;
        const change = startX - e.changedTouches[0].clientX;
        const direction = change < 0 ? "right" : "left";
        const half = screen.width / 3;
        const visiblePage = this;
        switch (direction) {
          case "right":
            if (Math.abs(change) > half && visiblePage.previousElementSibling) {
              //to the right
              pages.forEach((page) => page.classList.remove("active"));
              visiblePage.addEventListener(
                "transitionend",
                () => {
                  visiblePage.previousElementSibling.classList.add("active");
                },
                {
                  once: true,
                }
              );
            }
            break;
          case "left":
            if (Math.abs(change) > half && visiblePage.nextElementSibling) {
              //to the left
              pages.forEach((page) => page.classList.remove("active"));
              visiblePage.addEventListener(
                "transitionend",
                () => {
                  visiblePage.nextElementSibling.classList.add("active");
                },
                {
                  once: true,
                }
              );
            }
            break;
          default:
            break;
        }
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };

  pages.forEach((page) => {
    let startX;
    page.addEventListener("touchstart", handleStartTouch,false);
    page.addEventListener("touchend", handleEndTouch(1000), false);
  });

  full_screen_submit.addEventListener("click", async (e) => {
    try {
      document.querySelector("body").requestFullscreen();
      madal.classList.remove("active");
      loader.classList.add("play");
      loader.addEventListener("animationend", () => {
        pages[0].classList.add("active");
      });
    } catch (err) {
      console.log(err);
    }
  });
  full_screen_cancel.addEventListener("click", () => {
    madal.classList.remove("active");
    loader.classList.add("play");
    loader.addEventListener("animationend", () => {
      pages[0].classList.add("active");
    });
  });
});
