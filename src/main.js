import './style.css'

/////////////////////////////// 1. MEGA MENU SWITCHER/////////////////////////////////

// ==================================================================
// 1. MOBILE NAVIGATION LOGIC (STACK BASED)
// ==================================================================
let navStack = []; // Stores IDs of views we've visited: ['root', 'academics', 'academics-ug']

const mobileNavigate = (targetViewId, title) => {
    // 1. Push current view to stack if we are at root
    if (navStack.length === 0) navStack.push('root');
    
    // 2. Add new target to stack
    navStack.push(targetViewId);

    // 3. Update UI
    updateMobileView(targetViewId, title);
};

const mobileGoBack = () => {
    if (navStack.length <= 1) return; // Can't go back from root

    // 1. Pop current view
    const currentViewId = navStack.pop();
    // Hide current
    const currentEl = document.getElementById('m-view-' + currentViewId);
    if(currentEl) currentEl.classList.add('am:translate-x-full');

    // 2. Get previous view
    const prevViewId = navStack[navStack.length - 1];
    
    // 3. Determine Title for Previous View
    let prevTitle = "";
    if(prevViewId === 'root') prevTitle = ""; // Logo shows
    else if(prevViewId.includes('academics-ug-')) prevTitle = "Undergraduate"; // e.g. coming back from arts
    else if(prevViewId === 'academics-ug') prevTitle = "Academics";
    else if(prevViewId === 'academics') prevTitle = "Academics";
    
    // 4. Update UI (Show previous)
    updateMobileHeader(prevViewId, prevTitle);
};

const updateMobileView = (viewId, title) => {
    // Slide in target view
    const targetEl = document.getElementById('m-view-' + viewId);
    if(targetEl) targetEl.classList.remove('am:translate-x-full');
    
    updateMobileHeader(viewId, title);
};

const updateMobileHeader = (viewId, title) => {
    const logo = document.getElementById('menu-logo');
    const navHeader = document.getElementById('mobile-nav-header');
    const navTitle = document.getElementById('mobile-nav-title');

    if (viewId === 'root') {
        logo.classList.remove('am:hidden');
        logo.classList.add('am:block');
        navHeader.classList.remove('am:flex');
        navHeader.classList.add('am:hidden');
        navStack = []; // Reset stack
    } else {
        logo.classList.remove('am:block');
        logo.classList.add('am:hidden');
        navHeader.classList.remove('am:hidden');
        navHeader.classList.add('am:flex');
        navTitle.innerText = title;
    }
}


// ==================================================================
// 2. GENERAL DOM LOGIC
// ==================================================================
document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('open-btn');
    const closeBtn = document.getElementById('close-btn');
    const megaMenu = document.getElementById('mega-menu');
    const menuCard = document.getElementById('menu-card');

    function toggleMenu(isOpen) {
        if (isOpen) {
            megaMenu.classList.remove('am:opacity-0', 'am:pointer-events-none');
            megaMenu.classList.add('am:opacity-100', 'am:pointer-events-auto');
            if (menuCard) {
                menuCard.classList.remove('am:scale-95');
                menuCard.classList.add('am:scale-100');
            }
            // Reset Mobile State on Open
            document.querySelectorAll('.am\\:mobile-view').forEach(el => {
                if(el.id !== 'm-view-root') el.classList.add('am:translate-x-full');
            });
            updateMobileHeader('root', '');
        } else {
            megaMenu.classList.add('am:opacity-0', 'am:pointer-events-none');
            megaMenu.classList.remove('am:opacity-100', 'am:pointer-events-auto');
            if (menuCard) {
                menuCard.classList.add('am:scale-95');
                menuCard.classList.remove('am:scale-100');
            }
        }
    }
    if (openBtn) openBtn.addEventListener('click', () => toggleMenu(true));
    if (closeBtn) closeBtn.addEventListener('click', () => toggleMenu(false));
    document.getElementById('menu-overlay').addEventListener('click', () => toggleMenu(false));
});


