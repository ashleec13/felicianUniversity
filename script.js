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

// Switch the image and description when a nearby location pill is selected.
function initializeLocationPills() {
  const pills = document.querySelectorAll(".pill");
  const description = document.getElementById("locationDescription");
  const locationImage = document.getElementById("locationImage");

  if (!pills.length || !description || !locationImage) return;

  pills.forEach((pill) => {
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
  const counter = document.getElementById("studentRatio");
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
      counter.textContent = `${count}:1`;
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
    button.addEventListener("click", () => {
      const campus = campusData[button.dataset.campus];
      if (!campus) return;

      track.dataset.active = button.dataset.campus;
      title.textContent = campus.title;
      description.textContent = campus.description;
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initializeLocationPills();
  initializeRatioCounter();
  initializeProgramTabs();
  initializeCampusSwitcher();
});