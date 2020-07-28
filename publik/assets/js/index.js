const madal = document.querySelector(".modal__container");
window.addEventListener("DOMContentLoaded", (e) => {
  const pages = [...document.querySelectorAll(".page")];

  const loader = document.querySelector(".loader");
  const start = document.getElementById("app-start");
  let isFullscreen;

  const startHandler = (e) => {
    e.preventDefault();
    pages[2].addEventListener(
      "transitionend",
      () => {
        document.querySelector("main").style.display = "none";
        app.classList.add("active");
        app.classList.toggle("load");
        setTimeout(() => {
          madal.querySelector(
            ".modal__content__info"
          ).textContent = `Ця можливість доступна з:
        адреса 1,
        адреса 2`;
          madal.classList.add("active");
          app.classList.toggle("load");
        }, 2000);
      },
      {
        once: true,
      }
    );
    pages[2].classList.add("exit");
    const select = document.querySelector("#select");
    const listOfAnim = document.querySelector(".app-selected");
      document.querySelector(".credit-card").addEventListener("click",function(e){
        if(e.target !== this){
          this.classList.toggle("rotate")
        }
        
      })
    document
      .querySelector(".modal-credit-card")
      .addEventListener("click", function (e) {
        if (e.target === this) {
          this.classList.remove("active");
        }
      });
    const dataCVV = [];

    CVV.addEventListener("input", (e) => {
      if (e.target.value.length >= 3) {
        e.target.blur();
        pay.classList.add("active");
        pay.focus();
      }
    });

    document.querySelectorAll("[name^=date]").forEach((date) => {
      date.addEventListener("input", (e) => {
        if (e.target.value.length % 2 === 0) {
          if (e.target.nextElementSibling) {
            date2.focus();
          } else {
            e.target.offsetParent.parentElement.classList.add("rotate");
            CVV.focus();
          }
        }
      });
    });
    document.querySelector(".credit-card").addEventListener("submit", (e) => {
      e.preventDefault();
      pay.classList.remove("active");
      setTimeout(() => {
        document.querySelector(".modal-credit-card").classList.remove("active");
        app.classList.remove("active");
        app.classList.add("accept");
        document.querySelector("text").addEventListener("click", () => {
          dial.animateStart();
        });
      }, 1000);
    });

    document.querySelectorAll("[name^='number']").forEach((el) => {
      el.addEventListener("input", (e) => {
        if (e.target.value.length % 4 === 0) {
          if (e.target.nextElementSibling) {
            e.target.nextElementSibling.focus();
          } else {
            date1.focus();
          }
        }
      });
    });
    listOfAnim.querySelectorAll(".border").forEach((animation, i, all) => {
      animation.addEventListener("click", function (e) {
        all.forEach((anim) => anim.classList.remove("select"));
        this.addEventListener(
          "transitionend",
          () => {
            document
              .querySelector(".modal-credit-card")
              .classList.add("active");
            document.querySelector(".modal-credit-card").addEventListener(
              "transitionend",
              () => {
                document.querySelector("[name='number1']").focus();
              },
              {
                once: true,
              }
            );
          },
          {
            once: true,
          }
        );
        this.classList.add("select");
      });
    });
    select.querySelectorAll("li").forEach((li, i, list) => {
      li.addEventListener("click", (e) => {
        list.forEach((li) => li.classList.remove("active"));
        e.target.classList.add("active");
        listOfAnim
          .querySelectorAll(".anim-selected")
          .forEach((el) => el.classList.remove("active"));
        listOfAnim
          .querySelector(`[data-anim='${e.target.dataset.anim}'`)
          .classList.add("active");
      });
    });
  };
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
          visiblePage.nextElementSibling.querySelector("video").play();
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
  start.addEventListener("click", startHandler);

  full_screen_submit.addEventListener("click", async (e) => {
    try {
      if (!isFullscreen) {
        isFullscreen = true;
        await document.querySelector("body").requestFullscreen();
        anime({
          targets: ".logo_letter , .description_letter,.X_yello, .X_white",
          strokeDashoffset: [0],
          easing: "easeInOutSine",
          duration: 1500,
          direction: "alternate",
          complete: function(anim) {
            pages[0].classList.add("active");
            document.querySelector(".loader.play").style.display="none"
          }
        });
      }
      madal.classList.remove("active");
      loader.classList.add("play");
      
    } catch (err) {
      console.log(err);
    }
  });
  full_screen_cancel.addEventListener("click", () => {
    isFullscreen = true;
    anime({
      targets: ".logo_letter , .description_letter, .X_white",
      strokeDashoffset: [0],

      easing: "easeInOutSine",
      duration: 1500,
      direction: "alternate",
      complete: function(anim) {
        pages[0].classList.add("active");
        document.querySelector(".loader.play").style.display="none"
      }
    });
    anime({
      targets: " .X_yello",
      strokeDashoffset: [0],
      easing: "easeInOutSine",
      duration: 1500,
      direction: "alternate",
    });

    madal.classList.remove("active");
    loader.classList.add("play");
    
  });
});

