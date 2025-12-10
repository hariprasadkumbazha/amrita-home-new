import './style.css'

/////////////////////////////// 1. MEGA MENU SWITCHER/////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTS ---
    const openBtn = document.getElementById('open-btn');
    const closeBtn = document.getElementById('close-btn');
    const megaMenu = document.getElementById('mega-menu');
    const menuCard = document.getElementById('menu-card');
    const menuOverlay = document.getElementById('menu-overlay');

    // --- OPEN / CLOSE ---
    function openMenu() {
        // 1. Add 'am:' to all classes being removed/added
        megaMenu.classList.remove('am:opacity-0', 'am:pointer-events-none');
        megaMenu.classList.add('am:opacity-100', 'am:pointer-events-auto');
        
        if (menuCard) {
            menuCard.classList.remove('am:scale-95');
            menuCard.classList.add('am:scale-100');
        }
        
        // Ensure this function exists or checks for prefix too
        if (typeof resetToDefault === 'function') {
            resetToDefault(); 
        }
    }

    function closeMenu() {
        // 2. Add 'am:' here as well
        megaMenu.classList.add('am:opacity-0', 'am:pointer-events-none');
        megaMenu.classList.remove('am:opacity-100', 'am:pointer-events-auto');
        
        if (menuCard) {
            menuCard.classList.add('am:scale-95');
            menuCard.classList.remove('am:scale-100');
        }
    }

    if (openBtn) openBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);
});


// --- 1. ROOT SWITCHER (Top Nav: About / Campus / Academics / Research) ---
const switchRoot = (rootId, clickedElement) => {
    
    // A. Visual Styles for Top Nav
    // Note: escape colon with \\ for selectors
    const allRoots = document.querySelectorAll('.am\\:root-nav'); 
    allRoots.forEach(el => {
        // Reset styles (remove Active red color)
        el.classList.remove('am:text-[#AF0C3E]', 'am:font-medium', 'am:active');
        el.classList.add('am:hover:text-gray-800');
        
        // Remove the yellow star if it exists
        const star = el.querySelector('span'); 
        if(star) star.remove();
    });

    // Set Active style
    clickedElement.classList.remove('am:hover:text-gray-800');
    clickedElement.classList.add('am:text-[#AF0C3E]', 'am:font-medium', 'am:active');
    
    // Add the Star (Visual flair)
    const starSpan = document.createElement('span');
    // Updated classes with prefix
    starSpan.className = "am:absolute am:-top-1 am:-right-3 am:text-yellow-400 am:text-xs";
    starSpan.innerHTML = "✦";
    clickedElement.appendChild(starSpan);

    // B. Show Corresponding Sidebar Group
    const allSidebarGroups = document.querySelectorAll('.am\\:sidebar-root-group');
    allSidebarGroups.forEach(grp => grp.classList.add('am:hidden'));

    const targetSidebar = document.getElementById('sidebar-' + rootId);
    if(targetSidebar) {
        targetSidebar.classList.remove('am:hidden');
        
        // C. Automatically Click the FIRST item in this Sidebar
        const firstBtn = targetSidebar.querySelector('.am\\:level-btn');
        if(firstBtn) firstBtn.click();
    }
};

// --- 2. LEVEL SWITCHER (Sidebar: Undergraduate / Leadership / Facilities etc) ---
const switchLevel = (levelId, clickedElement) => {
    
    // Reset Sidebar Buttons Styles (globally)
    const allLevelBtns = document.querySelectorAll('.am\\:level-btn');
    allLevelBtns.forEach(btn => {
        btn.classList.remove('am:text-[#AF0C3E]', 'am:font-medium', 'am:border-[#AF0C3E]');
        btn.classList.add('am:text-gray-500', 'am:border-transparent');
    });

    // Set Active Style
    clickedElement.classList.remove('am:text-gray-500', 'am:border-transparent');
    clickedElement.classList.add('am:text-[#AF0C3E]', 'am:font-medium', 'am:border-[#AF0C3E]');

    // Hide ALL Tab Groups (Middle)
    const allLevelGroups = document.querySelectorAll('.am\\:level-group');
    allLevelGroups.forEach(group => group.classList.add('am:hidden'));

    // Show the specific Tab Group
    const targetGroup = document.getElementById('tabs-' + levelId);
    if (targetGroup) {
        targetGroup.classList.remove('am:hidden');
        
        // Auto-click the first tab in this group
        const firstTab = targetGroup.querySelector('.am\\:tab-btn');
        if(firstTab) firstTab.click();
    }
};


