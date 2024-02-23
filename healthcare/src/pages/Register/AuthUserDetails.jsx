function AuthUserDetails(values) {
    const error = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^[a-zA-Z0-9]{8,}$/;
    const username_pattern = /^[a-zA-Z0-9]{3,}$/;
  
    if (!values.Email) {
        error.Email = "Email should not be empty";
    } else if (!email_pattern.test(values.Email)) {
        error.Email = "Invalid email format";
    }
  
    if (!values.Password) {
        error.Password = "Password should not be empty";
    } else if (!password_pattern.test(values.Password)) {
        error.Password = "Password must be at least 8 characters long";
    }
  
    if (!values.ConfirmPassword) {
        error.ConfirmPassword = "Confirm Password should not be empty";
    } else if (String(values.ConfirmPassword) !== String(values.Password)) {
        error.ConfirmPassword = "Confirm Password didn't match";
    }
  
    if (!values.Username) {
        error.Username = "Username should not be empty";
    } else if (!username_pattern.test(values.Username)) {
        error.Username = "Username must be at least 3 characters long and can only contain alphanumeric characters";
    }
  
    if (!values.FullName) {
        error.FullName = "FullName should not be empty";
    }
  
    return error;
}
  
export default AuthUserDetails;