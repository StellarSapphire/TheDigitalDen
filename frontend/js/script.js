/*  Author: Olivia Haag
 *  Date: 2/27/26
 *  Assignment: Final Project - The Athlete's Den
 *  Purpose: Creating a JS for the various pages of the website
 */

//waiting for the document object model (DOM) to load before running the script
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("reservationForm");
  const emailInput = document.getElementById("email");

  //function for handling form submission
  function handleFormSubmit(event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = emailInput.value.trim();
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

    // AI was used to assist in the development of the following code for sending form data to the backend server
    fetch("http://localhost:5000/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, phone, sportSkill })
    })
    .then(res => res.json())
    .then(data => {
      alert(data.message); // Show success message from backend
      form.reset(); // Clear the form
    })
    .catch(err => {
      console.error(err);
      alert("Error submitting reservation.");
    });
  }

  //function for giving real-time feedback on email input
  function validateEmailOnInput() {
    const emailValue = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //if-statement to change border color based on validity
    if (emailValue && !emailPattern.test(emailValue)) {
      emailInput.style.borderColor = "red";
    } else {
      emailInput.style.borderColor = ""; //reset border style
    }
  }

  //event listeners
  form.addEventListener("submit", handleFormSubmit);
  emailInput.addEventListener("input", validateEmailOnInput);
});

// Script for signup and profile pages; I utilized AI to assist in the development of this code
document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      const role = document.getElementById('role').value;

      if (!name || !email || !password || !role) {
        alert('Please fill out all fields.');
        return;
      }

      // Send user data to backend
      fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role })
      })
      .then(res => res.json())
      .then(data => {
        alert(data.message);

        if (data.message === "Account created successfully!") {
          // Optionally store minimal info locally for profile page
          localStorage.setItem("currentUser", JSON.stringify({ name, email, role }));
          window.location.href = "profile.html"; // redirect after signup
        }
      })
      .catch(err => {
        console.error(err);
        alert("Error creating account. Try again.");
      });
    });
  }
});

// On profile page load, display user information
if (document.getElementById('profileName')) {
  const userData = JSON.parse(localStorage.getItem('currentUser'));

  if (userData) {
    document.getElementById('profileName').textContent = userData.name;
    document.getElementById('profileEmail').textContent = userData.email;
    document.getElementById('profileRole').textContent = userData.role;
  } else {
    // Redirect to signup/login if no user found
    window.location.href = 'login.html';
  }
}
