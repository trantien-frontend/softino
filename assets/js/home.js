window.onload = () => {
  const home = {
    init: function () {
      this.counterUp(".count", ".block-item__text h4", ".count");
      this.counterUp(".count-home", ".count-home__item span", ".count-home");
      this.clientSlide(".client-home",".client-home__content-item", ".client-home__dots-list .dots-list__item", ".client--active","client--active");
      this.navigation();
      this.navigationScroll();
      this.theme();
      this.popup();
      this.upTop(".hero",".button-up");
    },
    navigation: function () {
      const btn = document.querySelector(".content-icon__bars");
      const navMenu = document.querySelector(".nav__content-menu");
      const btnsSubMenu = [
        ...navMenu.querySelectorAll(".content-menu__list-link"),
      ];
      const subMenu = navMenu.querySelectorAll(".sub-menu");
      btn.addEventListener("click", () => {
        navMenu.classList.toggle("showMenu");
        btn.classList.toggle("barActive");
      });
      btnsSubMenu.forEach((btnSubMenu) => {
        btnSubMenu.addEventListener("click", (e) => {
          btnSubMenu.nextElementSibling.classList.toggle("sub-menu--show");
          let currentbtn = e.target;
          currentbtn.classList.toggle("content-menu__list-link--minus");
        });
      });
    },
    navigationScroll() {
      const nav = document.querySelector(".nav");
      const height = nav.offsetHeight;
      window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll >= height) {
          nav.classList.add("navfixed");
        } else {
          nav.classList.remove("navfixed");
        }
      });
    },
    theme: function () {
      const btnscolor = document.querySelectorAll(".color");
      let logos = document.querySelectorAll(".logo");
      const themeBtn = document.querySelector(".Theme__table-icon");
      const theme = document.querySelector(".Theme__table");
      btnscolor.forEach((btncolor, index) => {
        // click button change theme
        btncolor.addEventListener("click", () => {
          logos.forEach((logo) => {
            if (index > 0) {
              logo.src = `./images/Logo-${index}.png`;
            } else {
              logo.src = `./images/Logo.png`;
            }
          });
          let btnActive;
          let buttonActive = document.querySelector(".color--active");
          for (
            btnActive = 0;
            (buttonActive = buttonActive.previousElementSibling);
            btnActive++
          ) {}
          btnscolor[btnActive].classList.remove("color--active");
          btncolor.classList.add("color--active");
          let color = btncolor.dataset.color;
          let root = document.documentElement;
          root.style.setProperty("--color", color);
        });
      });
      // click show table change theme
      themeBtn.addEventListener("click", () => {
        theme.classList.toggle("Theme__table--active");
      });
    },
    counterUp: function (container, number, height) {
      const blockContainer = document.querySelector(container);
      if (!blockContainer) {
        return false;
      }
      const counts = document.querySelectorAll(number);
      const heightCountstoWrapper = document.querySelector(height).offsetTop;
      window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll >= heightCountstoWrapper - 387) {
          counts.forEach(function (counter) {
            const updateCount = () => {
              const target = +counter.getAttribute("data-count");
              const count = +counter.innerText;
              if (count < target) {
                counter.innerText = count + 1;
                setTimeout(updateCount, 10);
              } else {
                count.innerText = target;
              }
            };
            updateCount();
          });
        }
      });
    },
    clientSlide: function (container,itemsSlide,itemDots,classActive,classNeedAdd) {
      // container  
      const isCheck = document.querySelector(container);
      if (!isCheck) { return false }
      // itemsSlide
      const slideItems = [
        ...document.querySelectorAll(itemsSlide),
      ];
      // itemDots
      const dots = [
        ...document.querySelectorAll(
          itemDots
        ),
      ];
      function autoRun() {
        const time = setInterval(() => {
          let indexSlide = 0;
          // classActive
          let slideActive = document.querySelector(
            classActive
          );
          let classtext = slideActive.className;
          for (
            indexSlide;
            (slideActive = slideActive.previousElementSibling);
            indexSlide++
          );
          if (indexSlide < slideItems.length - 1) {
            // index Slide
            slideItems[indexSlide].classList.add("hide");
            slideItems[indexSlide].addEventListener("animationend", () => {
              slideItems[indexSlide].classList.remove("hide");
              slideItems[indexSlide].classList.remove(
                classNeedAdd
              );
            });
            dots.forEach((dot) => {
              dot.classList.remove("dot--active");
            });
            dots[indexSlide].nextElementSibling.classList.add("dot--active");
            // next Slide
            slideItems[indexSlide].nextElementSibling.classList.add(
              classNeedAdd
            );
            slideItems[indexSlide].nextElementSibling.classList.add("hide");
            slideItems[indexSlide].nextElementSibling.addEventListener(
              "animationend",
              () => {
                slideItems[indexSlide].nextElementSibling.classList.remove(
                  "hide"
                );
                slideItems[indexSlide].nextElementSibling.classList.add(
                  classNeedAdd
                );
              }
            );
          } else {
            slideItems[indexSlide].classList.add("show");
            slideItems[indexSlide].addEventListener("animationend", () => {
              slideItems[indexSlide].classList.remove("show");
              slideItems[indexSlide].classList.remove(
                classNeedAdd
              );
            });
            slideItems[0].classList.add(classNeedAdd);
            slideItems[0].classList.add("show");
            slideItems[0].addEventListener("animationend", () => {
              slideItems[0].classList.remove("show");
              slideItems[0].classList.add(classNeedAdd);
            });
            dots.forEach((dot) => {
              dot.classList.remove("dot--active");
            });
            dots[0].classList.add("dot--active");
          }
        }, 4000);
        function slides() {
          let slideActive = document.querySelector(
            ".client--active"
          );
          for (
            indexSlide = 0;
            (slideActive = slideActive.previousElementSibling);
            indexSlide++
          );
          return indexSlide;
        }
        // animation - 1
        function runningLeft(dotIndex, indexSlide) {
          slideItems[indexSlide].classList.add("hide");
          slideItems[indexSlide].addEventListener("animationend", () => {
            slideItems[indexSlide].classList.remove("hide");
            slideItems[indexSlide].classList.remove(
              classNeedAdd
            );
          });
          slideItems[dotIndex].classList.add("hide");
          slideItems[dotIndex].classList.add(
            classNeedAdd
          );
          slideItems[dotIndex].addEventListener("animationend", () => {
            slideItems[dotIndex].classList.remove("hide");
            slideItems[dotIndex].classList.add(
              classNeedAdd
            );
          });
        }
        function runningRight(dotIndex, indexSlide) {
          slideItems[indexSlide].classList.add("show");
          slideItems[indexSlide].addEventListener("animationend", () => {
            slideItems[indexSlide].classList.remove("show");
            slideItems[indexSlide].classList.remove(
              classNeedAdd
            );
          });
          slideItems[dotIndex].classList.add("show");
          slideItems[dotIndex].classList.add(
            classNeedAdd
          );
          slideItems[dotIndex].addEventListener("animationend", () => {
            slideItems[dotIndex].classList.remove("show");
            slideItems[dotIndex].classList.add(
              classNeedAdd
            );
          });
        }
        // main function
        function stopSlide() {
          let isStatus = "default";
          for (let i = 0; i < dots.length; i++) {
            dots[i].addEventListener("click", (element) => {
              clearInterval(time);
              if (dots[i].matches(".dot--active")) {
                element.preventDefault();
              } else {
                dots.forEach((dot) => {
                  dot.classList.remove("dot--active");
                });
                dots[i].classList.add("dot--active");
                let dotActive = dots[i];
                for (
                  dotIndex = 0;
                  (dotActive = dotActive.previousElementSibling);
                  dotIndex++
                ) {}
                let indexSlide = slides();
                if (dotIndex > indexSlide) {
                  runningLeft(dotIndex, indexSlide);
                } else {
                  runningRight(dotIndex, indexSlide);
                }
              }
            });
          }
        }
        stopSlide();
      }
      autoRun();
    },
    popup: function () {
      const body = document.querySelector("body");
      console.log(body);
      const overlay = document.querySelector(".overlay-screen");
      const popup = document.querySelector(".popup-video");
      const btnRemove = document.querySelector(
        ".popup-video__content-button .fas"
      );
      const btnShow = document.querySelector(".video__img-button");
      // showPopup
      btnShow.addEventListener("click", () => {
        popup.classList.add("showPopup");
        overlay.classList.add("showOvl");
        body.style.overflow = "hidden";
      });

      btnRemove.addEventListener("click", () => {
        popup.classList.remove("showPopup");
        overlay.classList.remove("showOvl");
        body.style.overflow = "auto";
      });

      overlay.addEventListener("click", () => {
        popup.classList.remove("showPopup");
        overlay.classList.remove("showOvl");
        body.style.overflow = "auto";
      });
    },
    upTop: function (findHeight,button) {
      const height = document.querySelector(findHeight).offsetTop;
      const buttonTop = document.querySelector(button);
      window.addEventListener('scroll',()=>{
        const currentY = window.pageYOffset;
        console.log(currentY);
        if ( currentY >= height ){
          buttonTop.classList.add('button-up--active');
        } else{
          buttonTop.classList.remove('button-up--active')
        }
      })

      buttonTop.addEventListener("click", ()=>{
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
    },
  };
  home.init();
};
