/* ==========================================================================
   PANENDRA JADAV STYLE PORTFOLIO - SCRIPT LOGIC
   Features:
   - Floating Bottom Dock Navigation
   - Dark/Light Theme Switcher
   - Dynamic GitHub Activity Contribution Matrix Generator
   - Smooth Scroll & Contact Form Handler
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
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
    let current = "";
    const scrollPosition = window.scrollY + 250;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

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