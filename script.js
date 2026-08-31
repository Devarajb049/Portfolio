/* ==========================================================================
   PANENDRA JADAV STYLE PORTFOLIO - SCRIPT LOGIC
   Features:
   - Floating Bottom Dock Navigation
   - Dark/Light Theme Switcher
   - Dynamic GitHub Activity Contribution Matrix Generator
   - Smooth Scroll & Contact Form Handler
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // 0. INITIALIZE CURSOR BACKGROUND SPOTLIGHT GLOW
  initCursorGlow();

  // 1. INITIALIZE FLOATING DOCK & THEME SWITCHER
  initThemeToggle();

  // 2. GENERATE GITHUB ACTIVITY CONTRIBUTION MATRIX
  generateGitHubMatrix();

  // 3. SMOOTH SCROLL & SCROLLSPY
  initSmoothScroll();
  initScrollspy();
});

/* ==========================================
   1. THEME SWITCHER LOGIC
   ========================================== */
function initThemeToggle() {
  const themeBtn = document.querySelector(".theme-toggle-btn");
  if (!themeBtn) return;

  const currentTheme = localStorage.getItem("portfolio_theme") || "dark";
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeIcon(currentTheme);

  themeBtn.addEventListener("click", () => {
    const activeTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = activeTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("portfolio_theme", newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const icon = document.querySelector(".theme-toggle-btn i");
  if (!icon) return;

  if (theme === "dark") {
    icon.className = "fas fa-sun dock-icon";
  } else {
    icon.className = "fas fa-moon dock-icon";
  }
}

/* ==========================================
   2. GITHUB ACTIVITY MATRIX GENERATOR
   ========================================== */
function generateGitHubMatrix() {
  const container = document.getElementById("github-matrix");
  if (!container) return;

  container.innerHTML = "";

  // 52 weeks x 7 days = 364 cells
  const totalCells = 364;

  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement("div");
    cell.classList.add("github-cell");

    // Randomize activity level for realistic GitHub commit graph visual
    const rand = Math.random();
    let level = "level-0";

    if (rand > 0.85) {
      level = "level-4";
    } else if (rand > 0.7) {
      level = "level-3";
    } else if (rand > 0.5) {
      level = "level-2";
    } else if (rand > 0.3) {
      level = "level-1";
    }

    cell.classList.add(level);
    container.appendChild(cell);
  }
}

/* ==========================================
   3. SMOOTH SCROLL
   ========================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/* ==========================================
   4. SCROLLSPY SECTION HIGHLIGHTING
   ========================================== */
function initScrollspy() {
  const sections = document.querySelectorAll("section[id]");
  const navDots = document.querySelectorAll(".side-nav-dot");

  if (!sections.length || !navDots.length) return;

  const updateActiveDot = () => {
    let current = "home";
    const scrollPosition = window.scrollY + (window.innerHeight * 0.35);

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    // Check if at bottom of page
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
      current = "contact";
    }

    navDots.forEach((dot) => {
      dot.classList.remove("active");
      if (dot.getAttribute("data-section") === current) {
        dot.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", updateActiveDot);
  updateActiveDot();
}

/* ==========================================
   5. CONTACT FORM WHATSAPP SUBMISSION
   ========================================== */
function sendWhatsApp(event) {
  event.preventDefault();

  const name = document.getElementById("contact-name")?.value || "";
  const email = document.getElementById("contact-email")?.value || "";
  const message = document.getElementById("contact-message")?.value || "";

  const text = `Hi Deva Raj, my name is ${name} (${email}). ${message}`;
  const whatsappUrl = `https://wa.me/917396106066?text=${encodeURIComponent(text)}`;

  window.open(whatsappUrl, "_blank");
}

/* ==========================================
   6. CURSOR BACKGROUND FOLLOW ANIMATION
   ========================================== */
function initCursorGlow() {
  const glow = document.getElementById("cursor-glow");
  if (!glow) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;
  let isMoving = false;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    document.documentElement.style.setProperty("--mouse-x", `${mouseX}px`);
    document.documentElement.style.setProperty("--mouse-y", `${mouseY}px`);

    if (!isMoving) {
      isMoving = true;
      glow.style.opacity = "1";
    }
  });

  window.addEventListener("mouseleave", () => {
    isMoving = false;
    glow.style.opacity = "0";
  });

  function animate() {
    // Smooth LERP movement physics for responsive fluid follow effect
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;

    glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    requestAnimationFrame(animate);
  }

  animate();
}