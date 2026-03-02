// __test__/TAD.test.js
const { validateForm } = require("../TAD-functions");

describe("validateForm function", () => {
  test("no errors for valid input", () => {
    expect(validateForm({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "1234567890",
      sportSkill: "Basketball"
    })).toBe("");
  });

  test("error when first name missing", () => {
    expect(validateForm({
      firstName: "",
      lastName: "Doe",
      email: "john@example.com",
      phone: "",
      sportSkill: "Tennis"
    })).toContain("First name is required.");
  });

  test("error for invalid email", () => {
    expect(validateForm({
      firstName: "John",
      lastName: "Doe",
      email: "bad-email",
      phone: "",
      sportSkill: "Tennis"
    })).toContain("Enter a valid email address.");
  });

  test("error for invalid phone", () => {
    expect(validateForm({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "123",
      sportSkill: "Tennis"
    })).toContain("Phone number must be 10 digits.");
  });

  test("multiple errors for multiple invalid fields", () => {
    const errors = validateForm({
      firstName: "",
      lastName: "",
      email: "bad",
      phone: "123",
      sportSkill: ""
    });
    expect(errors).toContain("First name is required.");
    expect(errors).toContain("Last name is required.");
    expect(errors).toContain("Enter a valid email address.");
    expect(errors).toContain("Phone number must be 10 digits.");
    expect(errors).toContain("Describe the sport and skill level.");
  });
});