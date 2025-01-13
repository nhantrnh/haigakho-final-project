// Chart initialization
const initCharts = () => {
  // Sales Chart
  const salesCtx = document.getElementById("salesChart")?.getContext("2d");
  if (salesCtx) {
    new Chart(salesCtx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Sales",
            data: [65, 59, 80, 81, 56, 55],
            borderColor: "#3b5d50",
            tension: 0.1,
          },
        ],
      },
    });
  }

  // Products Chart
  const productsCtx = document
    .getElementById("productsChart")
    ?.getContext("2d");
  if (productsCtx) {
    new Chart(productsCtx, {
      type: "doughnut",
      data: {
        labels: ["Electronics", "Clothing", "Books", "Food"],
        datasets: [
          {
            data: [30, 25, 20, 25],
            backgroundColor: ["#3b5d50", "#f9bf29", "#95c23d", "#666666"],
          },
        ],
      },
    });
  }
};

// Active link handling
const initActiveLinks = () => {
  const currentPath = window.location.pathname;

  // Remove active class from all links first
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
  });

  // Add active class to matching link
  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (
      currentPath === href ||
      (href !== "/admin" && currentPath.startsWith(href))
    ) {
      link.classList.add("active");
    }
  });
};

// Initialize when document loads
document.addEventListener("DOMContentLoaded", () => {
  initCharts();
  initActiveLinks();
});
