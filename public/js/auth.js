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

$(document).ready(function () {
  // Add to $(document).ready()
  const debounce = (fn, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
  };

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  // Check username/email availability on input
  $("#username, #email").on(
    "input",
    debounce(function () {
      const field = $(this).attr("id");
      const value = $(this).val().trim();
      const feedback = $(this).siblings(".feedback");

      if (field === "email") {
        // Check email format first
        if (!emailRegex.test(value)) {
          feedback
            .removeClass("text-success")
            .addClass("text-danger")
            .html('<i class="fas fa-times"></i> Invalid email format');
          return;
        }
      }

      if (value.length < 3) return;

      // Show loading indicator
      $(this)
        .siblings(".feedback")
        .html(
          '<span class="spinner-border spinner-border-sm"></span> Checking...'
        );

      $.ajax({
        url: "/check-availability",
        method: "GET",
        data: { field, value },
        success: function (response) {
          if (response.available) {
            feedback
              .removeClass("text-danger")
              .addClass("text-success")
              .html('<i class="fas fa-check"></i> ' + response.message);
          } else {
            feedback
              .removeClass("text-success")
              .addClass("text-danger")
              .html('<i class="fas fa-times"></i> ' + response.message);
          }
        },
        error: function () {
          $(`#${field}`)
            .siblings(".feedback")
            .addClass("text-danger")
            .html("Error checking availability");
        },
      });
    }, 500)
  );
});
