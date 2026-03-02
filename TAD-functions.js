function validateForm({ firstName, lastName, email, phone, sportSkill }) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^\d{3}-?\d{3}-?\d{4}$/;

  let errorMessage = "";

  if (!firstName.trim()) errorMessage += "First name is required.\n";
  if (!lastName.trim()) errorMessage += "Last name is required.\n";
  if (!emailPattern.test(email.trim())) errorMessage += "Enter a valid email address.\n";
  if (!sportSkill.trim()) errorMessage += "Describe the sport and skill level.\n";

  if (phone && !phonePattern.test(phone.trim())) {
    errorMessage += "Phone number must be 10 digits.\n";
  }

  return errorMessage;
}

module.exports = { validateForm };