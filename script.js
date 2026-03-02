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

    //message upon successful submission
    alert("Thank you! Your reservation request has been submitted.");
    form.reset(); //resets the form
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