var Dial = function (container) {
  this.container = container;
  this.size = this.container.dataset.size;
  this.strokeWidth = this.size / 8;
  this.radius = this.size / 2 - this.strokeWidth / 2;
  this.value = this.container.dataset.value;
  this.direction = this.container.dataset.arrow;
  this.svg;
  this.defs;
  this.slice;
  this.overlay;
  this.text;
  this.arrow;
  this.create();
};

Dial.prototype.create = function () {
  this.createSvg();
  this.createDefs();
  this.createSlice();
  this.createOverlay();
  this.createText();
  this.createArrow();
  this.audio=new Audio("./publik/video/signal.mp3"); 
  this.container.appendChild(this.svg);
};

Dial.prototype.createSvg = function () {
  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", this.size + "px");
  svg.setAttribute("height", this.size + "px");
  this.svg = svg;
};

Dial.prototype.createDefs = function () {
  var defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  var linearGradient = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "linearGradient"
  );
  linearGradient.setAttribute("id", "gradient");
  var stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop1.setAttribute("stop-color", "#6E4AE2");
  stop1.setAttribute("offset", "0%");
  linearGradient.appendChild(stop1);
  var stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop2.setAttribute("stop-color", "#78F8EC");
  stop2.setAttribute("offset", "100%");
  linearGradient.appendChild(stop2);
  var linearGradientBackground = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "linearGradient"
  );
  linearGradientBackground.setAttribute("id", "gradient-background");
  var stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop1.setAttribute("stop-color", "rgba(0, 0, 0, 0.2)");
  stop1.setAttribute("offset", "0%");
  linearGradientBackground.appendChild(stop1);
  var stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop2.setAttribute("stop-color", "rgba(0, 0, 0, 0.05)");
  stop2.setAttribute("offset", "100%");
  linearGradientBackground.appendChild(stop2);
  defs.appendChild(linearGradient);
  defs.appendChild(linearGradientBackground);
  this.svg.appendChild(defs);
  this.defs = defs;
};

Dial.prototype.createSlice = function () {
  var slice = document.createElementNS("http://www.w3.org/2000/svg", "path");
  slice.setAttribute("fill", "none");
  slice.setAttribute("stroke", "url(#gradient)");
  slice.setAttribute("stroke-width", this.strokeWidth);
  slice.setAttribute(
    "transform",
    "translate(" + this.strokeWidth / 2 + "," + this.strokeWidth / 2 + ")"
  );
  slice.setAttribute("class", "animate-draw");
  this.svg.appendChild(slice);
  this.slice = slice;
};

Dial.prototype.createOverlay = function () {
  var r = this.size - this.size / 2 - this.strokeWidth / 2;
  var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", this.size / 2);
  circle.setAttribute("cy", this.size / 2);
  circle.setAttribute("r", r);
  circle.setAttribute("fill", "url(#gradient-background)");
  this.svg.appendChild(circle);
  this.overlay = circle;
};

