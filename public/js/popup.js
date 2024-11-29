document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup-ad");
  const closePopup = document.getElementById("close-popup");
  const shopNowButton = document.getElementById("shop-now");

  popup.classList.remove("hidden");
  popup.classList.add("animate__animated", "animate__fadeIn");
  localStorage.setItem("firstVisit", "true");

  closePopup.addEventListener("click", () => {
    popup.classList.remove("animate__fadeIn");
    popup.classList.add("animate__animated", "animate__fadeOut");

    setTimeout(() => {
      popup.classList.add("hidden");
    }, 1000);
  });

  shopNowButton.addEventListener("click", () => {
    window.location.href = "/shop";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("promotionCarousel");

  const myCarousel = new bootstrap.Carousel(carousel, {
    interval: 3000,
    ride: "carousel",
  });

  const prevBtn = document.querySelector(".carousel-control-prev");
  const nextBtn = document.querySelector(".carousel-control-next");

  prevBtn.addEventListener("click", () => {
    myCarousel.prev();
  });

  nextBtn.addEventListener("click", () => {
    myCarousel.next();
  });
});
