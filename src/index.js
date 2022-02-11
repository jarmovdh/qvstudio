function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  setTimeout(showSlides, 4000); // Change image every 2 seconds
}

pageTransition = () => {
  var timeline = gsap.timeline();

  timeline.to("header", {
    zIndex: 1,
  });

  timeline.to(".page-transition", {
    duration: 1,
    height: "100%",
    top: "0%",
  });

  timeline.to(".page-transition", {
    duration: 0.8,
    height: "100%",
    top: "100%",
    delay: 0.3,
  });

  timeline.set(".page-transition", {
    top: "-100%",
  });
};

mainAnimation = () => {
  var timeline = gsap.timeline();

  timeline.from(".container, .logo, .site-header", {
    duration: 0.3,
    opacity: 0,
    stagger: {
      amount: 0.4,
    },
    delay: 0.9,
  });

  timeline.from(".hero-font", {
    duration: 0.5,
    ease: Power0.easeIn,
    opacity: 0,
    stagger: 0.2,
  });

  timeline.from(".info-title", {
    duration: 0.5,
    x: -150,
    opacity: 0,
    delay: 0.3,
  });

  timeline.from("#ani, #row-about", {
    duration: 0.3,
    y: 15,
    ease: Power0.easeIn,
    opacity: 0,
    stagger: 0.1,
  });
};

function init() {
  // scroll to the top of the page
  barba.hooks.enter(() => {
    window.scrollTo(0, 0);
    showSlides();
  });
}

barba.hooks.enter(() => {
  console.log("enter");
  window.scrollTo(0, 0);

  showSlides();
});

delay = (n) => {
  n = n | 1000;
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });
};

barba.init({
  sync: true,
  transitions: [
    {
      async leave(data) {
        const done = this.async();
        pageTransition();

        await delay(1000);
        done();
      },

      async enter(data) {
        mainAnimation();
      },

      async once(data) {
        mainAnimation();
      },
    },
  ],
});

var slideIndex = 1;

showSlides(slideIndex);
