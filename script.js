// ============================================================
// FELICIAN HOMEPAGE INTERACTIONS
// All setup runs after the page is ready so every selector is safe.
// ============================================================

const campusData = {
  rutherford: {
    title: "Rutherford Campus",
    description: "Featuring classic historic architecture, traditional residence halls, central student dining, and tree-lined streets within walking distance to shops."
  },
  lodi: {
    title: "Lodi Campus",
    description: "Home to advanced healthcare simulation labs, modern science centers, student athletic facilities, and specialized academic centers."
  }
};

const locationData = {
  nyc: {
    image: "pictures/nycSkyline.jpg",
    alt: "New York City skyline",
    description: "NYC Connection: 20-minute direct transit to world-class internships & entertainment."
  },
  mall: {
    image: "pictures/americanDreamMall.jpg",
    alt: "American Dream Mall",
    description: "American Dream: Just minutes away from premier dining, indoor skiing, retail, and entertainment."
  },
  sports: {
    image: "pictures/metlife.webp",
    alt: "MetLife Stadium",
    description: "MetLife Stadium is close by for NFL games, concerts, and other major events."
  }
};

// Keep anchor scrolling accurate when the wrapped mobile header changes height.
function initializeNavigation() {
  const header = document.getElementById("site-header");
  if (!header) return;

  const updateHeaderOffset = () => {
    document.documentElement.style.setProperty("--nav-height", `${header.offsetHeight}px`);
  };

  updateHeaderOffset();
  if ("ResizeObserver" in window) {
    new ResizeObserver(updateHeaderOffset).observe(header);
  } else {
    window.addEventListener("resize", updateHeaderOffset);
  }
}

// Switch the image and description when a nearby location pill is selected.
function initializeLocationPills() {
  const pills = document.querySelectorAll(".pill");
  const description = document.getElementById("locationDescription");
  const locationImage = document.getElementById("locationImage");

  if (!pills.length || !description || !locationImage) return;

  pills.forEach((pill) => {
    // Keep the selected pill, image, alt text, and supporting copy synchronized.
    pill.addEventListener("click", () => {
      const location = locationData[pill.dataset.location];
      if (!location) return;

      pills.forEach((button) => button.classList.remove("active"));
      pill.classList.add("active");
      locationImage.src = location.image;
      locationImage.alt = location.alt;
      description.textContent = location.description;
    });
  });
}

// Animate the student-to-professor ratio once it enters the viewport.
function initializeRatioCounter() {
  const counter = document.getElementById("ratioStudents");
  if (!counter || !("IntersectionObserver" in window)) return;

  let started = false;
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting || started) return;
    started = true;

    let count = 0;
    const target = 15;
    const stepTime = 1800 / target;
    const countUp = setInterval(() => {
      count += 1;
      // Only update the number; the fixed ':1' line stays in place while counting.
      counter.textContent = count;
      if (count === target) clearInterval(countUp);
    }, stepTime);
  });

  observer.observe(counter);
}

// Keep the custom program panels and their tab buttons in sync.
function initializeProgramTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");
  if (!tabButtons.length || !tabPanels.length) return;

  tabButtons.forEach((button) => {
    // Activate one panel at a time while keeping keyboard tab state accurate.
    button.addEventListener("click", () => {
      const targetTab = button.dataset.tab;
      tabButtons.forEach((tab) => {
        tab.classList.toggle("active", tab === button);
        tab.setAttribute("aria-selected", String(tab === button));
      });
      tabPanels.forEach((panel) => {
        panel.classList.toggle("active", panel.id === targetTab);
      });
    });
  });
}

// Update the campus description and the shuttle position from a button click.
function initializeCampusSwitcher() {
  const track = document.getElementById("campusTrack");
  const title = document.getElementById("campusTitle");
  const description = document.getElementById("campusDesc");
  const buttons = document.querySelectorAll("[data-campus]");
  if (!track || !title || !description || !buttons.length) return;

  buttons.forEach((button) => {
    // Move the shuttle indicator and replace the campus details as one action.
    button.addEventListener("click", () => {
      const campus = campusData[button.dataset.campus];
      if (!campus) return;

      track.dataset.active = button.dataset.campus;
      title.textContent = campus.title;
      description.textContent = campus.description;
    });
  });
}

// Search visible page copy and move focus to the first matching section.
function initializeSiteSearch() {
  const form = document.getElementById("siteSearch");
  const input = document.getElementById("siteSearchInput");
  const status = document.getElementById("searchStatus");
  if (!form || !input || !status) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = input.value.trim().toLowerCase();
    if (!query) return;

    const searchableContent = document.querySelectorAll("main h1, main h2, main h3, main p");
    const match = [...searchableContent].find((element) => element.textContent.toLowerCase().includes(query));
    if (match) {
      match.scrollIntoView({ behavior: "smooth", block: "center" });
      status.textContent = `Found ${query}.`;
      input.removeAttribute("aria-invalid");
    } else {
      status.textContent = `No results found for ${query}.`;
      input.setAttribute("aria-invalid", "true");
    }
  });
}

// Filter the editorial cards without changing their reserved grid dimensions.
function initializeNewsFilters() {
  const buttons = document.querySelectorAll("[data-news-filter]");
  const cards = document.querySelectorAll("[data-news-category]");
  if (!buttons.length || !cards.length) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.newsFilter;
      buttons.forEach((item) => item.classList.toggle("active", item === button));
      cards.forEach((card) => {
        card.hidden = filter !== "all" && card.dataset.newsCategory !== filter;
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Initialize each independent interaction after all page markup is available.
  initializeNavigation();
  initializeLocationPills();
  initializeRatioCounter();
  initializeProgramTabs();
  initializeCampusSwitcher();
  initializeSiteSearch();
  initializeNewsFilters();
});