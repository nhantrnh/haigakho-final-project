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
})();

// public/js/custom.js
document.getElementById("signoutBtn")?.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const response = await fetch("/signout", {
      method: "GET",
    });
    if (response.ok) {
      window.location.href = "/";
    }
  } catch (error) {
    console.error("Signout error:", error);
  }
});

function toggleCartSidebar() {
  const cartSidebar = document.getElementById("cartSidebar");
  cartSidebar.classList.toggle("open");
}
$(document).ready(function () {
  // Khi bấm vào nút "ADD TO CART"
  $(".add-to-cart").on("click", function () {
    var productCart = $(this).closest(".product-info"); // Lấy container sản phẩm
    var productId = productCart.data("product-id"); // Lấy ID của sản phẩm
    var quantity = parseInt(productCart.find(".quantity-value").val()) || 0; // Lấy số lượng người dùng muốn thêm
    var stock = parseInt(productCart.find(".product-amount").text()) || 0; // Lấy số lượng tồn kho
    var cartItem = $(`.cart-item[data-product-id="${productId}"]`); // Sử dụng `data-product-id` để xác định sản phẩm
    var currentQuantity = 0;

    if (cartItem.length > 0) {
      // Nếu sản phẩm đã có trong giỏ hàng, lấy giá trị `currentQuantity`
      var quantityElement = cartItem.find(".cart-item-quantity");
      currentQuantity = parseInt(quantityElement.text()) || 0; // Mặc định là 0 nếu không tìm thấy
    }

    // Kiểm tra số lượng hợp lệ
    if (quantity <= 0) {
      alert("Please select a valid quantity");
      return;
    }

    // Kiểm tra nếu tổng số lượng vượt quá số lượng trong kho
    if (currentQuantity + quantity > stock) {
      quantity = stock - currentQuantity;
    }

    // Gửi yêu cầu AJAX để thêm sản phẩm vào giỏ hàng
    $.ajax({
      url: "/add-to-cart", // Địa chỉ API hoặc route thêm sản phẩm vào giỏ hàng
      type: "POST",
      data: {
        productId: productId,
        quantity: quantity,
      },
      success: function (response) {
        if (response.success) {
          // Cập nhật giỏ hàng trong sidebar
          updateCartSidebar(response.cart);
          saveCartToLocalStorage(response.cart); // Lưu giỏ hàng vào localStorage

          // Tạo bản sao của ảnh sản phẩm
          var productImage = $(".product-image").clone();
          productImage.css({
            position: "absolute",
            top: $(".product-image").offset().top,
            left: $(".product-image").offset().left,
            width: $(".product-image").width(),
            height: $(".product-image").height(),
            zIndex: 1000,
          });
          $("body").append(productImage);

          // Di chuyển ảnh đến icon giỏ hàng
          gsap.to(productImage, {
            duration: 1,
            x:
              $(".cart-icon-container").offset().left -
              productImage.offset().left,
            y:
              $(".cart-icon-container").offset().top -
              productImage.offset().top,
            width: 50,
            height: 50,
            opacity: 0.5,
            onComplete: function () {
              // Xóa bản sao sau khi animation kết thúc
              productImage.remove();
            },
          });
        } else {
          alert(response.message || "Failed to add product to cart");
        }
      },
      error: function (xhr, status, error) {
        alert("An error occurred: " + error);
      },
    });
  });

  // Cập nhật sidebar giỏ hàng
  function updateCartSidebar(cart) {
    var cartItems = $("#cart-items");
    cartItems.empty(); // Xóa các sản phẩm cũ

    var totalPrice = 0;
    var totalItems = 0;

    cart.forEach(function (item) {
      var productHtml = `
        <li class="cart-item" data-product-id="${item.productId}">
          <img src="${item.imageUrl}" class="cart-item-image" alt="${item.name}" />
          <div class="cart-item-details">
            <p>${item.name}</p>
            <p>Price: $${item.price}</p>
            <p>
              Quantity: 
              <button class="decrease-qty">-</button>
              <span class="cart-item-quantity">${item.quantity}</span>
              <button class="increase-qty">+</button>
            </p>
            <button class="remove-item">
              <i class="fa fa-trash"></i>
            </button>
          </div>
        </li>
      `;
      cartItems.append(productHtml);

      totalItems += parseInt(item.quantity);
      totalPrice += item.price * item.quantity;
    });

    // Cập nhật tổng số sản phẩm và tổng giá trị
    $("#cart-count").text(totalItems);
    $("#cart-countt").text(totalItems);
    $("#cart-total").text(totalPrice.toFixed(2));

    // Thêm sự kiện cho các nút tăng giảm và xoá
    $(".decrease-qty").on("click", decreaseQuantity);
    $(".increase-qty").on("click", increaseQuantity);
    $(".remove-item").on("click", removeItem);
  }

  // Lưu giỏ hàng vào localStorage
  function saveCartToLocalStorage(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Giảm số lượng
  function decreaseQuantity() {
    var cartItem = $(this).closest(".cart-item");
    var productId = cartItem.data("product-id");
    var quantityElement = cartItem.find(".cart-item-quantity");
    var currentQuantity = parseInt(quantityElement.text());

    if (currentQuantity > 1) {
      // Gửi yêu cầu AJAX để giảm số lượng sản phẩm
      $.ajax({
        url: "/update-cart",
        type: "POST",
        data: {
          productId: productId,
          quantity: currentQuantity - 1,
        },
        success: function (response) {
          updateCartSidebar(response.cart);
          saveCartToLocalStorage(response.cart); // Lưu lại giỏ hàng
        },
        error: function (xhr, status, error) {
          alert("An error occurred: " + error);
        },
      });
    } else {
      $.ajax({
        url: "/remove-from-cart",
        type: "POST",
        data: { productId: productId },
        success: function (response) {
          updateCartSidebar(response.cart);
          saveCartToLocalStorage(response.cart); // Lưu lại giỏ hàng
        },
        error: function (xhr, status, error) {
          alert("An error occurred: " + error);
        },
      });
    }
  }

  // Tăng số lượng
  function increaseQuantity() {
    var cartItem = $(this).closest(".cart-item");
    var productId = cartItem.data("product-id");
    var quantityElement = cartItem.find(".cart-item-quantity");
    var currentQuantity = parseInt(quantityElement.text());
    // Gửi yêu cầu AJAX để tăng số lượng sản phẩm
    $.ajax({
      url: "/update-cart",
      type: "POST",
      data: {
        productId: productId,
        quantity: currentQuantity + 1,
      },
      success: function (response) {
        updateCartSidebar(response.cart);
        saveCartToLocalStorage(response.cart); // Lưu lại giỏ hàng
      },
      error: function (xhr, status, error) {
        console("An error occurred: " + error);
      },
    });
  }

  // Xoá sản phẩm khỏi giỏ hàng
  function removeItem() {
    var cartItem = $(this).closest(".cart-item");
    var productId = cartItem.data("product-id");

    // Gửi yêu cầu AJAX để xoá sản phẩm khỏi giỏ hàng
    $.ajax({
      url: "/remove-from-cart",
      type: "POST",
      data: { productId: productId },
      success: function (response) {
        updateCartSidebar(response.cart);
        saveCartToLocalStorage(response.cart); // Lưu lại giỏ hàng
      },
      error: function (xhr, status, error) {
        alert("An error occurred: " + error);
      },
    });
  }

  // Khi trang tải lại, kiểm tra giỏ hàng trong localStorage và hiển thị lại
  if (localStorage.getItem("cart")) {
    var savedCart = JSON.parse(localStorage.getItem("cart"));
    updateCartSidebar(savedCart);
  }
});

$(document).ready(function () {
  // Related Products Slider
  var slider = tns({
    container: "#relatedProductsSlider",
    items: 1,
    responsive: {
      640: {
        edgePadding: 20,
        gutter: 20,
        items: 2,
      },
      700: {
        gutter: 30,
      },
      900: {
        items: 3,
      },
    },
    slideBy: "page",
    autoplay: true,
    controls: false, // Ẩn nút điều hướng
    nav: true, // Hiện nút điều hướng dưới dạng chấm tròn
    navPosition: "bottom", // Đặt nút điều hướng ở dưới slider
    mouseDrag: true,
    autoplayButtonOutput: false,
  });

  // Image Zoom (using a library like ElevateZoom or similar)
  // Example using jQuery Zoom (https://www.jacklmoore.com/zoom/)
  $(".product-image-container").zoom({
    url: $("#mainProductImage").attr("src"), // Use the product image URL for zooming
    magnify: 1.5,
  });

  $(".quantity-increment").click(function () {
    var input = $(this).siblings(".quantity-value");
    var val = parseInt(input.val());
    var max = parseInt(input.attr("max"));
    if (val < max) {
      input.val(val + 1);
    }
  });

  $(".quantity-decrement").click(function () {
    var input = $(this).siblings(".quantity-value");
    var val = parseInt(input.val());
    if (val > 1) {
      input.val(val - 1);
    }
  });
  // Gắn sự kiện input cho ô nhập số lượng
  $(".quantity-value").on("input", function () {
    var inputElement = $(this);
    var stock = parseInt(inputElement.attr("max")); // Lấy số lượng kho từ thuộc tính max
    var currentValue = parseInt(inputElement.val()); // Lấy giá trị hiện tại trong input

    // Kiểm tra nếu giá trị nhập lớn hơn stock
    if (currentValue > stock) {
      // Nếu lớn hơn stock, đặt lại giá trị của input thành stock
      inputElement.val(stock);
    }
  });
});
