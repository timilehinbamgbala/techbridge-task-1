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

function initChallenges() {
  const grid = document.getElementById("challengeGrid");
  if (!grid) return;

  const challenges = [
    {
      id: "sales-analysis",
      title: "Monthly Sales Analysis",
      track: "Data Analytics",
      level: "Beginner",
      time: "3 to 4 hours",
      summary: "Clean a small sales spreadsheet and find which products, months and regions bring in the most revenue.",
      outcome: "A one page summary with pivot tables and two charts showing monthly sales performance.",
      objective: "Turn raw sales records into clear findings that a manager could act on.",
      skills: ["Data cleaning", "Pivot tables", "Basic charts"],
      tools: ["Excel", "Google Sheets"],
      produce: [
        "A cleaned copy of the dataset with duplicates and blanks handled",
        "Pivot tables for product, month and region",
        "A short note listing three findings and what they suggest"
      ]
    },
    {
      id: "expense-breakdown",
      title: "Expense Breakdown Report",
      track: "Data Analytics",
      level: "Beginner",
      time: "2 to 3 hours",
      summary: "Group a month of company expenses into categories and show where the money is going.",
      outcome: "A clear report that ranks spending categories and flags the three biggest costs.",
      objective: "Practise sorting, grouping and summarising financial data without losing accuracy.",
      skills: ["Categorising data", "SUMIF and formulas", "Bar and pie charts"],
      tools: ["Excel", "Google Sheets"],
      produce: [
        "A categorised expense sheet with totals per category",
        "One chart comparing categories",
        "Two sentences recommending where to cut costs"
      ]
    },
    {
      id: "churn-analysis",
      title: "Customer Churn Analysis",
      track: "Data Analytics",
      level: "Intermediate",
      time: "4 to 5 hours",
      summary: "Study a subscription dataset to work out which customers leave, and what they have in common.",
      outcome: "A churn rate summary and a short list of patterns that point to why customers leave.",
      objective: "Find the traits linked to customers leaving so the business can act before it happens.",
      skills: ["SQL grouping and aggregation", "Comparing segments", "Presenting findings"],
      tools: ["Excel", "SQL", "Google Sheets"],
      produce: [
        "Overall churn rate and churn by customer segment",
        "Two or three charts that support your findings",
        "A short written summary with recommendations"
      ]
    },
    {
      id: "performance-dashboard",
      title: "Business Performance Dashboard",
      track: "Data Analytics",
      level: "Advanced",
      time: "6 to 8 hours",
      summary: "Combine sales, cost and customer data from two related tables into one dashboard for a small business.",
      outcome: "A working dashboard that lets a manager check monthly performance at a glance.",
      objective: "Design a dashboard around the questions a decision maker actually asks.",
      skills: ["Joining related tables", "KPI design", "Data visualization"],
      tools: ["Excel", "SQL", "Google Sheets"],
      produce: [
        "A dashboard with at least four visuals",
        "A list of the KPIs you chose and why",
        "A short guide explaining how to read the dashboard"
      ]
    },
    {
      id: "landing-page",
      title: "Responsive Landing Page",
      track: "Web Development",
      level: "Beginner",
      time: "3 to 4 hours",
      summary: "Build a landing page for a made up product that reads well on a phone, tablet and laptop.",
      outcome: "A finished one page site with a hero, features and a call to action that adapts to any screen.",
      objective: "Practise semantic HTML and responsive CSS by building a page from a simple brief.",
      skills: ["Semantic HTML", "Flexbox and Grid", "Media queries"],
      tools: ["HTML", "CSS", "Git/GitHub"],
      produce: [
        "A single page with hero, features and contact sections",
        "A layout that holds up from 360px wide to desktop",
        "A live link to the deployed page"
      ]
    },
    {
      id: "contact-form",
      title: "Contact Form with Validation",
      track: "Web Development",
      level: "Intermediate",
      time: "3 to 4 hours",
      summary: "Create a contact form that checks what people type and tells them clearly what to fix.",
      outcome: "A form that validates each field, shows helpful messages, and confirms when it is sent.",
      objective: "Learn how JavaScript reads user input and responds without reloading the page.",
      skills: ["DOM events", "Form validation", "Accessible error messages"],
      tools: ["HTML", "CSS", "JavaScript"],
      produce: [
        "Name, email and message fields with live validation",
        "Error and success states that are easy to notice",
        "A form that works with keyboard only"
      ]
    },
    {
      id: "product-page",
      title: "Product Page with Image Gallery",
      track: "Web Development",
      level: "Intermediate",
      time: "4 to 5 hours",
      summary: "Design a product page where shoppers can switch between photos and pick options like size or colour.",
      outcome: "A product page with a working gallery and option selectors that update what the visitor sees.",
      objective: "Combine layout work with interactive behaviour to build a page people could shop from.",
      skills: ["Layout design", "Event handling", "Updating the DOM"],
      tools: ["HTML", "CSS", "JavaScript"],
      produce: [
        "A gallery with thumbnails that change the main image",
        "Size and colour selectors that update the page",
        "A layout that works on mobile and desktop"
      ]
    },
    {
      id: "cart-interface",
      title: "Shopping Cart Interface",
      track: "Web Development",
      level: "Advanced",
      time: "6 to 8 hours",
      summary: "Build a cart where visitors add items, change quantities, and keep their cart after a refresh.",
      outcome: "A working cart that updates totals instantly and remembers items between visits.",
      objective: "Manage changing data in JavaScript and keep what is on screen in sync with it.",
      skills: ["State management", "Array methods", "localStorage"],
      tools: ["HTML", "CSS", "JavaScript"],
      produce: [
        "Add, remove and quantity controls for each item",
        "A running subtotal and item count",
        "A cart that survives a page refresh"
      ]
    }
  ];

  const rank = { Beginner: 1, Intermediate: 2, Advanced: 3 };
  const state = { track: "all", level: "all", query: "", sort: "default" };

  const count = document.getElementById("challengeCount");
  const empty = document.getElementById("challengeEmpty");
  const search = document.getElementById("challengeSearch");
  const sort = document.getElementById("challengeSort");
  const reset = document.getElementById("challengeReset");
  const emptyReset = document.getElementById("challengeEmptyReset");
  const chips = document.querySelectorAll(".ch-chip");
  const modal = document.getElementById("challengeModal");
  const modalBody = document.getElementById("modalBody");
  const modalClose = document.getElementById("modalClose");
  let lastTrigger = null;

  function levelMarkup(level) {
    return (
      '<p class="level lvl-' + rank[level] + '">' +
        '<span class="meter" aria-hidden="true"><i></i><i></i><i></i></span>' +
        level +
      "</p>"
    );
  }

  const blobA = '<svg class="ch-blob ch-blob-a" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path d="M28.2,-44.5C36.5,-38.6,43,-30.6,41.6,-22.4C40.1,-14.1,30.6,-5.5,27.8,2.9C24.9,11.4,28.6,19.7,28.5,30.9C28.5,42.1,24.5,56.1,18.3,54.3C12.1,52.4,3.6,34.7,-7.9,29.9C-19.3,25.2,-33.7,33.4,-41.9,31.9C-50,30.4,-51.8,19,-54,7.5C-56.1,-4.1,-58.4,-15.9,-56.9,-28.7C-55.3,-41.5,-49.9,-55.3,-39.7,-60.3C-29.6,-65.4,-14.8,-61.6,-2.4,-57.9C10,-54.1,20,-50.3,28.2,-44.5Z" transform="translate(100 100)"/></svg>';
  const blobB = '<svg class="ch-blob ch-blob-b" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path d="M26.4,-42.2C35.7,-35.1,45.9,-30.3,57.4,-21.4C69,-12.5,82,0.6,83.7,14.4C85.4,28.2,75.8,42.8,63.3,52C50.9,61.3,35.6,65.2,21.7,65.3C7.8,65.4,-4.6,61.7,-12.2,53.9C-19.8,46,-22.7,34.1,-29.7,25.8C-36.7,17.5,-47.9,13,-50,6.4C-52.1,-0.1,-45.2,-8.8,-40.7,-18.6C-36.3,-28.5,-34.4,-39.6,-28.1,-48C-21.7,-56.4,-10.8,-62.2,-1.2,-60.4C8.5,-58.6,17.1,-49.2,26.4,-42.2Z" transform="translate(100 100)"/></svg>';
  const peekFlag = '<svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 6V40" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M12 8H35L29 16L35 24H12Z" fill="currentColor"/></svg>';

  function glyphFor(track) {
    if (track === "Data Analytics") {
      return '<svg class="ch-glyph" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 40V8M8 40H42"/><rect x="14" y="24" width="7" height="12"/><rect x="25" y="14" width="7" height="22"/><rect x="36" y="28" width="6" height="8"/></svg>';
    }
    return '<svg class="ch-glyph" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 14L8 24l10 10M30 14l10 10-10 10M27 10l-6 28"/></svg>';
  }

  function cardTemplate(c, index) {
    return (
      '<div class="ch-item" data-track="' + c.track + '">' +
        '<div class="ch-peek" aria-hidden="true">' + peekFlag + "</div>" +
        '<article class="ch-card" style="animation-delay:' + index * 50 + 'ms">' +
          '<div class="ch-blobs" aria-hidden="true">' + blobA + blobB + "</div>" +
          glyphFor(c.track) +
          '<div class="ch-top">' +
            '<p class="ch-track">' + c.track + "</p>" +
            levelMarkup(c.level) +
          "</div>" +
          "<h3>" + c.title + "</h3>" +
          '<p class="ch-summary">' + c.summary + "</p>" +
          '<div class="ch-outcome"><h4>Expected outcome</h4><p>' + c.outcome + "</p></div>" +
          '<div class="ch-foot">' +
            '<span class="ch-time">' + c.time + "</span>" +
            '<button type="button" class="btn btn-solid ch-view" data-id="' + c.id + '" aria-label="View challenge: ' + c.title + '">View Challenge</button>' +
          "</div>" +
        "</article>" +
      "</div>"
    );
  }

  function initCardEffects() {
    if (!window.matchMedia("(hover: hover)").matches) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function rangify(value, percent) {
      const numerator = percent >= 0.5 ? percent - 0.5 : (0.5 - percent) * -1;
      return value * (numerator / 0.5);
    }

    function clamp(min, value, max) {
      return Math.min(Math.max(min, value), max);
    }

    function pulse(element, name, duration, delay) {
      const run = () => {
        element.classList.remove(name);
        element.classList.add(name);
        setTimeout(() => element.classList.remove(name), duration);
      };
      if (delay) {
        setTimeout(run, delay);
      } else {
        run();
      }
    }

    function settle(item) {
      item.classList.add("is-settling");
      item.style.transform = "";
      setTimeout(() => item.classList.remove("is-settling"), 450);
    }

    grid.addEventListener("mousemove", (e) => {
      const item = e.target.closest(".ch-item");
      if (!item) return;

      const rect = item.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const xPercent = mouseX / rect.width;
      const yPercent = (e.clientY - rect.top) / rect.height;

      if (!reduceMotion) {
        item.classList.remove("is-settling");
        item.style.transform =
          "perspective(1000px) rotateX(" + rangify(6, yPercent) + "deg) rotateY(" + rangify(-6, xPercent) + "deg) scale(1.02)";
      }

      const peek = item.querySelector(".ch-peek");
      if (peek) {
        const x = clamp(12, mouseX - peek.offsetWidth / 2, item.offsetWidth - peek.offsetWidth - 12);
        peek.style.transform = "translateX(" + x + "px)";
      }
    });

    grid.addEventListener("mouseout", (e) => {
      const item = e.target.closest(".ch-item");
      if (!item || item.contains(e.relatedTarget)) return;
      settle(item);
    });

    grid.addEventListener("mouseup", (e) => {
      const item = e.target.closest(".ch-item");
      if (!item) return;
      if (!item.classList.contains("selected") && !item.classList.contains("chef-reappear")) {
        pulse(item, "selected", 800);
        pulse(item, "chef-reappear", 250, 800);
      }
    });
  }

  function modalTemplate(c) {
    return (
      '<div class="ch-modal-meta">' +
        '<p class="ch-track">' + c.track + "</p>" +
        levelMarkup(c.level) +
      "</div>" +
      '<h2 id="modalTitle">' + c.title + "</h2>" +
      "<section><h3>Objective</h3><p>" + c.objective + "</p></section>" +
      '<section><h3>Skills you will use</h3><ul class="ch-tags">' + c.skills.map((s) => "<li>" + s + "</li>").join("") + "</ul></section>" +
      '<section><h3>Tools you can use</h3><ul class="ch-tags">' + c.tools.map((t) => "<li>" + t + "</li>").join("") + "</ul></section>" +
      '<section><h3>What you need to produce</h3><ul class="ch-plain">' + c.produce.map((p) => "<li>" + p + "</li>").join("") + "</ul></section>" +
      "<section><h3>Expected result</h3><p>" + c.outcome + "</p></section>" +
      '<div class="ch-facts">' +
        "<div><strong>" + c.time + "</strong><span>Estimated time</span></div>" +
        "<div><strong>" + c.level + "</strong><span>Difficulty</span></div>" +
        "<div><strong>" + c.track + "</strong><span>Track</span></div>" +
      "</div>"
    );
  }

  function isFiltered() {
    return state.track !== "all" || state.level !== "all" || state.query.trim() !== "";
  }

  function visible() {
    const q = state.query.trim().toLowerCase();
    const list = challenges.filter((c) => {
      const trackOk = state.track === "all" || c.track === state.track;
      const levelOk = state.level === "all" || c.level === state.level;
      const queryOk = q === "" || c.title.toLowerCase().includes(q);
      return trackOk && levelOk && queryOk;
    });
    if (state.sort === "easy") list.sort((a, b) => rank[a.level] - rank[b.level]);
    if (state.sort === "hard") list.sort((a, b) => rank[b.level] - rank[a.level]);
    if (state.sort === "name") list.sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }

  function render() {
    const list = visible();
    grid.innerHTML = list.map(cardTemplate).join("");
    empty.hidden = list.length !== 0;
    reset.hidden = !isFiltered();
    count.textContent = "Showing " + list.length + " of " + challenges.length + " challenges";
  }

  function syncChips() {
    chips.forEach((chip) => {
      const active = state[chip.dataset.group] === chip.dataset.value;
      chip.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function resetAll() {
    state.track = "all";
    state.level = "all";
    state.query = "";
    state.sort = "default";
    search.value = "";
    sort.value = "default";
    syncChips();
    render();
  }

  function openModal(id, trigger) {
    const c = challenges.find((item) => item.id === id);
    if (!c) return;
    lastTrigger = trigger;
    modalBody.innerHTML = modalTemplate(c);
    modal.dataset.track = c.track;
    modal.querySelector(".ch-modal-inner").scrollTop = 0;
    document.body.classList.add("ch-locked");
    modal.showModal();
  }

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      state[chip.dataset.group] = chip.dataset.value;
      syncChips();
      render();
    });
  });

  search.addEventListener("input", () => {
    state.query = search.value;
    render();
  });

  sort.addEventListener("change", () => {
    state.sort = sort.value;
    render();
  });

  reset.addEventListener("click", resetAll);
  emptyReset.addEventListener("click", resetAll);

  grid.addEventListener("click", (e) => {
    const btn = e.target.closest(".ch-view");
    if (btn) openModal(btn.dataset.id, btn);
  });

  modalClose.addEventListener("click", () => modal.close());

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.close();
  });

  modal.addEventListener("close", () => {
    document.body.classList.remove("ch-locked");
    if (lastTrigger && document.body.contains(lastTrigger)) lastTrigger.focus();
  });

  initCardEffects();
  syncChips();
  render();
}

initTracks();
initMobileMenu();
initActiveNav();
initChallenges();
window.addEventListener("load", initBubbleButtons);
