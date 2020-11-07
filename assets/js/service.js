window.onload = () => {
  const service = {
    init: function () {
      this.navigation();
      this.navigationScroll();
      this.theme();
      this.counterUp(".block-item__text h4", ".count");
      this.clientSlide();
    },
    navigation: function () {
      const btn = document.querySelector(".content-icon__bars");
      const navMenu = document.querySelector(".nav__content-menu");
      const btnsSubMenu = [...navMenu.querySelectorAll(".content-menu__list-link")];
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
    theme: function() {
      const btnscolor = document.querySelectorAll('.color');
      let logos = document.querySelectorAll('.logo');
      const themeBtn = document.querySelector(".Theme__table-icon");
      const theme = document.querySelector(".Theme__table");
      btnscolor.forEach((btncolor,index)=>{
        // click button change theme
        btncolor.addEventListener('click',()=>{
          logos.forEach(logo=>{
            if(index > 0 ){
              logo.src = `./images/Logo-${index}.png`;
            } else{
              logo.src = `./images/Logo.png`;
            }
          })
          let btnActive;
          let buttonActive = document.querySelector('.color--active');
          for(btnActive = 0 ;buttonActive = buttonActive.previousElementSibling ; btnActive++){}
          btnscolor[btnActive].classList.remove('color--active');
          btncolor.classList.add('color--active')
          let color = btncolor.dataset.color; 
          let root = document.documentElement; 
          root.style.setProperty('--color',color);
        })
      })
      // click show table change theme
      themeBtn.addEventListener('click',()=>{
        theme.classList.toggle('Theme__table--active');
      })
    },
    counterUp: function (number, height) {
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
    clientSlide: function () {
      const slideItems = [
        ...document.querySelectorAll(".client .client__blocks-item"),
      ];
      console.log(slideItems[0]);
      const dots = [...document.querySelectorAll(".client__blocks-dots .dot")];
      function autoRun() {
        const time = setInterval(() => {
          let indexSlide = 0;
          let slideActive = document.querySelector(
            ".client__blocks-item--active"
          );
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
                "client__blocks-item--active"
              );
            });
            dots.forEach((dot) => {
              dot.classList.remove("dot--active");
            });
            dots[indexSlide].nextElementSibling.classList.add("dot--active");
            // next Slide
            slideItems[indexSlide].nextElementSibling.classList.add(
              "client__blocks-item--active"
            );
            slideItems[indexSlide].nextElementSibling.classList.add("hide");
            slideItems[indexSlide].nextElementSibling.addEventListener(
              "animationend",
              () => {
                slideItems[indexSlide].nextElementSibling.classList.remove(
                  "hide"
                );
                slideItems[indexSlide].nextElementSibling.classList.add(
                  "client__blocks-item--active"
                );
              }
            );
          } else {
            slideItems[indexSlide].classList.add("show");
            slideItems[indexSlide].addEventListener("animationend", () => {
              slideItems[indexSlide].classList.remove("show");
              slideItems[indexSlide].classList.remove(
                "client__blocks-item--active"
              );
            });
            slideItems[0].classList.add("client__blocks-item--active");
            slideItems[0].classList.add("show");
            slideItems[0].addEventListener("animationend", () => {
              slideItems[0].classList.remove("show");
              slideItems[0].classList.add("client__blocks-item--active");
            });
            dots.forEach((dot) => {
              dot.classList.remove("dot--active");
            });
            dots[0].classList.add("dot--active");
          }
        }, 4000);
        function slides() {
          let slideActive = document.querySelector(
            ".client__blocks-item--active"
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
              "client__blocks-item--active"
            );
          });
          slideItems[dotIndex].classList.add("hide");
          slideItems[dotIndex].classList.add("client__blocks-item--active");
          slideItems[dotIndex].addEventListener("animationend", () => {
            slideItems[dotIndex].classList.remove("hide");
            slideItems[dotIndex].classList.add("client__blocks-item--active");
          });
        }
        function runningRight(dotIndex, indexSlide) {
          slideItems[indexSlide].classList.add("show");
          slideItems[indexSlide].addEventListener("animationend", () => {
            slideItems[indexSlide].classList.remove("show");
            slideItems[indexSlide].classList.remove(
              "client__blocks-item--active"
            );
          });
          slideItems[dotIndex].classList.add("show");
          slideItems[dotIndex].classList.add("client__blocks-item--active");
          slideItems[dotIndex].addEventListener("animationend", () => {
            slideItems[dotIndex].classList.remove("show");
            slideItems[dotIndex].classList.add("client__blocks-item--active");
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
  };
  service.init();
};
