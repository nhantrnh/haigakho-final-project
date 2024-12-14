$(document).ready(function () {
  try {
    let searchTimeout;

    let urlParams = new URLSearchParams();

    $("#searchInput").on("input", function () {
      clearTimeout(searchTimeout);

      // Sửa keyword trong urlParams
      urlParams.set("keyword", $(this).val().trim());
      if (urlParams.get("keyword").length === 0) {
        urlParams.delete("keyword");
      }

      searchTimeout = setTimeout(function () {
        $.ajax({
          url: "/shop",
          type: "GET",
          data: urlParams.toString(),
          success: function (response) {
            if (response.success) {
              // Cập nhật danh sách sản phẩm
              $("#product-list").html(response.productListHTML);
              $("#filter-tag-container").html($(response.filterTagHTML));
              // Cập nhật phân trang
              $(".pagination").html(response.paginationHTML);

              // Cập nhật URL (nếu cần)
              history.pushState(null, "", `/shop?${urlParams.toString()}`);
            }
          },
          error: function (error) {
            console.error("Lỗi tìm kiếm:", error);
          },
        });
      }, 500);
    });

    // Filter Modal Form Submission
    $("#filterForm").on("submit", function (event) {
      event.preventDefault(); // Ngăn chặn submit form thông thường
      const formData = new FormData(this);
      const keyword = $("#searchInput").val().trim();
      if (keyword.length > 0) {
        formData.set("keyword", keyword); // Đảm bảo keyword cũng được gửi đi
      }
      urlParams = new URLSearchParams(formData);

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

      $.ajax({
        url: "/shop",
        type: "GET",
        data: urlParams.toString(),
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
        success: function (response) {
          $("#product-list").html($(response.productListHTML));
          $("#filter-tag-container").html($(response.filterTagHTML));
          console.log(response);
          $(".pagination").html($(response.paginationHTML));
          history.pushState(null, "", `/shop?${urlParams.toString()}`);
        },
        error: function (error) {
          console.error("Lỗi khi lọc sản phẩm:", error);
        },
      });
    });

    // Pagination Links
    $(document).on("click", ".pagination .page-link", function (event) {
      event.preventDefault();

      const $link = $(this);
      if ($link.parent().hasClass("disabled")) return;

      const href = $link.attr("href");
      if (!href) return;

      const params = href;

      $.ajax({
        url: href,
        type: "GET",
        success: function (response) {
          if (response.success) {
            // Cập nhật danh sách sản phẩm
            $("#product-list").html(response.productListHTML);

            // Cập nhật phân trang
            $(".pagination").html(response.paginationHTML);

            // Cập nhật URL (nếu cần)
            history.pushState(null, "", `/shop${params.toString()}`);
          }
        },
        error: function (error) {
          console.error("Lỗi chuyển trang:", error);
        },
      });
    });

    // Filter Tags Links
    $(document).on("click", ".remove-filter", function (event) {
      event.preventDefault();

      const $link = $(this);
      if ($link.parent().hasClass("disabled")) return;

      const href = $link.attr("href");
      if (!href) return;

      const key = $link.data("key"); // e.g., "category", "material"
      const value = $link.data("value"); // e.g., "Table", "Fabric"

      removeValueFromURLParams(urlParams, key, value);

      $.ajax({
        url: "/shop",
        type: "GET",
        data: urlParams.toString(),
        success: function (response) {
          if (response.success) {
            // Cập nhật danh sách sản phẩm
            $("#product-list").html(response.productListHTML);
            $("#filter-tag-container").html($(response.filterTagHTML));
            // Cập nhật phân trang
            $(".pagination").html(response.paginationHTML);

            // Cập nhật URL (nếu cần)
            history.pushState(null, "", `/shop?${urlParams.toString()}`);
          }
        },
        error: function (error) {
          console.error("Lỗi xóa filter tag:", error);
        },
      });
    });

    // Filter Tags Remove all
    $(document).on("click", ".remove-all-filter", function (event) {
      event.preventDefault();

      urlParams = new URLSearchParams();
      if ($("#searchInput").val().trim().length > 0) {
        urlParams.append("keyword", $("#searchInput").val().trim());
      }

      // Reset form
      $("#filterForm")[0].reset();

      $.ajax({
        url: "/shop",
        type: "GET",
        data: urlParams.toString(),
        success: function (response) {
          if (response.success) {
            // Cập nhật danh sách sản phẩm
            $("#product-list").html(response.productListHTML);
            $("#filter-tag-container").html($(response.filterTagHTML));
            // Cập nhật phân trang
            $(".pagination").html(response.paginationHTML);
            // Cập nhật URL (nếu cần)
            history.pushState(null, "", `/shop?${urlParams.toString()}`);
          }
        },
        error: function (error) {
          console.error("Lỗi xóa filter tag:", error);
        },
      });
    });
  } catch (error) {
    console.error("Error in shop.js:", error);
  }
});

// Hàm xóa giá trị từ URLSearchParams

function removeValueFromURLParams(urlParams, key, value) {
  if (urlParams.has(key)) {
    // Lấy giá trị hiện tại của key (e.g., "Table,Sofa")

    let values = urlParams.get(key);

    let updatedValues = [];
    if (values.indexOf(",") > -1) {
      // Nếu có nhiều giá trị, tách thành mảng
      values = values.split(",");
      // Lọc bỏ giá trị cần xóa
      updatedValues = values.filter((v) => v !== value);
    }

    // Cập nhật lại `urlParams`
    urlParams.delete(key); // Xóa toàn bộ key cũ
    if (updatedValues.length > 0) {
      urlParams.set(key, updatedValues.join(",")); // Gán lại giá trị đã lọc
    }

    uncheckFilterForm(key, value);
  }
}

// Hàm xóa tích trong form theo key, value
function uncheckFilterForm(key, value) {
  const $checkbox = $(`#filterForm input[name="${key}"][value="${value}"]`);
  $checkbox.prop("checked", false);
}
