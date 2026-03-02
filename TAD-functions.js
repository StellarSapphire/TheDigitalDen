// TAD-functions.js
function validateReservation({ firstName, lastName, email, phone, sportSkill }) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^\d{3}-?\d{3}-?\d{4}$/;
  let errorMessage = "";

  if (!firstName.trim()) errorMessage += "First name is required.\n";
  if (!lastName.trim()) errorMessage += "Last name is required.\n";
  if (!emailPattern.test(email.trim())) errorMessage += "Enter a valid email address.\n";
  if (!sportSkill.trim()) errorMessage += "Describe the sport and skill level.\n";
  if (phone && !phonePattern.test(phone.trim())) errorMessage += "Phone number must be 10 digits.\n";

  return errorMessage;
}

function validateSignup({ name, email, password, role }) {
  let errorMessage = "";
  if (!name) errorMessage += "Name is required.\n";
  if (!email) errorMessage += "Email is required.\n";
  if (!password) errorMessage += "Password is required.\n";
  if (!role) errorMessage += "Role is required.\n";
  return errorMessage;
}

function createUser({ name, email, role }) {
  return { name, email, role };
}

module.exports = { validateReservation, validateSignup, createUser };