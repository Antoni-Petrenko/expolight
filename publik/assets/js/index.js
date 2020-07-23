window.addEventListener("load", (e) => {
  const pages = [...document.querySelectorAll(".page")];
  const madal = document.querySelector(".modal__container");
  const loader = document.querySelector(".loader");
  const start=document.getElementById("app-start");
  let isFullscreen;

  const startHandler=(e)=>{
    e.preventDefault();
    pages[2].addEventListener("transitionend",()=>{
      document.querySelector("main").style.display="none";
      app.classList.add("active");
      app.classList.toggle("load");
      setTimeout(()=>{
        madal.querySelector(".modal__content__info").textContent=`Ця можливість доступна з:
        адреса 1,
        адреса 2`;
        madal.classList.add("active");
        app.classList.toggle("load");
       
      },2000)
    }, {
      once: true,
    });
    pages[2].classList.add("exit");
    const select=document.querySelector("#select");
    select.querySelectorAll("li").forEach((li, i,list)=>{
      li.addEventListener("click",(e)=>{
        list.forEach(li=>li.classList.remove("active"))
        e.target.classList.add("active")
        const listOfAnim=document.querySelector(".app-selected");

        listOfAnim.querySelectorAll(".anim-selected").forEach(el=>el.classList.remove("active"));

        listOfAnim.querySelector(`[data-anim='${e.target.dataset.anim}'`).classList.add("active"); 
        
      

      })
    })
    
  }
  const handleButton = (visiblePage, e) => {
    visiblePage.classList.toggle("active");
    visiblePage.addEventListener(
      "transitionend",
      () => {
        visiblePage.nextElementSibling.classList.add("active");
        if (visiblePage.querySelector("video")) {
          visiblePage.querySelector("video").pause();
        }
        if (visiblePage.nextElementSibling.querySelector("video")) {
          visiblePage.nextElementSibling
            .querySelector("video")
            .play();
        }
      },
      {
        once: true,
      }
    );
  };

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
              this.classList.toggle("active");
              visiblePage.addEventListener(
                "transitionend",
                () => {
                  visiblePage.previousElementSibling.classList.add("active");
                  if (visiblePage.querySelector("video")) {
                    visiblePage.querySelector("video").pause();
                  }
                  if (
                    visiblePage.previousElementSibling.querySelector("video")
                  ) {
                    visiblePage.previousElementSibling
                      .querySelector("video")
                      .play();
                  }
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
                  if (visiblePage.querySelector("video")) {
                    visiblePage.querySelector("video").pause();
                  }
                  if (visiblePage.nextElementSibling.querySelector("video")) {
                    visiblePage.nextElementSibling
                      .querySelector("video")
                      .play();
                  }
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

        setTimeout(() => {
          inThrottle = false;
        }, limit);
      }
    };
  };

  pages.forEach((page) => {
    let startX;
    page.addEventListener("touchstart", handleStartTouch, false);
    page.addEventListener("touchend", handleEndTouch(1000), false);
    page
      .querySelector(".card__controll--next")
      .addEventListener("click", handleButton.bind(null, page), false);
  });
  start.addEventListener("click",startHandler);

  full_screen_submit.addEventListener("click", async (e) => {
    try {
      if(!isFullscreen){
        isFullscreen=true;
        document.querySelector("body").requestFullscreen();
      }
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
    isFullscreen=true;
    madal.classList.remove("active");
    loader.classList.add("play");
    loader.addEventListener("animationend", () => {
      pages[0].classList.add("active");
    });
  });
});
