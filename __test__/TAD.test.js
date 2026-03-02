const { validateReservation, validateSignup, createUser } = require("../TAD-functions");

describe("Reservation Form Validation", () => {
  test("valid input returns no errors", () => {
    const errors = validateReservation({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "1234567890",
      sportSkill: "Tennis"
    });
    expect(errors).toBe("");
  });

  test("missing firstName returns error", () => {
    const errors = validateReservation({
      firstName: "",
      lastName: "Doe",
      email: "john@example.com",
      phone: "",
      sportSkill: "Tennis"
    });
    expect(errors).toContain("First name is required.");
  });

  test("invalid email returns error", () => {
    const errors = validateReservation({
      firstName: "John",
      lastName: "Doe",
      email: "bad-email",
      phone: "",
      sportSkill: "Tennis"
    });
    expect(errors).toContain("Enter a valid email address.");
  });
});

describe("Signup Form Validation", () => {
  test("valid signup returns no errors", () => {
    const errors = validateSignup({
      name: "Olivia",
      email: "olivia@example.com",
      password: "password123",
      role: "Athlete"
    });
    expect(errors).toBe("");
  });

  test("missing fields return errors", () => {
    const errors = validateSignup({ name: "", email: "", password: "", role: "" });
    expect(errors).toContain("Name is required.");
    expect(errors).toContain("Email is required.");
    expect(errors).toContain("Password is required.");
    expect(errors).toContain("Role is required.");
  });
});

describe("User Creation", () => {
  test("createUser returns correct object", () => {
    const user = createUser({ name: "Olivia", email: "olivia@example.com", role: "Athlete" });
    expect(user).toEqual({ name: "Olivia", email: "olivia@example.com", role: "Athlete" });
  });
});