// Function to load HTML components
document.addEventListener("DOMContentLoaded", function () {
  // Load all components with data-component attribute
  const components = document.querySelectorAll("[data-component]");
  components.forEach((element) => {
    const componentName = element.getAttribute("data-component");
    loadComponent(element, componentName);
  });

  // Set active state for current page in sidebar
  const currentPage = window.location.pathname.split("/").pop();
  setActiveSidebarItem(currentPage);
});

// Function to load a component
function loadComponent(element, componentName) {
  fetch(`components/${componentName}.html`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load ${componentName}`);
      }
      return response.text();
    })
    .then((html) => {
      element.innerHTML = html;

      // Initialize sidebar toggle if sidebar was loaded
      if (componentName === "sidebar") {
        initSidebarToggle();
      }
    })
    .catch((error) => {
      console.error("Error loading component:", error);
    });
}

// Function to set active state for current page in sidebar
function setActiveSidebarItem(currentPage) {
  // Default to dashboard if on index or no specific page
  if (!currentPage || currentPage === "" || currentPage === "index.html") {
    currentPage = "dashboard.html";
  }

  // Remove .html extension if present
  const pageName = currentPage.replace(".html", "");

  // Wait for sidebar to load
  const checkSidebar = setInterval(() => {
    const sidebarNav = document.querySelector(".sidebar-nav");
    if (sidebarNav) {
      clearInterval(checkSidebar);

      // Remove all active classes
      document.querySelectorAll(".sidebar-nav li").forEach((item) => {
        item.classList.remove("active");
      });

      // Add active class to current page
      const activeItem = document.querySelector(`.nav-${pageName}`);
      if (activeItem) {
        activeItem.classList.add("active");
      }
    }
  }, 100);
}

// Initialize sidebar toggle functionality
function initSidebarToggle() {
  const sidebarToggle = document.getElementById("sidebar-toggle");
  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", function () {
      document.querySelector(".sidebar").classList.toggle("sidebar-open");
    });
  }
}