Dial.prototype.createText = function () {
  var fontSize = this.size / 3.5;
  var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("x", this.size / 2 + fontSize / 7.5);
  text.setAttribute("y", this.size / 2 + fontSize / 4);
  text.setAttribute("font-family", "Century Gothic, Lato");
  text.setAttribute("font-size", fontSize);
  text.setAttribute("fill", "#78F8EC");
  text.setAttribute("text-anchor", "middle");
  var tspanSize = fontSize / 3;
  text.innerHTML =
    0 +
    '<tspan font-size="' +
    tspanSize +
    '" dy="' +
    -tspanSize * 1.2 +
    '">сек</tspan>';
  this.svg.appendChild(text);
  this.text = text;
};

Dial.prototype.createArrow = function () {
  var arrowSize = this.size / 10;
  var arrowYOffset, m;
  if (this.direction === "up") {
    arrowYOffset = arrowSize / 2;
    m = -1;
  } else if (this.direction === "down") {
    arrowYOffset = 0;
    m = 1;
  }
  var arrowPosX = this.size / 2 - arrowSize / 2;
  var arrowPosY = this.size - this.size / 3 + arrowYOffset;
  var arrowDOffset = m * (arrowSize / 1.5);
  var arrow = document.createElementNS("http://www.w3.org/2000/svg", "path");
  arrow.setAttribute(
    "d",
    "M 0 0 " + arrowSize + " 0 " + arrowSize / 2 + " " + arrowDOffset + " 0 0 Z"
  );
  arrow.setAttribute("fill", "#97F8F0");
  arrow.setAttribute("opacity", "0.6");
  arrow.setAttribute(
    "transform",
    "translate(" + arrowPosX + "," + arrowPosY + ")"
  );
  this.svg.appendChild(arrow);
  this.arrow = arrow;
};

Dial.prototype.animateRversStart = function () {
  let self = this;
  let v = self.value;
  let intervalOne = setInterval(function () {
    let a = 0.5;
    let timer
    v -= a;
    
    if(v==20||v==30||v==10){
      self.audio.play();
      window.navigator.vibrate(800)
    }
    if (v <= 0) {
      v = 0;
      clearInterval(intervalOne);
      self.audio.play();
      window.navigator.vibrate(1500);

    }
    self.setValue(v);
  }, 100);
};

Dial.prototype.animateStart = function () {
  var v = 0;
  var self = this;
  var intervalOne = setInterval(function () {
    var p = +(v / self.value).toFixed(2);
    var a = p < 0.95 ? 2 - 2 * p : 0.05;
    v += a;
    if (v >= +self.value) {
      v = self.value;
      clearInterval(intervalOne);
      self.animateRversStart();
    }
    self.setValue(v);
  }, 10);
};

Dial.prototype.animateReset = function () {
  this.setValue(0);
};

Dial.prototype.polarToCartesian = function (
  centerX,
  centerY,
  radius,
  angleInDegrees
) {
  var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

Dial.prototype.describeArc = function (x, y, radius, startAngle, endAngle) {
  var start = this.polarToCartesian(x, y, radius, endAngle);
  var end = this.polarToCartesian(x, y, radius, startAngle);
  var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  var d = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");
  return d;
};

Dial.prototype.setValue = function (value) {
  var c = (value / 100) * 360;
  if (c === 360) c = 359.99;
  var xy = this.size / 2 - this.strokeWidth / 2;
  var d = this.describeArc(xy, xy, xy, 180, 180 + c);
  this.slice.setAttribute("d", d);
  var tspanSize = this.size / 3.5 / 3;
  this.text.innerHTML =
    Math.floor(value) +
    '<tspan font-size="' +
    tspanSize +
    '" dy="' +
    -tspanSize * 1.2 +
    '">сек</tspan>';
};

var containers = document.getElementsByClassName("chart");
var dial = new Dial(containers[0]);
