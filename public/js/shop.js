document
  .querySelector("#filterForm")
  .addEventListener("submit", function (event) {
    const form = event.target;
    const urlParams = new URLSearchParams(new FormData(form));

    // Chuyển đổi các tham số có giá trị nhiều thành dấu phẩy
    const filterFields = ["category", "material", "brand", "priceRange"];
    
    filterFields.forEach(field => {
      const values = urlParams.getAll(field);
      if (values.length > 0) {
        urlParams.delete(field); // Xóa các tham số cũ
        urlParams.append(field, values.join(",")); // Thêm dạng dấu phẩy
      }
    });

    // Ngăn form gửi dữ liệu theo cách mặc định
    event.preventDefault();

    // Cập nhật URL với query string
    window.location.href = `/shop?${urlParams.toString()}`;
  });

// Hàm AJAX để áp dụng bộ lọc
function applyFilter(filters) {
  $.ajax({
    type: 'POST',
    url: '/filter',
    data: JSON.stringify(filters),
    contentType: 'application/json',
    success: function(response) {
      console.log('Filtered data:', response);
      // Cập nhật giao diện với dữ liệu đã lọc
      renderProducts(response.products);
    },
    error: function(error) {
      console.error('Error:', error);
    }
  });
}

// Hàm render sản phẩm
function renderProducts(products) {
  const productContainer = document.getElementById('productContainer');
  productContainer.innerHTML = ''; // Xóa các sản phẩm cũ

  products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    productElement.innerHTML = `
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <span>${product.price}</span>
    `;
    productContainer.appendChild(productElement);
  });
}

// Hàm AJAX để phân trang sản phẩm
function getProductsPage(page, filter) {
  $.ajax({
    type: 'POST',
    url: '/paging',
    data: JSON.stringify({ page, filter }),
    contentType: 'application/json',
    success: function(response) {
      console.log('Paged data:', response);
      // Cập nhật giao diện với dữ liệu đã phân trang
      renderProducts(response.products);
      updatePagination(response.pagination);
    },
    error: function(error) {
      console.error('Error:', error);
    }
  });
}

// Hàm cập nhật phân trang
function updatePagination(pagination) {
  const paginationContainer = document.getElementById('paginationContainer');
  paginationContainer.innerHTML = ''; // Xóa phân trang cũ

  // Render các nút phân trang (Next/Prev)
  if (pagination.hasPrevPage) {
    paginationContainer.innerHTML += `<button onclick="getProductsPage(${pagination.prevPage}, filters)">Previous</button>`;
  }
  if (pagination.hasNextPage) {
    paginationContainer.innerHTML += `<button onclick="getProductsPage(${pagination.nextPage}, filters)">Next</button>`;
  }
}

// Hàm AJAX để sắp xếp sản phẩm
function sortProducts(sortBy, sortOrder) {
  $.ajax({
    type: 'POST',
    url: '/sort',
    data: JSON.stringify({ sortBy, sortOrder }),
    contentType: 'application/json',
    success: function(response) {
      console.log('Sorted data:', response);
      // Cập nhật giao diện với dữ liệu đã sắp xếp
      renderProducts(response.products);
    },
    error: function(error) {
      console.error('Error:', error);
    }
  });
}

// Xử lý khi người dùng thay đổi bộ lọc
document.querySelector("#filterForm").addEventListener("submit", function(event) {
  const filters = {
    category: document.querySelector("#categoryInput").value,
    material: document.querySelector("#materialInput").value,
    brand: document.querySelector("#brandInput").value,
    priceRange: document.querySelector("#priceRangeInput").value,
  };

  applyFilter(filters);
});

// Xử lý khi người dùng thay đổi trang phân trang
document.querySelector("#paginationNext").addEventListener("click", function() {
  const page = currentPage + 1;
  getProductsPage(page, filters);
});

// Xử lý khi người dùng thay đổi sắp xếp
document.querySelector("#sortOptions").addEventListener("change", function(event) {
  const sortBy = event.target.value;
  const sortOrder = "asc"; // Hoặc "desc" tùy vào UI
  sortProducts(sortBy, sortOrder);
});
