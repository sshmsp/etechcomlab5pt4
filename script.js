const CONFIG = {


  activityLinks: {
    digitalCounter: "https://www.tinkercad.com/things/hg6LelVv8Mm-digital-counter/editel?returnTo=https%3A%2F%2Fwww.tinkercad.com%2Fdashboard&sharecode=gcrZgsdtVankclwSkPhcVnDpctmMwa0MI4AJkDIdn1g",
    smokeDetector:  "https://www.tinkercad.com/things/jzjBAvf8MuQ-smoke-detector/editel?returnTo=%2Fthings%2FjzjBAvf8MuQ-smoke-detector&sharecode=1j593COsytZofIqVsT-QUH90yHujQxkplUS5Bu5btWo",
    lightShow:      "https://www.tinkercad.com/things/1CxhD43JXUc/editel?returnTo=%2Fdashboard%2Fdesigns%2Fcircuits&sharecode=eNmTAFKJ_I39NVJEWJvijzEt7mOmzfgriRhLriU1zbY",
    trafficLight:   "https://www.tinkercad.com/things/c0E8AcUol3i-dazzling-blad/editel?returnTo=%2Fthings%2Fc0E8AcUol3i-dazzling-blad&sharecode=GtXUVMNKt24f8oJji_TYWEbvyOLogA1SIwFEf5mjWfk",
    jeepBeep:       "https://www.tinkercad.com/things/89d7KvtFRbu/editel?sharecode=ooxAxrpRYiVbgU8VjhX4H0haFFX-uuGsv2QVaHpO25w",
  },


  activities: [
    {
      number: "01",
      title: "Digital Counter",
      description: "Difficult, circuit made with Piezo Buzzer, 7 Segment Display, Resistor components.",
      linkKey: "digitalCounter",
      tags: ["LOREM", "IPSUM", "DOLOR"],
    },
    {
      number: "02",
      title: "Smoke Detector",
      description: "Difficult, circuit made with LCD I2C, Gas Sensor, LED, Piezo Buzzer, Resistor.",
      linkKey: "smokeDetector",
      tags: ["SIT", "AMET", "CONSECTETUR"],
    },
    {
      number: "03",
      title: "The Light Show",
      description: "Moderate, circuit made with Piezo Buzzer, LED, and Resistor components.",
      linkKey: "lightShow",
      tags: ["ADIPISCING", "ELIT", "SED"],
    },
    {
      number: "04",
      title: "Red Light! Yellow Light! Green Light!",
      description: "Moderate, circuit made with Ultrasonic Sensor (3 pin), Resistor, RGB LED components.",
      linkKey: "trafficLight",
      tags: ["DO", "EIUSMOD", "TEMPOR"],
    },
    {
      number: "05",
      title: "Beep Beep Beep ang Sabi ng Jeep",
      description: "Easy, circuit made with Button, Resistor, Buzzer components.",
      linkKey: "jeepBeep",
      tags: ["INCIDIDUNT", "UT", "LABORE"],
    },
  ],

  teamMembers: [
    "Lee Xhander Limet",
    "Ethan Lorenzo Escala",
    "Dane Genver Pusta",
    "Sasha Jaden Prado",
  ],
};


document.addEventListener("DOMContentLoaded", () => {
  renderActivityCards();
  renderTeamMembers();
  initNav();
  initCustomCursor();
  initBoardTilt();
  initCardTilt();
  initScrollReveal();
});


function renderActivityCards() {
  const grid = document.getElementById("activityGrid");
  if (!grid) return;

  const frag = document.createDocumentFragment();

  CONFIG.activities.forEach((activity, i) => {
    const url = CONFIG.activityLinks[activity.linkKey];
    const hasLink = !!url && url !== "PASTE_LINK_HERE";

    const card = document.createElement("article");
    card.className = "activity-card";
    card.setAttribute("data-reveal", "");
    card.style.transitionDelay = `${Math.min(i * 60, 240)}ms`;

    const tagsHtml = activity.tags
      .map((t) => `<span class="card-tag">${escapeHtml(t)}</span>`)
      .join("");

    const ctaHtml = hasLink
      ? `<a class="card-cta" href="${escapeAttr(url)}" target="_blank" rel="noopener noreferrer" aria-label="Open ${escapeAttr(activity.title)} on Tinkercad, opens in a new tab">
           <span>OPEN TINKERCAD</span>
           ${arrowIcon()}
         </a>`
      : `<span class="card-cta is-disabled" aria-disabled="true">
           <span>LINK COMING SOON</span>
           ${dashIcon()}
         </span>`;

    card.innerHTML = `
      <div class="card-top">
        <span class="card-num">${escapeHtml(activity.number)}</span>
        <span class="card-icon">${chipIcon()}</span>
      </div>
      <h3 class="card-title">${escapeHtml(activity.title)}</h3>
      <p class="card-desc">${escapeHtml(activity.description)}</p>
      <div class="card-tags">${tagsHtml}</div>
      ${ctaHtml}
    `;

    frag.appendChild(card);
  });

  grid.appendChild(frag);
}


