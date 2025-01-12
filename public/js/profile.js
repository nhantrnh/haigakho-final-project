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
