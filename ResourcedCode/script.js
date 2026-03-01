document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("reservationForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // ALWAYS stop redirect

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const sportSkill = document.querySelector("textarea[name='sportskill']").value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{3}-?\d{3}-?\d{4}$/;

    let errorMessage = "";

    if (firstName === "") errorMessage += "First name is required.\n";
    if (lastName === "") errorMessage += "Last name is required.\n";
    if (!emailPattern.test(email)) errorMessage += "Enter a valid email address.\n";
    if (sportSkill === "") errorMessage += "Describe the sport and skill level.\n";

    if (phone !== "" && !phonePattern.test(phone)) {
      errorMessage += "Phone number must be 10 digits.\n";
    }

    if (errorMessage !== "") {
      alert(errorMessage);
      return;
    }

    // Success
    alert("Thank you! Your reservation request has been submitted.");
    form.reset(); // clears the form
  });
});