function renderTeamMembers() {
  const list = document.getElementById("teamList");
  if (!list) return;

  const frag = document.createDocumentFragment();
  CONFIG.teamMembers.forEach((name, i) => {
    const id = `M-${String(i + 1).padStart(2, "0")}`;
    const li = document.createElement("li");
    li.className = "member-card";
    li.setAttribute("data-reveal", "");
    li.style.transitionDelay = `${Math.min(i * 60, 240)}ms`;
    li.innerHTML = `
      <div class="member-card-top">
        <span class="member-id">${escapeHtml(id)}</span>
        <span class="member-dot" aria-hidden="true"></span>
      </div>
      <span class="member-name">${escapeHtml(name)}</span>
      <div class="member-pins" aria-hidden="true">
        <span></span><span></span><span></span><span></span><span></span><span></span>
      </div>
    `;
    frag.appendChild(li);
  });
  list.appendChild(frag);
}


function initNav() {
  const navbar = document.getElementById("navbar");
  const toggle = document.getElementById("navToggle");
  const mobile = document.getElementById("navMobile");

  const onScroll = () => {
    navbar.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && mobile) {
    toggle.addEventListener("click", () => {
      const isOpen = mobile.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
    mobile.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        mobile.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }
}


function initCustomCursor() {
  if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

  const dot = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");
  if (!dot || !ring) return;

  let ringX = window.innerWidth / 2;
  let ringY = window.innerHeight / 2;
  let targetX = ringX;
  let targetY = ringY;

  window.addEventListener("mousemove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    dot.style.transform = `translate(${targetX}px, ${targetY}px) translate(-50%, -50%)`;
  });

  function animateRing() {
    ringX += (targetX - ringX) * 0.18;
    ringY += (targetY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const interactiveSelectors = "a, button, .activity-card, .member-card";
  document.querySelectorAll(interactiveSelectors).forEach((el) => {
    el.addEventListener("mouseenter", () => ring.classList.add("is-active"));
    el.addEventListener("mouseleave", () => ring.classList.remove("is-active"));
  });
}


function initBoardTilt() {
  const stage = document.getElementById("heroStage");
  const rig = document.getElementById("boardRig");
  const glow = document.getElementById("boardGlow");
  if (!stage || !rig) return;

  const isCoarsePointer = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  const MAX_TILT = 14;    
  const MAX_SHIFT = 10;    

  let targetRotX = 0, targetRotY = 0, targetShiftX = 0, targetShiftY = 0;
  let curRotX = 0, curRotY = 0, curShiftX = 0, curShiftY = 0;

  function applyTransform() {
    curRotX += (targetRotX - curRotX) * 0.12;
    curRotY += (targetRotY - curRotY) * 0.12;
    curShiftX += (targetShiftX - curShiftX) * 0.12;
    curShiftY += (targetShiftY - curShiftY) * 0.12;

    rig.style.transform =
      `translate3d(${curShiftX}px, ${curShiftY}px, 0) rotateX(${curRotX}deg) rotateY(${curRotY}deg)`;

    requestAnimationFrame(applyTransform);
  }
  applyTransform();

  if (!isCoarsePointer) {
    stage.addEventListener("mousemove", (e) => {
      const rect = stage.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5; 
      const relY = (e.clientY - rect.top) / rect.height - 0.5;

      targetRotY = relX * MAX_TILT * 2;
      targetRotX = -relY * MAX_TILT * 2;
      targetShiftX = relX * MAX_SHIFT * 2;
      targetShiftY = relY * MAX_SHIFT * 2;

      if (glow) {
        glow.style.opacity = "1";
        glow.style.transform = `translate(${relX * 24}px, ${relY * 24}px)`;
      }
    });

    stage.addEventListener("mouseleave", () => {
      targetRotX = 0; targetRotY = 0; targetShiftX = 0; targetShiftY = 0;
      if (glow) glow.style.opacity = "0.55";
    });
  } else {

    let t = 0;
    setInterval(() => {
      t += 0.02;
      targetRotY = Math.sin(t) * 3.5;
      targetRotX = Math.cos(t * 0.8) * 2;
    }, 50);

    stage.addEventListener("touchmove", (e) => {
      const touch = e.touches[0];
      if (!touch) return;
      const rect = stage.getBoundingClientRect();
      const relX = (touch.clientX - rect.left) / rect.width - 0.5;
      const relY = (touch.clientY - rect.top) / rect.height - 0.5;
      targetRotY = relX * MAX_TILT * 0.6;
      targetRotX = -relY * MAX_TILT * 0.6;
    }, { passive: true });
  }
}


function initCardTilt() {
  if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

  const cards = document.querySelectorAll(".activity-card");
  const MAX = 5; 

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform =
        `translateY(-6px) rotateX(${(-relY * MAX).toFixed(2)}deg) rotateY(${(relX * MAX).toFixed(2)}deg)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}


function initScrollReveal() {
  const targets = document.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window) || targets.length === 0) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
}

function arrowIcon() {
  return `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M4 10L10 4M10 4H5M10 4V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}
function dashIcon() {
  return `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3 7H11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`;
}
function chipIcon() {
  return `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <rect x="5" y="5" width="8" height="8" rx="1" stroke="currentColor" stroke-width="1.4"/>
    <path d="M9 1V5M9 13V17M1 9H5M13 9H17M3 3L5.5 5.5M15 3L12.5 5.5M3 15L5.5 12.5M15 15L12.5 12.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
  </svg>`;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
function escapeAttr(str) {
  return escapeHtml(str).replace(/"/g, "&quot;");
}
