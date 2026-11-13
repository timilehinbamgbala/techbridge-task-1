const dataAnalyticsTasks = [
  {
    number: 1,
    day: 1,
    title: "Data Cleaning Basics",
    description: "Clean a messy dataset using Google Sheets or Excel. Identify and fix duplicate rows, blank cells, inconsistent formatting, and incorrect data types.",
    difficulty: "Beginner",
    level: 1
  },
  {
    number: 2,
    day: 4,
    title: "Formulas & Pivot Tables",
    description: "Use spreadsheet formulas and Pivot Tables to answer questions and extract useful insights from a dataset.",
    difficulty: "Beginner",
    level: 1
  },
  {
    number: 3,
    day: 8,
    title: "Data Visualization",
    description: "Create charts and a simple dashboard that communicate useful insights from a dataset.",
    difficulty: "Beginner → Intermediate",
    level: 2
  },
  {
    number: 4,
    day: 11,
    title: "Introduction to SQL",
    description: "Practice basic SQL queries and use them to answer real-world questions about data.",
    difficulty: "Beginner → Intermediate",
    level: 2
  },
  {
    number: 5,
    day: 15,
    title: "SQL Joins & Aggregations",
    description: "Use JOIN, GROUP BY and aggregate functions such as COUNT, SUM and AVG to analyze information across multiple tables.",
    difficulty: "Intermediate",
    level: 3
  },
  {
    number: 6,
    day: 19,
    title: "Lookup Functions & Data Wrangling",
    description: "Use VLOOKUP or XLOOKUP to combine related datasets and handle data mismatches.",
    difficulty: "Intermediate",
    level: 3
  },
  {
    number: 7,
    day: 22,
    title: "Mini Analysis Project",
    description: "Complete a small end-to-end analysis involving data cleaning, formulas, Pivot Tables, charts and recommendations.",
    difficulty: "Intermediate",
    level: 3
  },
  {
    number: 8,
    day: 26,
    title: "Capstone Project",
    description: "Complete a larger project combining spreadsheet analysis and SQL using at least two related tables.",
    difficulty: "Intermediate",
    level: 3
  }
];

const webDevelopmentTasks = [
  {
    number: 1,
    day: 1,
    title: "Build the TechBridge Homepage",
    description: "Create the first version of the TechBridge website using HTML and CSS.",
    difficulty: "Beginner",
    level: 1
  },
  {
    number: 2,
    day: 4,
    title: "Build the TechBridge Programs Experience",
    description: "Create a Programs experience presenting TechBridge's available learning programs.",
    difficulty: "Beginner",
    level: 1
  },
  {
    number: 3,
    day: 8,
    title: "Build the Internship Tasks Experience",
    description: "Create an interface that presents the TechBridge internship tasks and helps users understand the internship journey.",
    difficulty: "Beginner → Intermediate",
    level: 2
  },
  {
    number: 4,
    day: 11,
    title: "Build an Interactive Internship Roadmap",
    description: "Use JavaScript to allow visitors to switch between the Data Analytics and Web Development internship tracks.",
    difficulty: "Beginner → Intermediate",
    level: 2
  },
  {
    number: 5,
    day: 15,
    title: "Build the Intern Registration Experience",
    description: "Create a professional registration and onboarding interface for TechBridge interns.",
    difficulty: "Intermediate",
    level: 3
  },
  {
    number: 6,
    day: 19,
    title: "Build the Task Submission System",
    description: "Create an interface through which interns can prepare and submit their task work.",
    difficulty: "Intermediate",
    level: 3
  },
  {
    number: 7,
    day: 22,
    title: "Build the Intern Dashboard",
    description: "Create a dashboard where an intern can view their profile, progress, tasks and submissions.",
    difficulty: "Intermediate",
    level: 3
  },
  {
    number: 8,
    day: 26,
    title: "Build the Complete TechBridge Internship Platform",
    description: "Combine the different components created during the internship into a complete TechBridge platform.",
    difficulty: "Intermediate",
    level: 3
  }
];

