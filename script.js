// ============================================================
// SITE DATA / CONTENT SECTION
// This file can store page data, section information, and logic
// for the Felician University homepage.
// ============================================================

const siteSections = [
  {
    id: "why-felician",
    title: "Why Felician",
    description: "Supportive community, career-focused education, and a welcoming campus culture."
  },
  {
    id: "programs",
    title: "Programs",
    description: "Academic majors and pathways designed to prepare students for future careers."
  },
  {
    id: "student-life",
    title: "Student Life",
    description: "Clubs, athletics, events, and student experiences that build connection."
  },
  {
    id: "campuses",
    title: "Campuses",
    description: "Convenient campus locations in New Jersey with access to the NYC area."
  },
  {
    id: "admissions",
    title: "Admissions",
    description: "Application guidance, aid information, and next steps for incoming students."
  }
];

// ============================================================
// PAGE INITIALIZATION
// Run this when the DOM is ready and attach interactions.
// ============================================================
function initializePage() {
  console.log("Felician homepage ready.");
  console.log("Sections available:", siteSections.length);
}

// ============================================================
// SECTION HELPERS
// Use this area to build cards, render content, or add dynamic features.
// ============================================================
function renderSectionCards() {
  siteSections.forEach((section) => {
    console.log(section.title, section.description);
  });
}

// Run startup functions when the page loads.
document.addEventListener("DOMContentLoaded", () => {
  initializePage();
  renderSectionCards();
});