// ==================================================================
// DESKTOP NAVIGATION SWITCHER (ROOT LEVEL)
// ==================================================================
const switchRoot = (rootId, clickedElement) => {
    // 1. Reset Header Styles (Stars, colors)
    document.querySelectorAll('.am\\:root-nav').forEach(el => {
        el.classList.remove('am:text-[#AF0C3E]', 'am:font-medium', 'am:active');
        el.classList.add('am:text-gray-400');
        const star = el.querySelector('span'); if(star) star.remove();
    });
    
    // 2. Set Active Header Style
    clickedElement.classList.remove('am:text-gray-400');
    clickedElement.classList.add('am:text-[#AF0C3E]', 'am:font-medium', 'am:active');
    
    // Add Star Icon
    const starSpan = document.createElement('span');
    starSpan.className = "am:absolute am:-top-1 am:-right-3 am:text-yellow-400 am:text-xs";
    starSpan.innerHTML = "✦";
    clickedElement.appendChild(starSpan);

    // 3. Layout Handling
    const layoutSplit = document.getElementById('layout-split'); 
    const layoutFull = document.getElementById('layout-full');
    
    // Hide all sidebars and views first
    document.querySelectorAll('.am\\:sidebar-root-group').forEach(el => el.classList.add('am:hidden'));
    document.querySelectorAll('.am\\:view-container').forEach(el => el.classList.add('am:hidden'));

    if (rootId === 'campus') {
        // --- LOGIC 2: CAMPUS (Full Grid) ---
        layoutSplit.classList.add('am:hidden');
        layoutFull.classList.remove('am:hidden'); // Show full layout
        
        const viewCampus = document.getElementById('view-campus');
        if(viewCampus) viewCampus.classList.remove('am:hidden');

    } else {
        // --- LOGIC 1 & 3: ACADEMICS / ABOUT / RESEARCH (Split Layout) ---
        layoutFull.classList.add('am:hidden');
        layoutSplit.classList.remove('am:hidden'); // Show split layout

        // Determine which sidebar and view to show
        let targetSidebarId = '';
        let targetViewId = '';

        if(rootId === 'about') {
            targetSidebarId = 'sidebar-about';
            targetViewId = 'view-about';
        } else if (rootId === 'research') {
            targetSidebarId = 'sidebar-research';
            targetViewId = 'view-research';
        } else {
            // Default to Academics
            targetSidebarId = 'sidebar-academics';
            targetViewId = 'view-academics';
        }

        // Show the specific sidebar
        const sidebar = document.getElementById(targetSidebarId);
        if(sidebar) sidebar.classList.remove('am:hidden');

        // Show the specific view
        const view = document.getElementById(targetViewId);
        if(view) view.classList.remove('am:hidden');

        // Auto-click the first button in the sidebar if nothing is active
        if(sidebar) {
            const activeBtn = sidebar.querySelector('.am\\:active');
            if(!activeBtn) {
                const firstBtn = sidebar.querySelector('[onclick]');
                if(firstBtn) firstBtn.click();
            }
        }
    }
};

// ==================================================================
// ABOUT SECTION SWITCHER (New Logic)
// ==================================================================
const switchAboutTab = (tabName, btnElement) => {
    // 1. Hide all content content divs
    const contents = document.querySelectorAll('.am\\:about-content');
    contents.forEach(el => el.classList.add('am:hidden'));
  
    // 2. Show the specific content div
    const targetContent = document.getElementById('content-about-' + tabName);
    if (targetContent) {
      targetContent.classList.remove('am:hidden');
    }
  
    // 3. Update Sidebar Styles
    const buttons = document.querySelectorAll('.am\\:about-btn');
    buttons.forEach(btn => {
      btn.classList.remove('am:active', 'am:text-[#AF0C3E]', 'am:font-medium', 'am:border-[#AF0C3E]');
      btn.classList.add('am:border-transparent'); 
    });
  
    btnElement.classList.add('am:active', 'am:text-[#AF0C3E]', 'am:font-medium', 'am:border-[#AF0C3E]');
    btnElement.classList.remove('am:border-transparent');
};

// ==================================================================
// RESEARCH SECTION SWITCHER (New Logic)
// ==================================================================
const switchResearchTab = (tabName, btnElement) => {
    const contents = document.querySelectorAll('.am\\:research-content');
    contents.forEach(el => el.classList.add('am:hidden'));
  
    const targetContent = document.getElementById('content-research-' + tabName);
    if (targetContent) {
      targetContent.classList.remove('am:hidden');
    }
  
    const buttons = document.querySelectorAll('.am\\:research-btn');
    buttons.forEach(btn => {
      btn.classList.remove('am:active', 'am:text-[#AF0C3E]', 'am:font-medium', 'am:border-[#AF0C3E]');
      btn.classList.add('am:border-transparent'); 
    });
  
    btnElement.classList.add('am:active', 'am:text-[#AF0C3E]', 'am:font-medium', 'am:border-[#AF0C3E]');
    btnElement.classList.remove('am:border-transparent');
};

// ==================================================================
// 4. ACADEMICS INNER SWITCHERS
// ==================================================================
const switchLevel = (targetId, clickedElement) => {
    const parent = clickedElement.parentElement;
    parent.querySelectorAll('.am\\:level-btn').forEach(btn => {
        btn.classList.remove('am:text-[#AF0C3E]', 'am:font-medium', 'am:border-[#AF0C3E]');
        btn.classList.add('am:text-gray-500', 'am:border-transparent');
    });
    clickedElement.classList.remove('am:text-gray-500', 'am:border-transparent');
    clickedElement.classList.add('am:text-[#AF0C3E]', 'am:font-medium', 'am:border-[#AF0C3E]');

    if (targetId.includes('academics')) {
        const viewAcademics = document.getElementById('view-academics');
        viewAcademics.querySelectorAll('.am\\:level-group').forEach(el => el.classList.add('am:hidden'));
        const targetGroup = document.getElementById('tabs-' + targetId);
        if (targetGroup) {
            targetGroup.classList.remove('am:hidden');
            const firstTab = targetGroup.querySelector('.am\\:tab-btn');
            if(firstTab) firstTab.click();
        }
    }
};