function initTracks() {
  const panel = document.getElementById("panel-tasks");
  if (!panel) return;

  const tabButtons = document.querySelectorAll(".track-tab");
  const trackNameEl = document.getElementById("current-track-name");
  const trackTabsContainer = document.querySelector(".track-tabs");
  let currentTrack = "web";

  function createTaskCard(task, index) {
    const levelClass = `lvl-${task.level}`;
    return `
      <li class="step" id="task-${task.number}" style="--i:${index}">
        <div class="step-day">
          <span>Day</span>
          <strong>${task.day}</strong>
        </div>
        <div class="task-flip" tabindex="0" role="button" aria-pressed="false">
          <div class="task-inner">
            <article class="flip-face flip-front">
              <div class="task-top">
                <p class="task-no">Task ${task.number}</p>
                <p class="level ${levelClass}">
                  <span class="meter" aria-hidden="true">
                    <i></i><i></i><i></i><i></i>
                  </span>
                  ${task.difficulty}
                </p>
              </div>
              <h3>${task.title}</h3>
              <p class="flip-hint">Click to view details</p>
            </article>
            <article class="flip-face flip-back">
              <p class="task-no">Task ${task.number}</p>
              <h3>${task.title}</h3>
              <p class="task-desc">${task.description}</p>
              <p class="flip-hint">Click to flip back</p>
            </article>
          </div>
        </div>
      </li>
    `;
  }

  function updateTabIndicator(track) {
    trackTabsContainer.dataset.active = track;
  }

  function attachFlipHandlers() {
    document.querySelectorAll(".task-flip").forEach((card) => {
      const toggle = () => {
        const flipped = card.classList.toggle("is-flipped");
        card.setAttribute("aria-pressed", flipped);
      };

      card.addEventListener("click", toggle);

      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggle();
        }
      });
    });
  }

  function renderTrack(trackKey, instant) {
    const tasks = trackKey === "data" ? dataAnalyticsTasks : webDevelopmentTasks;
    const trackLabel = trackKey === "data" ? "Data Analytics" : "Web Development";

    trackNameEl.textContent = trackLabel;

    const listHTML = `
      <ol class="roadmap">
        ${tasks.map(createTaskCard).join("")}
      </ol>
    `;

    if (instant) {
      panel.innerHTML = listHTML;
      panel.classList.add("is-visible");
      attachFlipHandlers();
      return;
    }

    panel.classList.remove("is-visible");
    panel.classList.add("is-fading");

    setTimeout(() => {
      panel.innerHTML = listHTML;
      panel.classList.remove("is-fading");
      void panel.offsetWidth;
      panel.classList.add("is-visible");
      attachFlipHandlers();
    }, 300);
  }

  function burstBubbles(tab) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!tab.animate) return;

    const box = trackTabsContainer.getBoundingClientRect();
    const rect = tab.getBoundingClientRect();
    const cx = rect.left - box.left + rect.width / 2;
    const cy = rect.top - box.top + rect.height / 2;

    tab.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(0.92)", offset: 0.35 },
        { transform: "scale(1)" }
      ],
      { duration: 380, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)" }
    );

    for (let i = 0; i < 14; i++) {
      const bubble = document.createElement("span");
      const size = 6 + Math.random() * 14;
      const dx = (Math.random() - 0.5) * rect.width * 1.1;
      const dy = -(26 + Math.random() * 64);

      bubble.className = "tab-bubble";
      bubble.setAttribute("aria-hidden", "true");
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${cx - size / 2 + (Math.random() - 0.5) * rect.width * 0.5}px`;
      bubble.style.top = `${cy - size / 2}px`;
      trackTabsContainer.appendChild(bubble);

      const animation = bubble.animate(
        [
          { transform: "translate(0, 0) scale(0.2)", opacity: 0.95 },
          { transform: `translate(${dx * 0.6}px, ${dy * 0.6}px) scale(1)`, opacity: 0.85, offset: 0.6 },
          { transform: `translate(${dx}px, ${dy}px) scale(0.7)`, opacity: 0 }
        ],
        {
          duration: 700 + Math.random() * 500,
          delay: Math.random() * 140,
          easing: "cubic-bezier(0.22, 0.61, 0.36, 1)",
          fill: "both"
        }
      );

      animation.onfinish = () => bubble.remove();
    }
  }

  function handleTabClick(event) {
    const clickedTab = event.currentTarget;
    const selectedTrack = clickedTab.dataset.track;

    if (selectedTrack === currentTrack) return;

    burstBubbles(clickedTab);

    tabButtons.forEach((btn) => {
      const isActive = btn === clickedTab;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-selected", isActive);
    });

    currentTrack = selectedTrack;
    panel.setAttribute("aria-labelledby", `tab-${selectedTrack}`);
    updateTabIndicator(selectedTrack);
    renderTrack(selectedTrack, false);
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", handleTabClick);
  });

  updateTabIndicator(currentTrack);
  renderTrack(currentTrack, true);
}

function initMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  if (!toggle) return;

  document.querySelectorAll(".panel a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.checked = false;
    });
  });
}

function initActiveNav() {
  if (!document.getElementById("home")) return;

  const sections = document.querySelectorAll("section[id], footer[id]");
  const navLinks = document.querySelectorAll(".links a");

  function setActiveLink() {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      current = "contact";
    }

    navLinks.forEach((link) => {
      link.removeAttribute("aria-current");
      const href = link.getAttribute("href");
      if (
        href === `#${current}` ||
        (current === "programs" && href === "programs.html") ||
        (current === "internship" && href === "internship-tasks.html")
      ) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  window.addEventListener("scroll", setActiveLink, { passive: true });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setTimeout(setActiveLink, 50);
    });
  });

  setActiveLink();
}

