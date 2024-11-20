(function () {
  "use strict";

  var tinyslider = function () {
    var el = document.querySelectorAll(".testimonial-slider");

    if (el.length > 0) {
      var slider = tns({
        container: ".testimonial-slider",
        items: 1,
        axis: "horizontal",
        controlsContainer: "#testimonial-nav",
        swipeAngle: false,
        speed: 700,
        nav: true,
        controls: true,
        autoplay: true,
        autoplayHoverPause: true,
        autoplayTimeout: 3500,
        autoplayButtonOutput: false,
      });
    }
  };
  tinyslider();

  var sitePlusMinusDetail = function () {
    var quantity = document.getElementsByClassName("quantity");

    function createBindings(quantityContainer) {
      var quantityAmount =
        quantityContainer.getElementsByClassName("product-count")[0];
      var increase = quantityContainer.getElementsByClassName("plus-btnn")[0];
      var decrease = quantityContainer.getElementsByClassName("minus-btnn")[0];

      increase.addEventListener("click", function (e) {
        let value = parseInt(quantityAmount.value, 10);
        let max = parseInt(quantityAmount.getAttribute("max"));

        value = isNaN(value) ? 0 : value;
        if (value < max) {
          value++;
          quantityAmount.value = value;
        }
      });

      decrease.addEventListener("click", function (e) {
        let value = parseInt(quantityAmount.value, 10);
        let min = parseInt(quantityAmount.getAttribute("min") || 1);

        value = isNaN(value) ? 0 : value;
        if (value > min) {
          value--;
          quantityAmount.value = value;
        }
      });
    }

    function init() {
      for (var i = 0; i < quantity.length; i++) {
        createBindings(quantity[i]);
      }
    }

    init();
  };

  sitePlusMinusDetail();
})();

// In public/js/custom.js
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("priceSlider");
  const minPriceLabel = document.getElementById("priceMinLabel");
  const maxPriceLabel = document.getElementById("priceMaxLabel");
  const minPriceInput = document.getElementById("minPriceInput");
  const maxPriceInput = document.getElementById("maxPriceInput");

  if (slider) {
    // Get URL params
    const urlParams = new URLSearchParams(window.location.search);
    const minPrice = slider.dataset.minprice
      ? Number(slider.dataset.minprice)
      : 0;
    const maxPrice = slider.dataset.maxprice
      ? Number(slider.dataset.maxprice)
      : 10000;

    // Get current filter values from URL or use defaults
    const currentMinPrice = Number(urlParams.get("minPrice")) || minPrice;
    const currentMaxPrice = Number(urlParams.get("maxPrice")) || maxPrice;

    noUiSlider.create(slider, {
      start: [currentMinPrice, currentMaxPrice], // Use current values
      connect: true,
      range: {
        min: minPrice,
        max: maxPrice,
      },
      step: 1,
      format: {
        to: (value) => Math.round(value),
        from: (value) => Number(value),
      },
    });

    // Update labels and hidden inputs
    slider.noUiSlider.on("update", (values) => {
      const [min, max] = values;
      minPriceLabel.innerText = `$${min}`;
      maxPriceLabel.innerText = `$${max}`;
      minPriceInput.value = min;
      maxPriceInput.value = max;
    });

    // Set initial input values
    minPriceInput.value = currentMinPrice;
    maxPriceInput.value = currentMaxPrice;
  }
});

// public/js/custom.js
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const modalKeywordInput = document.getElementById("modalKeywordInput");
  const filterForm = document.getElementById("filterForm");

  // Sync search term to modal's hidden input
  if (searchInput && modalKeywordInput) {
    searchInput.addEventListener("input", (e) => {
      modalKeywordInput.value = e.target.value;
    });
    // Set initial value
    modalKeywordInput.value = searchInput.value;
  }

  // Debounced search
  let searchTimeout;
  searchInput?.addEventListener("input", (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      // Get current filter form data
      const formData = new FormData(filterForm);
      // Update search term
      formData.set("keyword", e.target.value);
      // Convert to URL params
      const params = new URLSearchParams(formData);
      // Navigate with all params
      window.location.href = `/products?${params.toString()}`;
    }, 500);
  });
});