// --- 3. TAB SWITCHER (Middle: Arts / Engineering / Vision etc) ---
const switchTab = (contentId, clickedElement) => {
    // Hide ALL content sections
    const allContents = document.querySelectorAll('.am\\:tab-content');
    allContents.forEach(div => div.classList.add('am:hidden'));

    // Show selected content
    const targetContent = document.getElementById('content-' + contentId);
    if (targetContent) {
        targetContent.classList.remove('am:hidden');
    }

    // Reset Tab Styles
    const allButtons = document.querySelectorAll('.am\\:tab-btn');
    allButtons.forEach(btn => {
        // Remove Active
        btn.classList.remove('am:bg-white', 'am:shadow-sm', 'am:border-[#AF0C3E]', 'am:active');
        // Add Inactive
        btn.classList.add('am:hover:bg-white', 'am:hover:shadow-md', 'am:border-transparent', 'am:hover:border-[#AF0C3E]');
    });

    // Set Active Tab Style
    clickedElement.classList.remove('am:hover:bg-white', 'am:hover:shadow-md', 'am:border-transparent', 'am:hover:border-[#AF0C3E]');
    clickedElement.classList.add('am:bg-white', 'am:shadow-sm', 'am:border-[#AF0C3E]', 'am:active');
};


// --- 4. RESET TO DEFAULT (Academics -> Undergraduate) ---
const resetToDefault = () => {
    // Find the Academics root button
    const rootBtns = document.querySelectorAll('.am\\:root-nav');
    const academicsBtn = Array.from(rootBtns).find(el => el.innerText.includes('Academics'));
    
    if(academicsBtn) {
        academicsBtn.click();
    }
}

// Expose to window
window.switchRoot = switchRoot;
window.switchLevel = switchLevel;
window.switchTab = switchTab;
window.resetToDefault = resetToDefault;



/////////////////////////////// 2. HERO SLIDER /////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  
  // ============================================
  // PART A: MEGA MENU LOGIC
  // ============================================
  const openBtn = document.getElementById("open-btn");
  const closeBtn = document.getElementById("close-btn");
  const megaMenu = document.getElementById("mega-menu");
  const menuCard = document.getElementById("menu-card");

  // Teleport menu to body to avoid clipping
  if (megaMenu) { document.body.appendChild(megaMenu); }

  if (openBtn && megaMenu && menuCard) {
    openBtn.addEventListener("click", () => {
      megaMenu.style.pointerEvents = "auto";
      megaMenu.style.opacity = "1";
      menuCard.classList.remove("am:scale-95");
      menuCard.classList.add("am:scale-100");
    });

    closeBtn.addEventListener("click", () => {
      megaMenu.style.opacity = "0";
      megaMenu.style.pointerEvents = "none";
      menuCard.classList.remove("am:scale-100");
      menuCard.classList.add("am:scale-95");
    });
  }

  // ============================================
  // PART B: HERO VIDEO SLIDER LOGIC
  // ============================================
  let slides = [];
  let currentSlideIndex = 0;

  // DOM Elements
  const videoElement = document.getElementById('hero-video');
  const titleElement = document.getElementById('hero-title');
  const subtitleElement = document.getElementById('hero-subtitle');
  const cardTitle = document.getElementById('card-title');
  const cardDesc = document.getElementById('card-desc');
  const cardThumbVideo = document.getElementById('card-thumb-video');
  const progressBar = document.getElementById('video-progress-bar');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  function initSlider() {
    // 1. Fetch data from HTML
    const dataContainer = document.getElementById('hero-slides-data');
    if (dataContainer) {
      const items = dataContainer.querySelectorAll('.slide-item');
      slides = Array.from(items).map((item, index) => {
        return {
          id: index,
          videoSrc: item.getAttribute('data-video-src'),
          title: item.querySelector('.slide-title').innerHTML,
          subtitle: item.querySelector('.slide-subtitle').innerText,
          cardTitle: item.querySelector('.slide-card-title').innerText,
          cardDesc: item.querySelector('.slide-card-desc').innerText
        };
      });
    }

    // 2. Start Slider
    if (slides.length > 0) {
      loadSlide(0);
      
      // Auto-next on video end
      if (videoElement) {
        videoElement.addEventListener('ended', nextSlide);
        videoElement.addEventListener('timeupdate', () => {
          if (videoElement.duration && progressBar) {
            const progress = (videoElement.currentTime / videoElement.duration) * 100;
            progressBar.style.width = `${progress}%`;
          }
        });
      }
    }
  }

  async function loadSlide(index) {
    if (!slides[index]) return;
    currentSlideIndex = index;
    const slide = slides[index];

    if (progressBar) progressBar.style.width = '0%';

    // Change Video
    if (videoElement) {
      videoElement.style.opacity = '0';
      setTimeout(async () => {
        videoElement.src = slide.videoSrc;
        try {
          await videoElement.play();
          videoElement.style.opacity = '1';
        } catch (e) { videoElement.style.opacity = '1'; }
      }, 300);
    }

    // Animate Text
    if (titleElement) animateTextChange(titleElement, slide.title);
    if (subtitleElement) animateTextChange(subtitleElement, slide.subtitle);

    // Update Card
    if (cardTitle && cardDesc) {
      cardTitle.style.opacity = '0';
      cardDesc.style.opacity = '0';
      setTimeout(() => {
        cardTitle.innerText = slide.cardTitle;
        cardDesc.innerText = slide.cardDesc;
        if (cardThumbVideo) {
          cardThumbVideo.src = slide.videoSrc;
          cardThumbVideo.play().catch(() => {});
        }
        cardTitle.style.opacity = '1';
        cardDesc.style.opacity = '1';
      }, 200);
    }
  }

  function animateTextChange(element, newHtml) {
    element.classList.remove('fade-enter-active');
    element.classList.add('fade-enter');
    setTimeout(() => {
      element.innerHTML = newHtml;
      element.classList.remove('fade-enter');
      void element.offsetWidth; // force reflow
      element.classList.add('fade-enter-active');
    }, 300);
  }

  function nextSlide() {
    if (slides.length === 0) return;
    loadSlide((currentSlideIndex + 1) % slides.length);
  }

  function prevSlide() {
    if (slides.length === 0) return;
    loadSlide((currentSlideIndex - 1 + slides.length) % slides.length);
  }

  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);

  // Initialize
  initSlider();
});


