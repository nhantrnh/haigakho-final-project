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
  // if (!confirm("Are you sure you want to sign out?")) {
  //   return;
  // }
  const btn = e.target;
  console.log(btn);

  btn.innerHTML =
    '<span class="spinner-border spinner-border-sm"></span> Signing out...';
  btn.disabled = true;
  try {
    const response = await fetch("/signout", {
      method: "GET",
    });
    if (response.ok) {
      // Show success message
      alert("Logged out successfully!");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }
  } catch (error) {
    console.error("Signout error:", error);
    btn.innerHTML = "Sign out";
    btn.disabled = false;
    alert("Error logging out");
  }
});

function toggleCartSidebar() {
  const cartSidebar = document.getElementById("cartSidebar");
  cartSidebar.classList.toggle("open");
}

// click add to cart
$(".add-to-cart").click(function () {
  console.log("click add to cart");
  var productCart = $(this).closest(".product-info"); // Lấy container sản phẩm
  var productId = productCart.data("product-id"); // Lấy ID của sản phẩm
  var quantity = parseInt(productCart.find(".quantity-value").val()) || 0; // Lấy số lượng người dùng muốn thêm
  console.log(productId, quantity);
  addToCart(productId, quantity);
});

// Update cart functions
function updateCartSidebar(cart, total) {
  const cartItems = $("#cart-items");
  cartItems.empty();

  cart.forEach((item) => {
    const itemHtml = `
        <li class="cart-item" data-product-id="${item.productId}">
          <img src="${item.imageUrl}" class="cart-item-image" alt="${
      item.name
    }" />
          <div class="cart-item-details">
            <h5 class="cart-item-name">${item.name}</h5>
            <p class="cart-item-price"> 
              <span>$${item.price}</span>
              <del>$${item.price * 2}</del>
            </p>
            <div class = "quantity-controls">
              <button class="decrease-qty quantity-btn">
                <i class="fa-solid fa-minus"></i>
              </button>

              <span class="cart-item-quantity cart-quantity-value">${
                item.quantity
              }</span>
              
              <button class="increase-qty quantity-btn">
                <i class="fa-solid fa-plus"></i>
              </button>
            </div> 
          </div>
          <button class="remove-item" aria-label="Remove item">
            <i class="fa-regular fa-trash-can fa-lg"></i>
          </button>
        </li>
      `;
    cartItems.append(itemHtml);
  });

  $("#cart-count, #cart-countt").text(
    cart.reduce((sum, item) => sum + item.quantity, 0)
  );
  $("#cart-total").text(total.toFixed(2));
}

async function addToCart(productId, quantity) {
  try {
    const response = await fetch("/cart/add-to-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, quantity }),
    });

    const data = await response.json();
    if (data.success) {
      updateCartSidebar(data.cart, data.total);
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
        x: $(".cart-icon-container").offset().left - productImage.offset().left,
        y: $(".cart-icon-container").offset().top - productImage.offset().top,
        width: 50,
        height: 50,
        opacity: 0.5,
        onComplete: function () {
          // Xóa bản sao sau khi animation kết thúc
          productImage.remove();
        },
      });
      //showToast("success", data.message);
    } else {
      //showToast("error", data.message);
    }
  } catch (error) {
    //showToast("error", "Failed to add product");
  }
}

// Add remove from cart handler
$(document).on("click", ".remove-item", async function () {
  const cartItem = $(this).closest(".cart-item");
  const productId = cartItem.data("product-id");

  try {
    const response = await fetch("/cart/remove-from-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });

    const data = await response.json();
    if (data.success) {
      updateCartSidebar(data.cart, data.total);
    } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error("Failed to remove item:", error);
  }
});

// Update quantity buttons event handlers
$(document).on("click", ".decrease-qty, .increase-qty", async function () {
  const cartItem = $(this).closest(".cart-item");
  const productId = cartItem.data("product-id");
  const currentQty = parseInt(cartItem.find(".cart-item-quantity").text());
  const newQty = $(this).hasClass("decrease-qty")
    ? currentQty - 1
    : currentQty + 1;

  if (newQty < 1) return;

  try {
    const response = await fetch("/cart/update-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        quantity: newQty,
      }),
    });

    const data = await response.json();
    if (data.success) {
      updateCartSidebar(data.cart, data.total);
    } else {
      //showToast("error", data.message);
    }
  } catch (error) {
    //showToast("error", "Failed to update quantity");
  }
});

// Load cart on page load
async function loadCart() {
  console.log("load cart");
  try {
    const response = await fetch("/cart/get-cart");
    const data = await response.json();
    if (data.success) {
      updateCartSidebar(data.cart, data.total);
    }
  } catch (error) {
    console.error("Failed to load cart:", error);
  }
}

$(document).ready(function () {
  loadCart();

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
