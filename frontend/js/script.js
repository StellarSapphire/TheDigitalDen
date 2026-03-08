/*  Author: Olivia Haag
 *  Date: 2/27/26
 *  Assignment: Final Project - The Athlete's Den
 *  Purpose: JS for reservation, signup, and profile pages with login protection
 */

document.addEventListener("DOMContentLoaded", function () {
  const BASE_URL = "https://thedigitalden.onrender.com";

  // ------------------------------
  // Site-wide login protection
  const currentPage = window.location.pathname.split("/").pop();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // Redirect to login if accessing protected page
  const protectedPages = ["profile.html", "reservations.html", "training.html", "mental.html", "nutrition.html"];
  if (protectedPages.includes(currentPage) && !currentUser) {
    window.location.href = "login.html";
    return; // stop execution
  }

  // Redirect away from login if already logged in
  if (currentPage === "login.html" && currentUser) {
    window.location.href = "profile.html";
    return;
  }

  // ------------------------------
  // Helper to get logged-in user
  function requireLogin() {
    const userData = JSON.parse(localStorage.getItem("currentUser"));
    if (!userData) {
      window.location.href = "login.html";
      return null;
    }
    return userData;
  }

  // ------------------------------
  // Reservation page logic
  const reservationForm = document.getElementById("reservationForm");
  const emailInput = document.getElementById("email");

  if (reservationForm) {
    const user = requireLogin();
    if (user && emailInput) emailInput.value = user.email;

    reservationForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const firstName = document.getElementById("firstName").value.trim();
      const lastName = document.getElementById("lastName").value.trim();
      const email = emailInput.value.trim();
      const phone = document.getElementById("phone").value.trim();
      const sportSkill = document.querySelector("textarea[name='sportskill']").value.trim();

      let errorMessage = "";
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phonePattern = /^\d{3}-?\d{3}-?\d{4}$/;

      if (!firstName) errorMessage += "First name is required.\n";
      if (!lastName) errorMessage += "Last name is required.\n";
      if (!emailPattern.test(email)) errorMessage += "Enter a valid email address.\n";
      if (!sportSkill) errorMessage += "Describe the sport and skill level.\n";
      if (phone && !phonePattern.test(phone)) errorMessage += "Phone number must be 10 digits.\n";

      if (errorMessage) {
        alert(errorMessage);
        return;
      }

      fetch(`${BASE_URL}/api/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, phone, sportSkill })
      })
        .then(res => res.json())
        .then(data => {
          alert(data.message);
          reservationForm.reset();
        })
        .catch(err => {
          console.error(err);
          alert("Error submitting reservation.");
        });
    });

    if (emailInput) {
      emailInput.addEventListener("input", function () {
        emailInput.style.borderColor = (emailInput.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) ? "red" : "";
      });
    }
  }

  // ------------------------------
  // Signup page logic
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const role = document.getElementById("role").value;

      if (!name || !email || !password || !role) {
        alert("Please fill out all fields.");
        return;
      }

      fetch(`${BASE_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role })
      })
        .then(res => res.json())
        .then(data => {
          alert(data.message);
          if (data.message === "Account created successfully!") {
            localStorage.setItem("currentUser", JSON.stringify({ name, email, role }));
            window.location.href = "profile.html";
          }
        })
        .catch(err => {
          console.error(err);
          alert("Error creating account. Try again.");
        });
    });
  }

  // ------------------------------
  // Profile page logic
  const profileName = document.getElementById("profileName");
  if (profileName) {
    const user = requireLogin();
    profileName.textContent = user.name;
    document.getElementById("profileEmail").textContent = user.email;
    document.getElementById("profileRole").textContent = user.role;
  }
});