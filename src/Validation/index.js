export const validateRigster = (user) => {
    const { email, password} = user;
    const errors = {};
    if (!email) {
      errors.email = "email is required";
    }
    if (!password) {
      errors.password = "password is required";
    }
    return errors;
  };
  
  export const validateLogin = (user) => {
    const { email, password} = user;
    const errors = {};
    if (!email) {
      errors.email = "email is required";
    }
    if (!password) {
      errors.password = "password is required";
    }
    return errors;
  };