function initBubbleButtons() {
  if (!window.gsap) {
    console.warn("GSAP did not load, bubble buttons are off");
    return;
  }

  const noHover = window.matchMedia("(hover: none)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (noHover || reduceMotion) return;

  const SLOW = "slow(0.1, 0.7, false)";

  document.body.insertAdjacentHTML(
    "beforeend",
    '<svg xmlns="http://www.w3.org/2000/svg" class="bubble-goo" aria-hidden="true" focusable="false"><defs><filter id="bubble-goo"><feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"/><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo"/><feComposite in="SourceGraphic" in2="goo"/></filter></defs></svg>'
  );

  function topLeft(c) {
    const t = gsap.timeline();
    t.set(c, { x: 0, y: 0, rotation: -45 });
    t.to(c, { duration: 1.2, x: -25, y: -25, scaleY: 2, ease: SLOW });
    t.to(c[0], { duration: 0.1, scale: 0.2, x: "+=6", y: "-=2" });
    t.to(c[1], { duration: 0.1, scaleX: 1, scaleY: 0.8, x: "-=10", y: "-=7" }, "-=0.1");
    t.to(c[2], { duration: 0.1, scale: 0.2, x: "-=15", y: "+=6" }, "-=0.1");
    t.to(c[0], { duration: 1, scale: 0, x: "-=5", y: "-=15", opacity: 0 });
    t.to(c[1], { duration: 1, scaleX: 0.4, scaleY: 0.4, x: "-=10", y: "-=10", opacity: 0 }, "-=1");
    t.to(c[2], { duration: 1, scale: 0, x: "-=15", y: "+=5", opacity: 0 }, "-=1");
    return t;
  }

  function bottomRight(c) {
    const t = gsap.timeline();
    t.set(c, { x: 0, y: 0, rotation: 45 });
    t.to(c, { duration: 1.1, x: 30, y: 30, ease: SLOW });
    t.to(c[0], { duration: 0.1, scale: 0.2, x: "-=6", y: "+=3" });
    t.to(c[1], { duration: 0.1, scale: 0.8, x: "+=7", y: "+=3" }, "-=0.1");
    t.to(c[2], { duration: 0.1, scale: 0.2, x: "+=15", y: "-=6" }, "-=0.2");
    t.to(c[0], { duration: 1, scale: 0, x: "+=5", y: "+=15", opacity: 0 });
    t.to(c[1], { duration: 1, scale: 0.4, x: "+=7", y: "+=7", opacity: 0 }, "-=1");
    t.to(c[2], { duration: 1, scale: 0, x: "+=15", y: "-=5", opacity: 0 }, "-=1");
    return t;
  }

  document.querySelectorAll(".btn-primary").forEach((btn) => {
    const fx = document.createElement("span");
    fx.className = "bubble-fx";
    fx.setAttribute("aria-hidden", "true");
    fx.innerHTML =
      '<span class="circle tl"></span><span class="circle tl"></span><span class="circle tl"></span>' +
      '<span class="fill"></span>' +
      '<span class="circle br"></span><span class="circle br"></span><span class="circle br"></span>';

    btn.classList.add("btn-bubble");
    btn.appendChild(fx);

    const fill = fx.querySelector(".fill");
    const tlCircles = fx.querySelectorAll(".circle.tl");
    const brCircles = fx.querySelectorAll(".circle.br");

    const master = gsap.timeline({ paused: true });
    master.add(topLeft(tlCircles));
    master.to(fill, { duration: 0.8, scaleY: 1.1 }, 0.1);
    master.add(bottomRight(brCircles), 0.2);
    master.to(fill, { duration: 1.8, scale: 1, ease: "elastic.out(1.2, 0.4)" }, 1.2);
    master.timeScale(2.6);

    btn.addEventListener("mouseenter", () => {
      master.restart();
    });
  });
}

initTracks();
initMobileMenu();
initActiveNav();
window.addEventListener("load", initBubbleButtons);