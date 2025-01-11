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
