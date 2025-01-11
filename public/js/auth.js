$(document).ready(function () {
  // Signup Form Handler
  $("#registrationForm").on("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = {
      username: $("#username").val(),
      email: $("#email").val(),
      password: $("#password").val(),
    };

    // Disable submit button and show loading
    const $submitBtn = $(this).find('button[type="submit"]');
    $submitBtn
      .prop("disabled", true)
      .html(
        '<span class="spinner-border spinner-border-sm me-2"></span>Loading...'
      );

    $.ajax({
      url: "/signup",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(formData),
      success: function (response) {
        // Show success message
        showAlert("success", "Registration successful! Redirecting...");

        // Redirect to login page after delay
        setTimeout(() => {
          window.location.href = "/signin";
        }, 1500);
      },
      error: function (xhr) {
        // Show error message
        const message = xhr.responseJSON?.message || "Registration failed";
        showAlert("danger", message);
      },
      complete: function () {
        // Re-enable submit button
        $submitBtn.prop("disabled", false).html("Register");
      },
    });
  });

  // Login Form Handler
  $("#loginForm").on("submit", function (e) {
    e.preventDefault();

    const formData = {
      username: $("#username").val(),
      password: $("#password").val(),
    };

    const $submitBtn = $(this).find('button[type="submit"]');
    $submitBtn
      .prop("disabled", true)
      .html(
        '<span class="spinner-border spinner-border-sm me-2"></span>Loading...'
      );

    $.ajax({
      url: "/signin",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(formData),
      success: function (response) {
        showAlert("success", "Login successful! Redirecting...");
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      },
      error: function (xhr) {
        const message = xhr.responseJSON?.message || "Login failed";
        showAlert("danger", message);
      },
      complete: function () {
        $submitBtn.prop("disabled", false).html("Login");
      },
    });
  });

  // Helper function to show alerts
  function showAlert(type, message) {
    const alertHtml = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
          ${message}
          <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
      `;
    $(".alert").remove(); // Remove existing alerts
    $(".card-body > h3").after(alertHtml);
  }
});
