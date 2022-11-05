import React, { useState, useEffect } from "react";

const Login = () => {
  const intialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
 


  const submit = () => {
    console.log(formValues);
  };

  //input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  //form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  //form validation handler
  const validate = (values) => {
    let errors = {};
    //const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const username = new RegExp('523');
    const passowrdTest = new RegExp('523');
    

    if (!values.email) {
      errors.email = "Cannot be blank";
    } else if (!username.test(values.email)) {
      errors.email = "Invalid email format";
    }

    if (!values.password) {
      errors.password = "Cannot be blank";
    } else if (!passowrdTest.test(values.password)) {
      errors.password = "Wrong password";
    }

    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submit();
    }
  }, [formErrors]);

  return (
    <div className="container">
    <div>
      <h1>Sign in to continue</h1>
      {Object.keys(formErrors).length === 0 && isSubmitting && (
        <span>Form submitted successfully</span>
        
      )}
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formValues.email}
            onChange={handleChange}
          />
          {formErrors.email && <span>{formErrors.email}</span>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formValues.password}
            onChange={handleChange}
          />
          {formErrors.password && <span>{formErrors.password}</span>}
        </div>

        <button type="submit">Sign In</button>
      </form>
    </div>
    </div>
  );
  
};
export default Login;