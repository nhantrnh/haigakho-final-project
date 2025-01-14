async function viewOrderDetails(orderId) {
  try {
    const response = await fetch(`/orders/details/${orderId}`);
    const data = await response.json();

    if (data.success) {
      showOrderDetailsModal(data.order);
    }
  } catch (error) {
    console.error("Error fetching order details:", error);
  }
}

function showOrderDetailsModal(order) {
  // Remove existing modal if any
  $("#orderDetailsModal").remove();

  const modal = $(`
      <div class="modal fade" id="orderDetailsModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-body p-0">
              <!-- Order Status Banner -->
              <div class="p-4 ${order.status.toLowerCase()}-banner text-white" style="background: #3b5d50;">
                <h5 class="modal-title">
                  Order #${order.orderNumber}
                  <span class="badge ${getStatusBadgeClass(
                    order.status
                  )} ms-2">${order.status}</span>
                </h5>
                <p class="mb-0">
                  <i class="far fa-calendar-alt me-2"></i>
                  Placed on ${new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
  
              <div class="p-4">
                <!-- Shipping & Payment Info -->
                <div class="row mb-4">
                  <div class="col-md-6 mb-3 mb-md-0">
                    <h6 class="fw-bold mb-3">Shipping Details</h6>
                    <p class="mb-1">${order.shipping.firstName} ${
    order.shipping.lastName
  }</p>
                    <p class="mb-1">${order.shipping.email}</p>
                    <p class="mb-1">${order.shipping.phone}</p>
                    <p class="mb-1">${order.shipping.address}</p>
                    <p class="mb-0">${order.shipping.city}, ${
    order.shipping.country
  }</p>
                  </div>
                  <div class="col-md-6">
                    <h6 class="fw-bold mb-3">Status Information</h6>
                    <p class="mb-0">Status: ${order.status}</p>
                  </div>
                </div>
  
                <!-- Order Items -->
                <h6 class="fw-bold mb-3">Order Items</h6>
                <div class="table-responsive">
                  <table class="table align-middle">
                    <tbody>
                      ${order.items
                        .map(
                          (item) => `
                        <tr>
                          <td style="width: 80px;">
                            <img src="${
                              item.imageUrl
                            }" class="rounded" width="60" height="60" style="object-fit: cover;">
                          </td>
                          <td>
                            <h6 class="mb-0">${item.name}</h6>
                            <small class="text-muted">Quantity: ${
                              item.quantity
                            }</small>
                          </td>
                          <td class="text-end">$${(
                            item.price * item.quantity
                          ).toFixed(2)}</td>
                        </tr>
                      `
                        )
                        .join("")}
                    </tbody>
                    <tfoot class="border-top">
                      <tr>
                        <td colspan="2" class="fw-bold">Total</td>
                        <td class="text-end fw-bold">$${order.total.toFixed(
                          2
                        )}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
  
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    `);

  $("body").append(modal);
  const modalInstance = new bootstrap.Modal(modal);
  modalInstance.show();
}

function getStatusBadgeClass(status) {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-warning";
    case "confirmed":
      return "bg-info";
    case "shipping":
      return "bg-primary";
    case "delivered":
      return "bg-success";
    default:
      return "bg-secondary";
  }
}