const switchTab = (targetId, clickedElement) => {
    const parent = clickedElement.parentElement;
    parent.querySelectorAll('.am\\:tab-btn').forEach(btn => {
        btn.classList.remove('am:active', 'am:bg-white', 'am:shadow-sm', 'am:border-[#AF0C3E]');
        btn.classList.add('am:border-transparent');
    });
    clickedElement.classList.add('am:active', 'am:bg-white', 'am:shadow-sm', 'am:border-[#AF0C3E]');
    clickedElement.classList.remove('am:border-transparent');
    document.getElementById('view-academics').querySelectorAll('.am\\:tab-content').forEach(el => el.classList.add('am:hidden'));
    const content = document.getElementById('content-' + targetId);
    if(content) content.classList.remove('am:hidden');
};


// ==================================================================
// 7. EXPORT TO WINDOW
// ==================================================================
window.switchRoot = switchRoot;
window.switchLevel = switchLevel;
window.switchTab = switchTab;
window.switchAboutTab = switchAboutTab;
window.switchResearchTab = switchResearchTab;
window.mobileNavigate = mobileNavigate;
window.mobileGoBack = mobileGoBack;

/////////////////////////////// 2. HERO SLIDER /////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll('.am-slide');
  let currentIndex = 0;
  let totalSlides = slides.length;

  function showSlide(index) {
    // 1. Calculate correct index
    if (index >= totalSlides) index = 0;
    if (index < 0) index = totalSlides - 1;
    currentIndex = index;

    // 2. Loop through slides to Toggle Visibility
    slides.forEach((slide, i) => {
      const video = slide.querySelector('.hero-video');
      
      if (i === currentIndex) {
        // Active Slide
        slide.classList.remove('am:opacity-0', 'am:pointer-events-none');
        slide.classList.add('am:opacity-100', 'am:pointer-events-auto');
        
        // Play Video
        if(video) {
           video.currentTime = 0;
           video.play();
        }
      } else {
        // Inactive Slide
        slide.classList.remove('am:opacity-100', 'am:pointer-events-auto');
        slide.classList.add('am:opacity-0', 'am:pointer-events-none');
        
        // Pause Video to save resources
        if(video) video.pause();
      }
    });
  }

  // 3. Attach Events to Buttons INSIDE each slide
  slides.forEach((slide) => {
    const nextBtns = slide.querySelectorAll('.next-btn');
    const prevBtns = slide.querySelectorAll('.prev-btn');
    const video = slide.querySelector('.hero-video');
    const progressBar = slide.querySelector('.video-progress-bar');

    // Button Clicks
    nextBtns.forEach(btn => btn.addEventListener('click', () => showSlide(currentIndex + 1)));
    prevBtns.forEach(btn => btn.addEventListener('click', () => showSlide(currentIndex - 1)));

    // Auto-Next on Video End
    if(video) {
        video.addEventListener('ended', () => showSlide(currentIndex + 1));
        
        // Progress Bar
        video.addEventListener('timeupdate', () => {
            if (video.duration && progressBar) {
                const percent = (video.currentTime / video.duration) * 100;
                progressBar.style.width = percent + '%';
            }
        });
    }
  });

  // Initialize first slide
  showSlide(0);
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
  // Mobile View (Default) - 1 Slide
  slidesPerView: 1,
  spaceBetween: 0,
  speed: 800,
  grabCursor: true,
  autoplay: true,
  
  breakpoints: {
    // Tablet View (>= 640px) - 2 Sliders
    640: { 
      slidesPerView: 2, 
      spaceBetween: 0 
    },
    // Large Desktop View (>= 1024px) - 4 Sliders
    1024: { 
      slidesPerView: 4, 
      spaceBetween: 0 
    },
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
    // Note: escaping the colon for the selector
    const headers = document.querySelectorAll('.am\\:toggle-header');

    headers.forEach(header => {
      header.addEventListener('click', () => {
        // Toggle the content visibility
        const content = header.nextElementSibling;
        if (content && content.classList.contains('am:toggle-content')) {
          content.classList.toggle('am:hidden');
        }

        // Rotate the chevron icon
        const icon = header.querySelector('.am\\:chevron-icon');
        if (icon) {
          icon.classList.toggle('am:rotate-180');
        }
      });
    });
  });

