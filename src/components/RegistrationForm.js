import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import './RegistrationForm.css';

export default function RegistrationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    age: "",
  });
  const [errors, setErrors] = useState({});
  const baseURL = "http://localhost:5278/api/User";

  const validateForm = (formData) => {
    const newErrors = {};
    const phoneNumber = parsePhoneNumberFromString(formData.phoneNumber);

    if (!/^[A-Za-z ]{3,50}$/.test(formData.fullName)) {
      newErrors.fullName = "Full Name must be 3-50 alphabetic characters, and should includes only letters and spaces";
    }

    if (!/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(formData.email)) {
      newErrors.email = "Invalid email format. Please provide unique valid email";
    }

    if (!phoneNumber || !phoneNumber.isValid()) {
      newErrors.phoneNumber = "Invalid phone number format. please provide country code";
    }

    if (!/^(1[89]|[2-9]\d)$/.test(formData.age)) {
      newErrors.age = "Age must be between 18 and 99.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm(formData)) {
      try {
        const response = await axios.post(baseURL, formData, {
          timeout: 3000,
          headers: { Accept: "application/json", "Content-Type": "application/json" },
        });
        console.log("Response:", response.data);
        alert("Registration Successful!");
        navigate("/");
      } catch (err) {
        console.error("Error:", err);
        alert("Registration failed. Please fix any validation errors and try again.");
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="card p-3 shadow-lg" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="text-center text-primary mb-3">Register</h2>
        <form onSubmit={handleSubmit}>
  
          <div className="mb-2">
            <label className="form-label fw-bold">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
            />
            {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
          </div>
  
          <div className="mb-2">
            <label className="form-label fw-bold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
  
          <div className="mb-2">
            <label className="form-label fw-bold">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className={`form-control ${errors.phoneNumber ? "is-invalid" : ""}`}
            />
            {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
          </div>
  
          <div className="mb-2">
            <label className="form-label fw-bold">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter your age"
              className={`form-control ${errors.age ? "is-invalid" : ""}`}
            />
            {errors.age && <div className="invalid-feedback">{errors.age}</div>}
          </div>
  
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
  
        </form>
      </div>
    </div>
  );
  
}