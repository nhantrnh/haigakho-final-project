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
