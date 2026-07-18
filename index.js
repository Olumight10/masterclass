document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.6";
    submitBtn.textContent = "Submitting...";
    const formData = new FormData(form);
    const params = new URLSearchParams();
    for (const pair of formData.entries()) {
      params.append(pair[0], pair[1]);
    }

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbzcNUUhUxPDbs5S2WzMPWTbW4A8rG08gytUDBpFogsR0kl28yf_3zaYSbaxnkjeYoAg/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      const result = await response.text();

      if (result.toLowerCase().includes("success")) {
        Swal.fire({
          icon: "success",
          title: "Submission Successful",
          text: "Thank you for registering. Redirecting...",
          showConfirmButton: false,
          timer: 2200,
          timerProgressBar: true
        });
        setTimeout(() => {
          window.location.href = "more.html";
        }, 2200);
      } else {
        showError("Form submitted, but something went wrong: " + result);
      }
    } catch (error) {
      showError("Failed to submit form: " + error.message);
    }
  });

  function showError(message) {
    alert(message);
  }
});