import moment from 'moment';
import React, { useState } from "react";
import "./register.css";

const Register = (props) => {
  let userData = {
    id:undefined,
    name: "",
    age: "",
    dob: "",
    password: "",
    cpswd: "",
    about: "",
  };

  let isNewUser = true;
  if (props && props.user) {
    userData = props.user;
    userData.dob=moment(userData.dob).format('YYYY-MM-DD');
    isNewUser = false;
  }

  const [user, setUser] = useState(userData);
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let errorMsg = "";
  
    if (name === "name" && value.length < 5) {
      errorMsg = "Username must have at least 5 characters.";
    } else if (name === "dob") {
      const age = moment().diff(moment(value), 'years');
      if (age < 0 || age > 100) errorMsg = "Invalid age range.";
    } else if (name === "password" && !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)) {
      errorMsg = "Enter a valid password.";
    } else if (name === "cpswd" && value !== user.password) {
      errorMsg = "Re-enter Password";
    } else if (name === "about") {
      if (value.length === 0) {
        errorMsg = "This field is required.";
      } else if (value.length > 1000) {
        errorMsg = "Must be less than 1000 characters.";
      }
    }
  
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  }
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "dob") {
      const age = moment().diff(moment(value), 'years')
      setUser({ ...user, age, [name]: value })
      validateField(name, value)
      validateField("age", age)
    } else {
      setUser({ ...user, [name]: value })
      validateField(name, value)
    }
  }

  const handleBlur = (e) => {
    validateField(e.target.name, e.target.value);
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    let formValid = true;

    Object.keys(user).forEach((key) => {
      validateField(key, user[key]);
      if (errors[key]) formValid = false
    })

    if (user.password !== user.cpswd) {
      setErrors((prev) => ({ ...prev, cpswd: "Passwords do not match" }))
      formValid = false
    }

    if (!formValid) return
    }
  
  return (
    <div className="container">
        <center>
      <h1>Registration Form</h1>
      <form onSubmit={handleRegister}>
        <div className="input-container">
          <input type="text" name="name" placeholder="User Name" value={user.name} onChange={handleChange} onBlur={handleBlur} required disabled={!isNewUser ? "disabled" : ""} />
          <span className="info-icon" title="It must contain at least 5 characters">ℹ</span>
        </div>
        {errors.name && <span className="error">{errors.name}</span>}

        <div className="input-container">
          <input type="date" name="dob" value={user.dob} onChange={handleChange} onBlur={handleBlur} max={new Date().toISOString().split("T")[0]}
            min={new Date(new Date().setFullYear(new Date().getFullYear() - 120)).toISOString().split("T")[0]} required />
          <span className="info-icon" title="Select your date of birth">ℹ</span>
        </div>
        {errors.dob && <span className="error">{errors.dob}</span>}

        <div className="input-container">
          <input type="number" name="age" placeholder="Age" value={user.age} onBlur={handleBlur} disabled required />
          <span className="info-icon" title="Accepted age range 0-100">ℹ</span>
        </div>
        {errors.age && <span className="error">{errors.age}</span>}

        <div className="input-container">
          <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} onBlur={handleBlur} required />
          <span className="info-icon" title="Must be 8+ characters with letters, numbers, and special characters only @$!%*?&">ℹ</span>
        </div>
        {errors.password && <span className="error">{errors.password}</span>}

        <div className="input-container">
          <input type="password" name="cpswd" placeholder="Confirm Password" value={user.cpswd} onChange={handleChange} onBlur={handleBlur} required />
          <span className="info-icon" title="Must match the password">ℹ</span>
        </div>
        {errors.cpswd && <span className="error">{errors.cpswd}</span>}

        <div className="input-container">
          <textarea name="about" placeholder="About You (Max 1000 Characters)" value={user.about} onChange={handleChange} onBlur={handleBlur} maxLength="1000" required></textarea>
          <span className="info-icon" title="Write about yourself (Max 1000 characters)">ℹ</span>
        </div>
        {errors.about && <span className="error">{errors.about}</span>}

        <button type="submit">Register</button>
      </form>
      </center>
    </div>
  )
}

export default Register
