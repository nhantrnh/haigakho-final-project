$(document).ready(async function () {
  loadOrderSummary();
  // Update form submission
  $("#checkoutForm").on("submit", async function (e) {
    e.preventDefault();
    console.log("Form submitted");

    const form = $(this);
    const submitBtn = form.find('button[type="submit"]');

    const formData = {
      firstName: form.find("#firstName").val(),
      lastName: form.find("#lastName").val(),
      email: form.find("#email").val(),
      phone: form.find("#phone").val(),
      address: form.find("#address").val(),
      city: form.find("#city").val(),
      country: form.find("#country").val(),
      paymentMethod: form.find('input[name="paymentMethod"]:checked').val(),
    };

    try {
      submitBtn
        .prop("disabled", true)
        .html('<i class="fas fa-spinner fa-spin me-2"></i>Processing...');

      const response = await fetch("/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        //window.location.href = `/orders/confirmation/${data.order}`;
        showToast("success", "Order placed successfully");
        // Show success dialog
        showOrderDialog(data.order);
        form[0].reset();
      } else {
        showToast("error", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      showToast("error", "Failed to create order");
    } finally {
      submitBtn.prop("disabled", false).text("Place Order");
    }
  });
});

async function loadOrderSummary() {
  try {
    const response = await fetch("/cart/get-cart");
    const data = await response.json();

    if (data.success) {
      const items = data.cart;
      const total = data.total;

      let html = "";
      items.forEach((item) => {
        html += `
            <tr>
              <td>
                <div class="d-flex align-items-center">
                  <img src="${
                    item.imageUrl
                  }" class="me-3" style="width: 50px; height: 50px; object-fit: cover;">
                  <div>
                    <h6 class="mb-0">${item.name}</h6>
                    <small class="text-muted">Quantity: ${item.quantity}</small>
                  </div>
                </div>
              </td>
              <td class="text-end">$${(item.price * item.quantity).toFixed(
                2
              )}</td>
            </tr>
          `;
      });

      $("#orderItems").html(html);
      $("#subtotal").text(`$${total.toFixed(2)}`);
      $("#total").text(`$${total.toFixed(2)}`);
    }
  } catch (error) {
    console.error("Failed to load cart:", error);
  }
}

function showOrderDialog(order) {
  const dialog = $("#orderDialog");
  const backdrop = $("#dialogBackdrop");

  dialog.html(`
      <div class="p-5 text-center">
        <div class="mb-4">
          <i class="fas fa-check-circle text-success" style="font-size: 4rem;"></i>
        </div>
        <h3 class="mb-3">Order Placed Successfully!</h3>
        <p class="text-muted mb-4">Order #${order.orderNumber}</p>
        
        <!-- Order Details -->
        <div class="text-start mb-4">
          <div class="row mb-3">
            <div class="col-6">
              <strong>Order Date:</strong><br>
              ${new Date(order.createdAt).toLocaleDateString()}
            </div>
            <div class="col-6 text-end">
              <strong>Total Amount:</strong><br>
              $${order.total.toFixed(2)}
            </div>
          </div>
  
          <!-- Shipping Details -->
          <div class="border rounded p-3 mb-3">
            <h6 class="mb-2">Shipping Details</h6>
            <p class="mb-1 small">${order.shipping.firstName} ${
    order.shipping.lastName
  }</p>
            <p class="mb-1 small">${order.shipping.address}</p>
            <p class="mb-1 small">${order.shipping.city}, ${
    order.shipping.country
  }</p>
            <p class="mb-0 small">${order.shipping.phone}</p>
          </div>
  
          <!-- Order Items -->
          <div class="border rounded p-3">
            <h6 class="mb-2">Order Items</h6>
            ${order.items
              .map(
                (item) => `
              <div class="d-flex align-items-center mb-2">
                <img src="${
                  item.imageUrl
                }" class="rounded" width="40" height="40" style="object-fit: cover;">
                <div class="ms-3 flex-grow-1">
                  <p class="mb-0 small">${item.name}</p>
                  <p class="mb-0 small text-muted">Qty: ${item.quantity}</p>
                </div>
                <div class="text-end">
                  <p class="mb-0 small">$${(item.price * item.quantity).toFixed(
                    2
                  )}</p>
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
  
        <!-- Actions -->
        <div class="d-flex gap-2 justify-content-center">
          <button onclick="window.location.href='/my-orders'" class="btn btn-success px-4">
            View My Orders
          </button>
          <button onclick="window.location.href='/shop'" class="btn btn-outline-secondary px-4">
            Continue Shopping
          </button>
        </div>
      </div>
    `);

  dialog.fadeIn();
  backdrop.fadeIn();

  backdrop.click(function () {
    dialog.fadeOut();
    backdrop.fadeOut();
  });
}

function showToast(type, message) {
  // Remove existing toast
  $(".toast-container").remove();

  // Create toast container
  const container = $("<div>").addClass("toast-container");

  // Create toast element
  const toast = $("<div>").addClass("toast");

  // Set style based on type
  let icon, bgColor;
  switch (type) {
    case "success":
      icon = "fa-check-circle";
      bgColor = "#3b5d50";
      break;
    case "error":
      icon = "fa-exclamation-circle";
      bgColor = "#dc3545";
      break;
    default:
      icon = "fa-info-circle";
      bgColor = "#0d6efd";
  }

  // Add content
  toast.html(`
      <i class="fas ${icon} me-2"></i>
      <span>${message}</span>
    `);

  // Add styles
  const styles = `
      <style>
        .toast-container {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 9999;
        }
        .toast {
          background: ${bgColor};
          color: white;
          padding: 12px 24px;
          border-radius: 4px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          display: flex;
          align-items: center;
          font-size: 14px;
          opacity: 0;
          transform: translateY(-20px);
          transition: all 0.3s ease;
        }
        .toast.show {
          opacity: 1;
          transform: translateY(0);
        }
      </style>
    `;

  // Add to DOM
  $("head").append(styles);
  container.append(toast);
  $("body").append(container);

  // Show with animation
  setTimeout(() => toast.addClass("show"), 100);

  // Auto hide after 3s
  setTimeout(() => {
    toast.removeClass("show");
    setTimeout(() => container.remove(), 300);
  }, 3000);
}
