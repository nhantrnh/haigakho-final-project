document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup-ad");
  const closePopup = document.getElementById("close-popup");
  const shopNowButton = document.getElementById("shop-now");
  const firstVisit = sessionStorage.getItem("firstVisit");

  if (firstVisit) {
    return;
  }
  popup.classList.remove("hidden");
  popup.classList.add("animate__animated", "animate__fadeIn");

  closePopup.addEventListener("click", () => {
    popup.classList.remove("animate__fadeIn");
    popup.classList.add("animate__animated", "animate__fadeOut");

    setTimeout(() => {
      popup.classList.add("hidden");
    }, 1000);

    sessionStorage.setItem("firstVisit", "true");
  });

  shopNowButton.addEventListener("click", () => {
    window.location.href = "/shop";
  });
});

// document.addEventListener("DOMContentLoaded", () => {
//   const carousel = document.getElementById("promotionCarousel");

//   const myCarousel = new bootstrap.Carousel(carousel, {
//     interval: 3000,
//     ride: "carousel",
//   });

//   const prevBtn = document.querySelector(".carousel-control-prev");
//   const nextBtn = document.querySelector(".carousel-control-next");

//   prevBtn.addEventListener("click", () => {
//     myCarousel.prev();
//   });

//   nextBtn.addEventListener("click", () => {
//     myCarousel.next();
//   });
// });

// $(document).ready(function () {
//   // Initialize Bootstrap 5 carousel
//   var myCarousel = new bootstrap.Carousel(
//     document.getElementById("promotionCarousel"),
//     {
//       interval: 5000, // 5 seconds per slide
//       wrap: true, // Continuous loop
//       keyboard: true, // Allow keyboard navigation
//     }
//   );

//   // Optional: Manual controls
//   $(".carousel-control-prev").click(function () {
//     myCarousel.prev();
//   });

//   $(".carousel-control-next").click(function () {
//     myCarousel.next();
//   });
// });

// document.addEventListener("DOMContentLoaded", function () {
//   const hasVisited = localStorage.getItem("hasVisited");
//   const popup = document.getElementById("popup-ad");
//   const closeButton = document.getElementById("close-popup");

//   // Only show popup if this is first visit
//   if (!hasVisited) {
//     setTimeout(() => {
//       popup.classList.remove("hidden");
//       popup.classList.add("animate__animated", "animate__fadeIn");
//     }, 2000); // Show after 2 seconds

//     // Set visited flag
//     localStorage.setItem("hasVisited", "true");
//   }

//   // Close popup handlers
//   closeButton.addEventListener("click", () => {
//     popup.classList.add("hidden");
//   });

//   // Close on backdrop click
//   popup.addEventListener("click", (e) => {
//     if (e.target === popup) {
//       popup.classList.add("hidden");
//     }
//   });

//   // Close on escape key
//   document.addEventListener("keydown", (e) => {
//     if (e.key === "Escape" && !popup.classList.contains("hidden")) {
//       popup.classList.add("hidden");
//     }
//   });
// });
