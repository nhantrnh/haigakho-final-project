// Dùng JavaScript để gán width
document.addEventListener("DOMContentLoaded", () => {
  const progressBars = document.querySelectorAll(".review-progress-bar");
  progressBars.forEach((bar) => {
    const percentage = bar.getAttribute("data-percentage");
    console.log(percentage);
    bar.style.width = `${percentage}%`;
  });
});