/////////////////////////////// 3. HAPPENINGS AT AMRITA /////////////////////////////////
const happeningsSwiper = new Swiper('[class~="am:HappeningsAtAmrita"]', {
  slidesPerView: 1,
  spaceBetween: 20,
  speed: 800,
  grabCursor: true,
  autoplay: true,
  
  // NOTE: Swiper will look for 'swiper-wrapper' and 'swiper-slide' by default.
  // We added those back to the HTML above.

  breakpoints: {
    640: { slidesPerView: 2, spaceBetween: 20 },
    1024: { slidesPerView: 3, spaceBetween: 32 },
  },

  // Navigation (Safe Selectors for am: prefixes)
  navigation: {
    nextEl: '[class~="am:happenings-next"]',
    prevEl: '[class~="am:happenings-prev"]',
  },
  
  // Pagination (Safe Selector)
  pagination: {
    el: '[class~="am:happenings-pagination"]',
    type: "progressbar",
  },
});

/////////////////////////////// 4. UPCOMING EVENTS /////////////////////////////////
// Assuming you prefixed this in HTML as 'am:UpcomingEvents'
const eventsSwiper = new Swiper('[class~="am:UpcomingEvents"]', {
  slidesPerView: 1,
  spaceBetween: 20,
  speed: 800,
  grabCursor: true,
  autoplay: true,
  
  breakpoints: {
    640: { slidesPerView: 2, spaceBetween: 20 },
    1024: { slidesPerView: 3, spaceBetween: 32 },
  },

  navigation: {
    nextEl: '[class~="am:events-next"]',
    prevEl: '[class~="am:events-prev"]',
  },
  pagination: {
    el: '[class~="am:events-pagination"]',
    type: "progressbar",
  },
});

/////////////////////////////// 5. VIDEO SLIDER /////////////////////////////////
// Assuming you prefixed this in HTML as 'am:VideoSlider'
const videoSwiper = new Swiper('[class~="am:VideoSlider"]', {
  slidesPerView: 1,
  spaceBetween: 0,
  speed: 800,
  grabCursor: true,
  autoplay: true,
  
  breakpoints: {
    640: { slidesPerView: 1, spaceBetween: 0 },
    1024: { slidesPerView: 4, spaceBetween: 0 },
  },

  pagination: {
    el: '[class~="am:video-pagination"]', 
    type: "progressbar",
  },
});

/////////////////////////////// 6. SPOTLIGHT PROJECTS /////////////////////////////////
const spotlightSwiper = new Swiper('[class~="am:SpotlightProjects"]', {
  slidesPerView: 1,
  spaceBetween: 20,
  speed: 800,
  grabCursor: true,
  autoplay: true,
  
  breakpoints: {
    640: { slidesPerView: 2, spaceBetween: 20 },
    1024: { slidesPerView: 3, spaceBetween: 32 },
  },

  // UNIQUE SELECTORS (Using Attribute Selector for 'am:' prefix)
  navigation: {
    nextEl: '[class~="am:spotlight-next"]',
    prevEl: '[class~="am:spotlight-prev"]',
  },
  pagination: {
    el: '[class~="am:spotlight-pagination"]',
    type: "progressbar",
  },
});


/////////////////////////////// 7. FOOTER TOOGLE /////////////////////////////////
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