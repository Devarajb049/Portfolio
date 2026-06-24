AOS.init({
  duration: 1200, // Animation duration in ms
  once: false, // Animation only occurs once
});

function openFullscreen(id) {
  const img = document.getElementById(id);
  if (img.requestFullscreen) {
    img.requestFullscreen();
  } else if (img.webkitRequestFullscreen) {
    img.webkitRequestFullscreen();
  } else if (img.msRequestFullscreen) {
    img.msRequestFullscreen();
  }
}
const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", e => {

    // Move main cursor
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    // Create trail
    const trail = document.createElement("div");
    trail.classList.add("trail");
    document.body.appendChild(trail);

    trail.style.left = e.clientX + "px";
    trail.style.top = e.clientY + "px";

    setTimeout(() => {
        trail.remove();
    }, 500);

});

// Timeline scroll progress animation
function updateTimelineProgress() {
  const timelines = document.querySelectorAll(".timeline");

  timelines.forEach(timeline => {
    // Inject progress line if not already present
    let progressLine = timeline.querySelector(".timeline-progress-line");
    if (!progressLine) {
      progressLine = document.createElement("div");
      progressLine.className = "timeline-progress-line";
      timeline.appendChild(progressLine);
    }

    const rect = timeline.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Trigger point: 60% of the viewport height from the top
    const triggerPoint = viewportHeight * 0.6;

    // Calculate how much the timeline has scrolled past the trigger point
    const scrolled = triggerPoint - rect.top;

    let progress = 0;
    if (scrolled > 0) {
      progress = Math.min(scrolled, rect.height);
    }

    // Update height of the progress line
    progressLine.style.height = `${progress}px`;

    // Toggle active state for timeline items
    const items = timeline.querySelectorAll(".timeline-item");
    items.forEach(item => {
      // The item becomes active when the scroll reaches its center dot (around offsetTop + 15px)
      const dotOffset = item.offsetTop + 15;
      if (scrolled >= dotOffset) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  });
}

// Slide Tabs Indicator logic for Navbar
function initSlideNavbar() {
  const navList = document.querySelector('.nav-list');
  if (!navList) return;

  const indicator = document.querySelector('.nav-indicator');
  const items = navList.querySelectorAll('.nav-link');

  // Helper function to move indicator to a specific element
  function moveIndicator(element) {
    if (!element || !indicator) return;
    const parentRect = navList.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    // Check if vertical or horizontal (vertical on mobile, horizontal on desktop)
    const isMobile = window.innerWidth <= 991.98;
    if (isMobile) {
      indicator.style.opacity = '0';
      return;
    }

    const leftPosition = elementRect.left - parentRect.left;
    const width = elementRect.width;

    indicator.style.left = `${leftPosition}px`;
    indicator.style.width = `${width}px`;
    indicator.style.opacity = '1';
  }

  // Expose indicator move globally so scroll spy can update it
  window.updateNavbarIndicator = () => {
    const activeItem = navList.querySelector('.nav-link.active-page');
    if (activeItem) {
      moveIndicator(activeItem);
    }
  };

  // Position indicator at active item initially
  window.updateNavbarIndicator();

  // Add hover events to items
  items.forEach(item => {
    item.addEventListener('mouseenter', () => {
      moveIndicator(item);
      items.forEach(i => i.classList.remove('hovered-item'));
      item.classList.add('hovered-item');
    });

    item.addEventListener('mouseleave', () => {
      item.classList.remove('hovered-item');
    });
  });

  // Track hover state of the entire list to prevent scroll spy overrides
  navList.addEventListener('mouseenter', () => {
    navList.classList.add('hovered-list');
  });

  // When mouse leaves the entire navbar list, return to active item
  navList.addEventListener('mouseleave', () => {
    navList.classList.remove('hovered-list');
    items.forEach(i => i.classList.remove('hovered-item'));
    window.updateNavbarIndicator();
  });

  // Recalculate position on window resize
  window.addEventListener('resize', () => {
    window.updateNavbarIndicator();
  });
}

// Scroll Spy / Active Section Tracker
function handleScrollSpy() {
  const navList = document.querySelector('.nav-list');
  if (!navList) return;

  // Skip updating active links when user is hovering over menu
  if (navList.classList.contains('hovered-list')) return;

  const scrollPosition = window.scrollY + 250; // offset trigger point
  
  const sections = [
    { id: 'home', link: navList.querySelector('a[href="#home"]') },
    { id: 'skills', link: navList.querySelector('a[href="#skills"]') },
    { id: 'certificates', link: navList.querySelector('a[href="#certificates"]') },
    { id: 'projects', link: navList.querySelector('a[href="#projects"]') },
    { id: 'contact', link: navList.querySelector('a[href="#contact"]') }
  ];

  let currentSectionId = 'home';

  sections.forEach(section => {
    const el = document.getElementById(section.id);
    if (el && el.offsetTop <= scrollPosition) {
      currentSectionId = section.id;
    }
  });

  const items = navList.querySelectorAll('.nav-link');
  let changed = false;

  items.forEach(item => {
    const href = item.getAttribute('href');
    if (href === `#${currentSectionId}`) {
      if (!item.classList.contains('active-page')) {
        item.classList.add('active-page');
        changed = true;
      }
    } else {
      if (item.classList.contains('active-page')) {
        item.classList.remove('active-page');
        changed = true;
      }
    }
  });

  if (changed && typeof window.updateNavbarIndicator === 'function') {
    window.updateNavbarIndicator();
  }
}

// Scrolled navbar state
function handleNavbarScroll() {
  const navbar = document.querySelector('.floating-navbar');
  if (!navbar) return;

  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

// Helper to open modal cleanly by ID using Bootstrap's API
function openBentoModal(modalId) {
  const modalEl = document.getElementById(modalId);
  if (!modalEl) return;
  
  let modalInstance = bootstrap.Modal.getInstance(modalEl);
  if (!modalInstance) {
    modalInstance = new bootstrap.Modal(modalEl);
  }
  modalInstance.show();
}

// Smooth Scroll / Nav Click Modal Handler
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      // If clicking home/brand, scroll smoothly to top
      if (targetId === '#home') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
      else if (targetId === '#skills') {
        openBentoModal('skillsModal');
      } else if (targetId === '#certificates') {
        openBentoModal('certificatesModal');
      } else if (targetId === '#projects') {
        openBentoModal('projectsModal');
      } else if (targetId === '#contact') {
        openBentoModal('contactModal');
      } 
      // Fallback for standard anchors
      else {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const offset = 85; 
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
      
      // Close mobile navbar drawer if open
      const navbarCollapse = document.getElementById('navbarNav');
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  });
}

// Hook into Bootstrap modal events to update the SlideTabs navbar active page!
function initModalNavbarSync() {
  const modals = [
    { id: 'skillsModal', href: '#skills' },
    { id: 'certificatesModal', href: '#certificates' },
    { id: 'projectsModal', href: '#projects' },
    { id: 'contactModal', href: '#contact' }
  ];

  const navList = document.querySelector('.nav-list');
  if (!navList) return;

  const items = navList.querySelectorAll('.nav-link');

  modals.forEach(m => {
    const el = document.getElementById(m.id);
    if (!el) return;

    // When modal is shown, update active tab
    el.addEventListener('shown.bs.modal', () => {
      items.forEach(item => item.classList.remove('active-page'));
      const activeLink = navList.querySelector(`a[href="${m.href}"]`);
      if (activeLink) {
        activeLink.classList.add('active-page');
        window.updateNavbarIndicator();
      }
    });

    // When modal is hidden, return to home
    el.addEventListener('hidden.bs.modal', () => {
      items.forEach(item => item.classList.remove('active-page'));
      const homeLink = navList.querySelector('a[href="#home"]') || navList.querySelector('a[href="index.html"]');
      if (homeLink) {
        homeLink.classList.add('active-page');
        window.updateNavbarIndicator();
      }
    });
  });
}

// Function to open specific skills tab and open skills modal
function openSkillsTab(tabId) {
  const tabButtonEl = document.getElementById(`${tabId}-tab`);
  if (tabButtonEl) {
    const tab = new bootstrap.Tab(tabButtonEl);
    tab.show();
  }
  openBentoModal('skillsModal');
}

// Contact Form WhatsApp Redirection
function sendWhatsApp(event) {
  event.preventDefault(); // Prevent actual form submission

  const message = document.getElementById("message").value.trim();
  const whatsappUrl = `https://wa.me/917396106066?text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, "_blank");
}

// Bind events
window.addEventListener("scroll", () => {
  updateTimelineProgress();
  handleNavbarScroll();
  handleScrollSpy();
});
window.addEventListener("resize", () => {
  updateTimelineProgress();
  handleNavbarScroll();
  window.updateNavbarIndicator();
});
window.addEventListener("load", () => {
  updateTimelineProgress();
  handleNavbarScroll();
  window.updateNavbarIndicator();
});

// Force Dark Theme
function initThemeToggle() {
  document.documentElement.setAttribute("data-theme", "dark");
  localStorage.setItem("theme", "dark");
}

// Run initial calculation after DOM is loaded and after a short delay to account for layout shifts
document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  updateTimelineProgress();
  initSlideNavbar();
  handleNavbarScroll();
  initSmoothScroll();
  initModalNavbarSync();
  handleScrollSpy();
  
  setTimeout(() => {
    updateTimelineProgress();
    if (typeof window.updateNavbarIndicator === 'function') {
      window.updateNavbarIndicator();
    }
    handleNavbarScroll();
    handleScrollSpy();
  }, 200);
});