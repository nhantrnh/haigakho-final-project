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

document.querySelector("form").addEventListener("submit", function (event) {
  const form = event.target;
  const urlParams = new URLSearchParams(new FormData(form));

  // Chuyển đổi các tham số có giá trị nhiều thành dấu phẩy
  const categoryValues = urlParams.getAll("category");
  if (categoryValues.length > 0) {
    urlParams.delete("category"); // Xóa các tham số category cũ
    urlParams.append("category", categoryValues.join(",")); // Thêm dạng dấu phẩy
  }

  // Tương tự xử lý cho các filter khác như "material", "brand", etc.
  const materialValues = urlParams.getAll("material");
  if (materialValues.length > 0) {
    urlParams.delete("material"); // Xóa các tham số material cũ
    urlParams.append("material", materialValues.join(",")); // Thêm dạng dấu phẩy
  }

  const brandValues = urlParams.getAll("brand");
  if (brandValues.length > 0) {
    urlParams.delete("brand"); // Xóa các tham số brand cũ
    urlParams.append("brand", brandValues.join(",")); // Thêm dạng dấu phẩy
  }

  const priceRangeValues = urlParams.getAll("priceRange");
  if (priceRangeValues.length > 0) {
    urlParams.delete("priceRange"); // Xóa các tham số priceRange cũ
    urlParams.append("priceRange", priceRangeValues.join(",")); // Thêm dạng dấu phẩy
  }

  // Ngăn form gửi dữ liệu theo cách mặc định
  event.preventDefault();

  // Gửi lại URL với query string đã chỉnh sửa
  window.location.href = `/shop?${urlParams.toString()}`;
});

function toggleCartSidebar() {
  const cartSidebar = document.getElementById('cartSidebar');
  cartSidebar.classList.toggle('open');
}
$(document).ready(function() {
  // Khi bấm vào nút "ADD TO CART"
  $('.add-to-cart').on('click', function() {
    var productCart = $(this).closest('.productCart'); // Lấy container sản phẩm
    var productId = productCart.attr('id'); // Lấy ID của sản phẩm
    var quantity = parseInt(productCart.find('.product-count').val()) || 0; // Lấy số lượng người dùng muốn thêm
    var stock = parseInt(productCart.find('.product-amount').text()) || 0; // Lấy số lượng tồn kho
    var cartItem = $(`.cart-item[data-product-id="${productId}"]`); // Sử dụng `data-product-id` để xác định sản phẩm
    var currentQuantity = 0;

    if (cartItem.length > 0) {
        // Nếu sản phẩm đã có trong giỏ hàng, lấy giá trị `currentQuantity`
        var quantityElement = cartItem.find('.cart-item-quantity');
        currentQuantity = parseInt(quantityElement.text()) || 0; // Mặc định là 0 nếu không tìm thấy
    }

    // Kiểm tra số lượng hợp lệ
    if (quantity <= 0) {
      alert('Please select a valid quantity');
      return;
    }
  
    // Kiểm tra nếu tổng số lượng vượt quá số lượng trong kho
    if (currentQuantity + quantity > stock) {
      quantity = stock - currentQuantity;
    }
  
    // Gửi yêu cầu AJAX để thêm sản phẩm vào giỏ hàng
    $.ajax({
      url: '/add-to-cart', // Địa chỉ API hoặc route thêm sản phẩm vào giỏ hàng
      type: 'POST',
      data: {
        productId: productId,
        quantity: quantity
      },
      success: function(response) {
        if (response.success) {
          // Cập nhật giỏ hàng trong sidebar
          updateCartSidebar(response.cart);
          saveCartToLocalStorage(response.cart); // Lưu giỏ hàng vào localStorage
        } else {
          alert(response.message || 'Failed to add product to cart');
        }
      },
      error: function(xhr, status, error) {
        alert('An error occurred: ' + error);
      }
    });
  });
  

  // Cập nhật sidebar giỏ hàng
  function updateCartSidebar(cart) {
    var cartItems = $('#cart-items');
    cartItems.empty(); // Xóa các sản phẩm cũ
    
    var totalPrice = 0;
    var totalItems = 0;

    cart.forEach(function(item) {
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
    $('#cart-count').text(totalItems);
    $('#cart-countt').text(totalItems);
    $('#cart-total').text(totalPrice.toFixed(2));

    // Thêm sự kiện cho các nút tăng giảm và xoá
    $('.decrease-qty').on('click', decreaseQuantity);
    $('.increase-qty').on('click', increaseQuantity);
    $('.remove-item').on('click', removeItem);
  }

  // Lưu giỏ hàng vào localStorage
  function saveCartToLocalStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Giảm số lượng
  function decreaseQuantity() {
    var cartItem = $(this).closest('.cart-item');
    var productId = cartItem.data('product-id');
    var quantityElement = cartItem.find('.cart-item-quantity');
    var currentQuantity = parseInt(quantityElement.text());

    if (currentQuantity > 1) {
      // Gửi yêu cầu AJAX để giảm số lượng sản phẩm
      $.ajax({
        url: '/update-cart',
        type: 'POST',
        data: {
          productId: productId,
          quantity: currentQuantity - 1
        },
        success: function(response) {
          updateCartSidebar(response.cart);
          saveCartToLocalStorage(response.cart); // Lưu lại giỏ hàng
        },
        error: function(xhr, status, error) {
          alert('An error occurred: ' + error);
        }
      });

    }
    else {
      $.ajax({
        url: '/remove-from-cart',
        type: 'POST',
        data: { productId: productId },
        success: function(response) {
          updateCartSidebar(response.cart);
          saveCartToLocalStorage(response.cart); // Lưu lại giỏ hàng
        },
        error: function(xhr, status, error) {
          alert('An error occurred: ' + error);
        }
      });
    }
  }

  // Tăng số lượng
  function increaseQuantity() {
    var cartItem = $(this).closest('.cart-item');
    var productId = cartItem.data('product-id');
    var quantityElement = cartItem.find('.cart-item-quantity');
    var currentQuantity = parseInt(quantityElement.text());
    // Gửi yêu cầu AJAX để tăng số lượng sản phẩm
    $.ajax({
      url: '/update-cart',
      type: 'POST',
      data: {
        productId: productId,
        quantity: currentQuantity + 1
      },
      success: function(response) {
        updateCartSidebar(response.cart);
        saveCartToLocalStorage(response.cart); // Lưu lại giỏ hàng
      },
      error: function(xhr, status, error) {
        console('An error occurred: ' + error);
      }
    });
  }

  // Xoá sản phẩm khỏi giỏ hàng
  function removeItem() {
    var cartItem = $(this).closest('.cart-item');
    var productId = cartItem.data('product-id');

    // Gửi yêu cầu AJAX để xoá sản phẩm khỏi giỏ hàng
    $.ajax({
      url: '/remove-from-cart',
      type: 'POST',
      data: { productId: productId },
      success: function(response) {
        updateCartSidebar(response.cart);
        saveCartToLocalStorage(response.cart); // Lưu lại giỏ hàng
      },
      error: function(xhr, status, error) {
        alert('An error occurred: ' + error);
      }
    });
  }

  // Khi trang tải lại, kiểm tra giỏ hàng trong localStorage và hiển thị lại
  if (localStorage.getItem('cart')) {
    var savedCart = JSON.parse(localStorage.getItem('cart'));
    updateCartSidebar(savedCart);
  }
});
