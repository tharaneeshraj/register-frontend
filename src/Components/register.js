import axios from "axios";
import moment from 'moment';
import React, { useState } from "react";
import "./register.css";

const Register = (props) => {
  let userData = {
    _id: undefined,
    name: "",
    age: "",
    dob: "",
    password: "",
    cpswd: "",
    about: "",
  }
  let isNewUser = true;
  if (props && props.user) {
    userData = props.user;
    userData.dob=moment(userData.dob).format('YYYY-MM-DD');
    isNewUser = false;
  }
  const [user, setUser] = useState(userData);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "dob") {
      var age = moment().diff(moment(value), 'years');
      setUser({ ...user, age, [name]: value });
      validateField(name, value);
      validateField("dob", age);
    }
    else {
      setUser({ ...user, [name]: value });
      validateField(name, value);
    }
  };


  const validateField = (name, value) => {
    let errorMsg = "";
  
    if (name === "name" && value.length < 5) errorMsg = "Enter a valid name";
    if (name === "age") {
      if (!value) errorMsg = "Age is required";
      else if (value < 0 || value > 100 || isNaN(value)) errorMsg = "Enter a valid age (0-100)";
    }
    if (name === "dob" && !value) errorMsg = "Date of Birth is required";
    if (name === "password" && !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)) {
      errorMsg = "Enter a valid password";
    }
    if (name === "cpswd") {
      if (!value) errorMsg = "Password is required";
      else if (value !== user.password) errorMsg = "Must match with password";
    }
  
    setErrors((prev) => ({ ...prev, [name]: errorMsg }))
  }
  

  const handleBlur = (e) => {
    validateField(e.target.name, e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    let formValid = true;

    Object.keys(user).forEach((key) => {
      validateField(key, user[key]);
      if (errors[key]) formValid = false;
    });

    if (user.password !== user.cpswd) {
      setErrors((prev) => ({ ...prev, cpswd: "Passwords do not match" }));
      formValid = false;
    }

    if (!formValid) return;
    if (isNewUser) {
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/users`, user).then(
          (res) => alert("User registered successfully!"))
          .catch((err) => {
            if (err.response.status === 400) {
              alert("User already exists!");
            }
          });

        setUser({
          _id: undefined,
          name: "",
          age: "",
          dob: "",
          password: "",
          cpswd: "",
          about: "",
        });
        setErrors({});
      } catch (err) {
        alert("Registration failed! Please contact administrator for more details");
      }
    } else {
      try {
        await axios.put(`${process.env.REACT_APP_API_URL}/api/users/${user._id}`, user).then(
          (res) => alert("User updated success!"))
          .catch((err) => {
            if (err.response.status === 400) {
              console.log(err);
              alert("User already exists!");
            }
          });
        props.setShowUsers(false);
        props.setEditUser(false);

        setUser({
          _id: undefined,
          name: "",
          age: "",
          dob: "",
          password: "",
          cpswd: "",
          about: "",
        });
        setErrors({});
      } catch (err) {
        console.log(err);
        
      }
    }
  };

  return (
    <div className="container">
      {isNewUser ? (<h2>User Registration</h2>) : (<h2>User Updation</h2>)}
      <form onSubmit={handleRegister}>
        <div className="input-container">
        <input type="text" name="name" placeholder="User Name" value={user.name} onChange={handleChange} onBlur={handleBlur} required disabled={isNewUser? "" : "disabled"}/>
          <span className="info-icon" title="Username can't be changed after registration. It must contain atleast 5 characters">ℹ</span>
        </div>
        {errors.name && <span className="error">{errors.name}</span>}

        <div className="input-container">
          <input type="date" name="dob" value={user.dob} onChange={handleChange} onBlur={handleBlur} onKeyDown={(e) => e.preventDefault()}
            max={new Date().toISOString().split("T")[0]}
            min={new Date(new Date().setFullYear(new Date().getFullYear() - 120)).toISOString().split("T")[0]} required />
          <span className="info-icon" title="Select your date of birth">ℹ</span>
        </div>

        <div className="input-container">
          <input type="number" name="age" placeholder="Age" value={user.age} onChange={handleChange} onBlur={handleBlur} disabled required />
          <span className="info-icon" title="Accepted age range 0-100">ℹ</span>
        </div>
        {errors.age && <span className="error">{errors.age}</span>}

        <div className="input-container">
          <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} onBlur={handleBlur} required />
          <span className="info-icon" title="Must be 8 characters with letters, numbers, and only contain special characters of @$!%*?&">ℹ</span>
        </div>
        {errors.password && <span className="error">{errors.password}</span>}

        <div className="input-container">
          <input type="password" name="cpswd" placeholder="Confirm Password" value={user.cpswd} onChange={handleChange} onBlur={handleBlur} required />
          <span className="info-icon" title="Must match the password">ℹ</span>
        </div>
        {errors.cpswd && <span className="error">{errors.cpswd}</span>}

        <div className="input-container">
          <textarea name="about" placeholder="About You Less than 200 Characters" value={user.about} onChange={handleChange} onBlur={handleBlur} maxLength="5000"></textarea>
          <span className="info-icon" title="About yourself (Max 200 characters)">ℹ</span>
        </div>
        {errors.about && <span className="error">{errors.about}</span>}


        {isNewUser ? (
          <button type="submit" name="register_button" value="Register">Register</button>
        ) : (
          <button type="submit" name="update_button" value="Update">Update</button>
        )}
      </form>
    </div>
  );
};

export default Register;