document
  .querySelector("#filterForm")
  .addEventListener("submit", function (event) {
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
