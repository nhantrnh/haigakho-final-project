// Dùng JavaScript để gán width
document.addEventListener("DOMContentLoaded", () => {
  const progressBars = document.querySelectorAll(".review-progress-bar");
  progressBars.forEach((bar) => {
    const percentage = bar.getAttribute("data-percentage");
    bar.style.width = `${percentage}%`;
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
