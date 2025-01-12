// Dùng JavaScript để gán width
document.addEventListener("DOMContentLoaded", () => {
  const progressBars = document.querySelectorAll(".review-progress-bar");
  progressBars.forEach((bar) => {
    const percentage = bar.getAttribute("data-percentage");
    bar.style.width = `${percentage}%`;
  });

  const productId = document
    .getElementById("productDetailSection")
    .getAttribute("data-product-id");
  // Get Review Status

  const addReviewSection =
    document.getElementsByClassName("add-review-section");
  $.ajax({
    url: `/reviews/status/${productId}`,
    type: "GET",
    success: function (response) {
      if (response.reviewed) {
        $("#reviewForm").hide();
        addReviewSection[0].style.display = "none";
        $("#deleteReview").show();
      } else {
        $("#reviewForm").show();
        addReviewSection[0].style.display = "block";
        $("#deleteReview").hide();
      }
    },
    error: function (err) {
      console.error("Error checking review status:", err);
    },
  });
});

// public/js/detail.js
$(document).ready(function () {
  $("#reviewForm").on("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    $.ajax({
      url: "/reviews/add",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        if (response.success) {
          console.log("Review submitted successfully");
          // Reload page to show new review
          location.reload();
        }
      },
      error: function (err) {
        alert("Error submitting review");
        console.error(err);
      },
    });
  });
});

// public/js/detail.js
$(document).ready(function () {
  // Load reviews function
  function loadReviews(page = 1) {
    const productId = $("#productDetailSection").data("product-id");

    $.ajax({
      url: `/reviews/product/${productId}?page=${page}`,
      type: "GET",
      beforeSend: function () {
        $(".reviews-list").addClass("loading");
      },
      success: function (response) {
        if (response.success) {
          $(".reviews-list").html(response.reviewsHTML);
        }
      },
      error: function (err) {
        console.error("Error loading reviews:", err);
      },
      complete: function () {
        $(".reviews-list").removeClass("loading");
      },
    });
  }

  // Handle pagination clicks
  $(document).on(
    "click",
    ".reviews-pagination button:not(.disabled)",
    function () {
      const page = $(this).data("page");
      showLoading();
      loadReviews(page);

      // Scroll to reviews section
      $("html, body").animate(
        {
          scrollTop: $(".reviews-list").offset().top - 100,
        },
        500
      );
      hideLoading();
    }
  );

  loadReviews(1);
});

function showLoading() {
  $("#review-loading-overlay").fadeIn(200);
}

function hideLoading() {
  $("#review-loading-overlay").fadeOut(200);
}
