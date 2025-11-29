import './style.css'

/////////////////////////////// 1. HERO SLIDER /////////////////////////////////
// --- DATA ---
const slides = [
    {
        id: 1,
        title: "The Future<br/>Awaits You.<br/>Shape it.",
        subtitle: "Join Amrita’s B.Tech programmes, where innovation, technology, and values unite to shape a better tomorrow—for all.",
        videoSrc: "img/amrita-campus-video-home-page.mp4",
        cardTitle: "The Future Awaits You. Shape it.",
        cardDesc: "Join Amrita’s B.Tech programmes, where innovation, technology, and values unite to shape a better tomorrow—for all."
    },
    {
        id: 2,
        title: "Admissions<br/>Open 2025",
        subtitle: "Join Amrita’s B.Tech programmes, where innovation, technology, and values unite to shape a better tomorrow—for all.",
        videoSrc: "img/banner-video.mp4",
        cardTitle: "Admissions Open 2025",
        cardDesc: "Apply now for world-class engineering programs designed for the future."
    },
    {
        id: 3,
        title: "Sustainable Development",
        subtitle: "Join Amrita’s B.Tech programmes, where innovation, technology, and values unite to shape a better tomorrow—for all.",
        videoSrc: "img/header-coimbatore.mov",
        cardTitle: "Center for Sustainable Development",
        cardDesc: "Amrita launches new initiatives to tackle global climate challenges."
    }
];

// --- STATE ---
let currentSlideIndex = 0;

// --- DOM ELEMENTS ---
const videoElement = document.getElementById('hero-video');
const titleElement = document.getElementById('hero-title');
const subtitleElement = document.getElementById('hero-subtitle');

// Card Elements
const cardTitle = document.getElementById('card-title');
const cardDesc = document.getElementById('card-desc');
const cardThumbVideo = document.getElementById('card-thumb-video');
const progressBar = document.getElementById('video-progress-bar'); // NEW Element

// Buttons
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// --- FUNCTIONS ---

function init() {
    // Start initial slide
    loadSlide(0);

    // Setup Video Event Listeners
    setupVideoEvents();
}

function setupVideoEvents() {
    // 1. Auto Play Next Slide when video ends
    videoElement.addEventListener('ended', () => {
        nextSlide();
    });

    // 2. Update Progress Bar
    videoElement.addEventListener('timeupdate', () => {
        if(videoElement.duration) {
            const progress = (videoElement.currentTime / videoElement.duration) * 100;
            progressBar.style.width = `${progress}%`;
        }
    });
}

async function loadSlide(index) {
    currentSlideIndex = index;
    const slide = slides[index];

    // Reset Progress Bar immediately
    progressBar.style.width = '0%';

    // 1. Update Background Video
    videoElement.style.opacity = '0'; 
    
    setTimeout(async () => {
        videoElement.src = slide.videoSrc;
        videoElement.load();
        try {
            const playPromise = videoElement.play();
            if (playPromise !== undefined) {
                await playPromise;
                videoElement.style.opacity = '1';
            }
        } catch (error) {
            console.warn("Video playback issue:", error);
            videoElement.style.opacity = '1'; 
        }
    }, 300);

    // 2. Update Text
    animateTextChange(titleElement, slide.title);
    animateTextChange(subtitleElement, slide.subtitle);

    // 3. Update Card
    updateCardUI(slide);
}

function updateCardUI(slide) {
    cardTitle.style.opacity = '0';
    cardDesc.style.opacity = '0';
    
    setTimeout(() => {
        cardTitle.innerText = slide.cardTitle;
        cardDesc.innerText = slide.cardDesc;
        
        // Thumbnail
        cardThumbVideo.src = slide.videoSrc;
        cardThumbVideo.muted = true;
        cardThumbVideo.play().catch(() => {});

        cardTitle.style.opacity = '1';
        cardDesc.style.opacity = '1';
    }, 200);
}

function animateTextChange(element, newHtml) {
    element.classList.remove('fade-enter-active');
    element.classList.add('fade-enter');
    
    setTimeout(() => {
        element.innerHTML = newHtml;
        element.classList.remove('fade-enter');
        // force reflow
        void element.offsetWidth;
        element.classList.add('fade-enter-active');
    }, 300);
}

function nextSlide() {
    const nextIndex = (currentSlideIndex + 1) % slides.length;
    loadSlide(nextIndex);
}

function prevSlide() {
    const prevIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    loadSlide(prevIndex);
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    init();
    
    // Attach click listeners to the specific IDs
    if(prevBtn) prevBtn.addEventListener('click', prevSlide);
    if(nextBtn) nextBtn.addEventListener('click', nextSlide);
});



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


/////////////////////////////// 5. FOOTER TOOGLE /////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
        // Select all header containers
        const headers = document.querySelectorAll('.toggle-header');

        headers.forEach(header => {
            header.addEventListener('click', () => {
                // Only toggle on mobile (check if the screen is small or if logic should apply globally, 
                // but strictly speaking the layout handles visibility via CSS)
                
                // Find the next sibling UL which is the content
                const content = header.nextElementSibling;
                
                // Find the chevron icon inside the header
                const icon = header.querySelector('.chevron-icon');

                // Toggle visibility
                content.classList.toggle('hidden');
                
                // Rotate icon
                icon.classList.toggle('rotate-180');
            });
        });
    });
