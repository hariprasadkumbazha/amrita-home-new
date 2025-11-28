import './style.css'

/////////////////////////////// 1. HAPPENINGS AT AMRITA /////////////////////////////////
const happeningsSwiper = new Swiper(".HappeningsAtAmrita", {
  slidesPerView: 1,
  spaceBetween: 20,
  speed: 800,
  grabCursor: true,
  autoplay: true,
  
  breakpoints: {
    640: { slidesPerView: 2, spaceBetween: 20 },
    1024: { slidesPerView: 3, spaceBetween: 32 },
  },

  // UNIQUE SELECTORS
  navigation: {
    nextEl: ".happenings-next", // Target specific button
    prevEl: ".happenings-prev",
  },
  pagination: {
    el: ".happenings-pagination", // Target specific progress bar
    type: "progressbar",
  },
});

/////////////////////////////// 2. UPCOMING EVENTS /////////////////////////////////
const eventsSwiper = new Swiper(".UpcomingEvents", {
  slidesPerView: 1,
  spaceBetween: 20,
  speed: 800,
  grabCursor: true,
  autoplay: true,
  
  breakpoints: {
    640: { slidesPerView: 2, spaceBetween: 20 },
    1024: { slidesPerView: 3, spaceBetween: 32 },
  },

  // UNIQUE SELECTORS
  navigation: {
    nextEl: ".events-next",
    prevEl: ".events-prev",
  },
  pagination: {
    el: ".events-pagination",
    type: "progressbar",
  },
});

/////////////////////////////// 3. VIDEO SLIDER /////////////////////////////////
const videoSwiper = new Swiper(".VideoSlider", {
  slidesPerView: 1,
  spaceBetween: 0,
  speed: 800,
  grabCursor: true,
  autoplay: true,
  
  breakpoints: {
    640: { slidesPerView: 1, spaceBetween: 0 },
    1024: { slidesPerView: 4, spaceBetween: 0 },
  },

  // Video slider usually doesn't have arrows, but if it does, add unique classes
  pagination: {
    el: ".video-pagination", 
    type: "progressbar",
  },
});

/////////////////////////////// 4. SPOTLIGHT PROJECTS /////////////////////////////////
const spotlightSwiper = new Swiper(".SpotlightProjects", {
  slidesPerView: 1,
  spaceBetween: 20,
  speed: 800,
  grabCursor: true,
  autoplay: true,
  
  breakpoints: {
    640: { slidesPerView: 2, spaceBetween: 20 },
    1024: { slidesPerView: 3, spaceBetween: 32 },
  },

  // UNIQUE SELECTORS
  navigation: {
    nextEl: ".spotlight-next",
    prevEl: ".spotlight-prev",
  },
  pagination: {
    el: ".spotlight-pagination",
    type: "progressbar",
  },
});