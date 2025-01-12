// public/js/profile.js
$(document).ready(function () {
  // Preview avatar before upload
  $('input[name="avatar"]').change(function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        $(".profile-avatar").attr("src", e.target.result);
      };
      reader.readAsDataURL(file);
    }
  });

  // Handle form submission
  $("#profileForm").submit(function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const $submitBtn = $(this).find('button[type="submit"]');

    $submitBtn
      .prop("disabled", true)
      .html(
        '<span class="spinner-border spinner-border-sm me-2"></span>Đang cập nhật...'
      );

    $.ajax({
      url: "/profile/update",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        if (response.success) {
          alert("Profile updated successfully");
          location.reload();
        }
      },
      error: function (err) {
        alert(err.responseJSON?.message || "Error updating profile");
      },
    });
  });
});

// Account settings form

$("#password-form").on("submit", async function (e) {
  e.preventDefault();

  const $submitBtn = $(this).find('button[type="submit"]');

  // Validate password match
  const newPassword = $("#newPassword").val();
  const confirmPassword = $("#confirmPassword").val();

  if (newPassword !== confirmPassword) {
    showMessage("error", "New password does not match", $(this));
    return;
  }

  try {
    $submitBtn
      .prop("disabled", true)
      .html(
        '<span class="spinner-border spinner-border-sm me-2"></span>Đang cập nhật...'
      );

    const response = await fetch("/settings/password/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentPassword: $("#currentPassword").val(),
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      }),
    });

    const data = await response.json();

    if (data.success) {
      showMessage("success", data.message, $(this));
      this.reset();
    } else {
      showMessage("error", data.message, $(this));
    }
  } catch (error) {
    //alert("Có lỗi xảy ra");
    showMessage("error", "An error occurred.", $(this));
  } finally {
    $submitBtn
      .prop("disabled", false)
      .html('<i class="fas fa-save me-2"></i>Cập nhật mật khẩu');
  }
});

function showMessage(type, text, form) {
  const message = $("<div>")
    .addClass(`settings-message ${type}`)
    .text(text)
    .prependTo(form);

  setTimeout(() => {
    message.addClass("show");
  }, 100);

  setTimeout(() => {
    message.removeClass("show");
    setTimeout(() => message.remove(), 300);
  }, 3000);
}
